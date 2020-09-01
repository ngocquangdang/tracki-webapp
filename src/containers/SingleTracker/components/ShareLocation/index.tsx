import React, { useState, Fragment, useRef } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import SelectOption from '@Components/selections';
import copy from 'copy-to-clipboard';
import { SHARE_LOCATION_OPTIONS } from '@Containers/SingleTracker/store/constants';
import {
  generateLinkShareLocationRequest,
  deactiveLinkShareLocationRequest,
} from '@Containers/SingleTracker/store/actions';
import { makeSelectDataLink } from '@Containers/Trackers/store/selectors';

import {
  Container,
  Content,
  Title,
  ContainerDetail,
  ControlButton,
  Footer,
  StatusDuration,
  Description,
  ButtonCopyCode,
  TextAreaInput,
  useStyles,
} from './styles';

interface DataLink {
  enabled: boolean;
  expires: number;
  token: string;
}

interface Props {
  handleClose(): void;
  t(key: string): string;
  isMobile: boolean;
  show: boolean;
  isRequesting?: boolean;
  generateLinkSharLoaction(duration: object): void;
  deactiveLinkShare(): void;
  dataLink: DataLink;
}

function ShareLocation(props: Props) {
  const classes = useStyles();
  const { handleClose, t, isMobile, show, isRequesting } = props;
  const [isRenderDetail, setRenderDetail] = useState(false);
  const [duration, setDuration] = useState({
    duration: SHARE_LOCATION_OPTIONS[0].value,
  });

  const textInputRef = useRef(null);
  const onSubmitForm = (values: any) => {
    props.generateLinkSharLoaction(values);
    setDuration({ duration: values.duration });
    setRenderDetail(true);
  };

  const handleDeactiveLink = () => {
    props.deactiveLinkShare();
    setRenderDetail(false);
    handleClose();
  };
  const linkDomain = window.location.host;
  const linkShareLocation = `${
    props.dataLink?.token
      ? `${linkDomain}/public-map?token=${props.dataLink?.token}`
      : ''
  }`;
  const codeShareLocation = `<iframe width="853" height="480" src="${linkDomain}/public-map?token=${props.dataLink?.token} frameborder="0" allowfullscreen></iframe>`;
  const copyLink = (isCopyLink: boolean) => () => {
    isCopyLink ? copy(linkShareLocation) : copy(codeShareLocation);
  };

  const renderDetailShareLocation = () => {
    return (
      <ContainerDetail>
        <TextAreaInput
          ref={textInputRef}
          label={t('tracker:link_url')}
          name="link_url"
          value={linkShareLocation}
          variant="outlined"
        />
        <ControlButton>
          <Button
            className={`${classes.btn} ${classes.btnShare}`}
            variant="outlined"
            text={t('tracker:share_link')}
          />
          <Button
            className={`${classes.btn} ${classes.btnCopyLink}`}
            variant="outlined"
            text={t('tracker:copy_link')}
            onClick={copyLink(true)}
          />
        </ControlButton>
        <TextAreaInput
          label={t('tracker:embed_code')}
          name="embed_code"
          value={codeShareLocation}
          variant="outlined"
          multiline={true}
        />
        <ButtonCopyCode>
          <Button
            className={`${classes.btn} ${classes.btnCopyCode}`}
            variant="outlined"
            text={t('tracker:copy_code')}
            onClick={copyLink(false)}
          />
        </ButtonCopyCode>

        <Footer>
          <Title>{t('tracker:generate_link_will_expire')}</Title>
          <StatusDuration>
            {props.dataLink?.expires
              ? moment(props.dataLink?.expires).format('DD/MM/YYYY, HH:mm')
              : 'Unlimited'}
          </StatusDuration>
          <Description className={classes.description}>
            {t('tracker:description_share_link')}
          </Description>
          <Button
            className={`${classes.btn} ${classes.btnFullWidth}`}
            variant="outlined"
            text={t('tracker:deactive_link')}
            onClick={handleDeactiveLink}
          />
        </Footer>
      </ContainerDetail>
    );
  };

  const renderShareLocation = () => {
    return (
      <Fragment>
        <Title>{t('tracker:generate_link_share')}</Title>
        <Formik
          initialValues={duration}
          onSubmit={onSubmitForm}
          enableReinitialize
          disabled={isRequesting}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <Content onSubmit={handleSubmit}>
                <SelectOption
                  name="duration"
                  options={SHARE_LOCATION_OPTIONS}
                  label={t('tracker:period_link')}
                  value={values.duration}
                  onChangeOption={handleChange('duration')}
                />
                <Button
                  className={`${classes.btn} ${classes.btnFullWidth}`}
                  variant="outlined"
                  isLoading={isRequesting}
                  text={t('tracker:generate_link')}
                  type="submit"
                />
              </Content>
            );
          }}
        </Formik>
        <Description>{t('tracker:description_share_link_please')}</Description>
      </Fragment>
    );
  };

  return (
    <SideBarOutside
      title={t('tracker:share_tracker_loaction')}
      show={show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
      isLogo={isMobile}
    >
      <Container>
        {isRenderDetail ? renderDetailShareLocation() : renderShareLocation()}
      </Container>
    </SideBarOutside>
  );
}

const mapStateToProps = createStructuredSelector({
  dataLink: makeSelectDataLink(),
});

const mapDispatchToProps = dispatch => ({
  generateLinkSharLoaction: (duration: object) =>
    dispatch(generateLinkShareLocationRequest(duration)),
  deactiveLinkShare: () => dispatch(deactiveLinkShareLocationRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareLocation);
