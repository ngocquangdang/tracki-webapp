import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import { throttle } from 'lodash';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

import { TextInput } from '@Components/inputs';
import useStyles from './styles';

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
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  gotoLocation?(latlng: { lat: number; lng: number }): void;
  t(k: string): string;
}

function SearchLocation(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);

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
          if (props.gotoLocation) {
            return props.gotoLocation(latLng);
          }
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
      openOnFocus={props.autoFocus || false}
      onChange={onChangeOptions}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextInput
          {...params}
          value={inputValue}
          label={
            props.placeholder ? '' : props.t('tracker:search_address_location')
          }
          placeholder={props.placeholder}
          variant="outlined"
          fullWidth
          autoFocus={props.autoFocus || false}
          className={`${classes.inputContainer} ${props.className || ''}`}
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

export default SearchLocation;
