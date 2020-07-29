import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import { throttle } from 'lodash';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

import { GOOGLE_API_KEY } from '@Definitions/app';
import { TextInput } from '@Components/inputs';
import useStyles from './styles';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface PlaceType {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}

interface Props {
  t(k: string): string;
}

export default function GoogleMaps(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const onChangeOptions = (event: any, newValue: PlaceType | null) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    if (newValue) {
      geocodeByPlaceId(newValue.place_id)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          window.mapEvents.setCenterFlyTo(latLng, { zoom: 15 });
        })
        .catch(error => console.error('Error', error));
    }
  };

  return (
    <Autocomplete
      id="google-map"
      getOptionLabel={option =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      fullWidth
      onChange={onChangeOptions}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextInput
          {...params}
          value={inputValue}
          label={props.t('tracker:search_address_location')}
          variant="outlined"
          fullWidth
          className={classes.inputContainer}
        />
      )}
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );
        return (
          <Grid container alignItems="center" key={option.place_id}>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                  className={classes.locationName}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" className={classes.locationDetail}>
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
