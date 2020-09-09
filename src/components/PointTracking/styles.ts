import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

const DefaultImage = styled.div`
  width: 40px;
  height: 34px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

const useStyles = makeStyles(theme => ({
  trackingContainer: {
    position: 'absolute',
    left: 405,
    width: 320,
    zIndex: 400,
    cursor: 'move',
    backgroundColor: 'white',
    bottom: 5,
    padding: '8px 8px 3px 8px',
    borderRadius: 4,
    display: 'none',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
  },
  show: {
    display: 'block',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
    color: '#1a1a1a',
    '& svg': {
      fontSize: 20,
    },
  },
  rowInfo: {
    display: 'flex',
    marginBottom: 8,
  },
  rowIcon: {
    width: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 500,
    margin: 0,
  },
  prevBtn: {
    marginRight: 8,
    minHeight: 30,
    height: 30,
    width: 30,
    '&:first-child': {
      paddingLeft: 8,
    },
    '& svg': {
      fontSize: '16px !important',
    },
  },
  subtitle: {
    fontSize: 13,
    lineHeight: '17px',
    margin: 0,
  },
  rowText: {
    alignSelf: 'center',
  },
  dashIcon: {
    fontSize: 22,
    alignSelf: 'center',
  },
  rowLeft: {
    display: 'flex',
    borderRight: '1px solid #ddd',
    padding: '0 5px',
    margin: '10px 0',
  },
  block: {
    display: 'flex',
  },
  rowRight: {
    textAlign: 'center',
    padding: '0 8px',
    margin: '5px 0',
  },
  text: {
    marginLeft: 5,
    alignSelf: 'center',
    marginRight: 5,
  },
  imageWrapper: {
    width: 50,
    borderRadius: 25,
    height: 50,
    display: 'flex',
    background: '#168449',
  },
  iconLocation: {
    color: '#cc2c2c',
  },
  rowIconDevice: {
    marginRight: 8,
  },
  rowInfoIconControl: {
    display: 'flex',
    marginTop: 5,
  },
  rowStatusTracker: {
    display: 'flex',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
  },
}));
export { useStyles, Image, DefaultImage };
