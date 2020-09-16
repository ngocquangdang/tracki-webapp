import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const Image = styled.div`
  width: 295px;
  height: 262px;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const DefaultImage = styled.div`
  width: 295px;
  height: 262px;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: 295,
    maxWidth: 295,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
    backgroundColor: '#ffffff',
    marginLeft: 20,
    marginBottom: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  imageTracker: {
    width: 295,
    height: 262,
    objectFit: 'contain',
  },
  content: {
    padding: '0 12px 24px 0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.39,
    color: '#1a1a1a',
    padding: '20px 10px',
  },
  price: {
    fontSize: 21,
    fontWeight: 500,
    lineHeight: 1.19,
    color: '#328557',
    paddingLeft: 10,
  },
}));

export { useStyles, Image, DefaultImage };
