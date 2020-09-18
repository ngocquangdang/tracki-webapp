import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const Image = styled.div`
  width: 100%;
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
    height: 397,
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
  content: {
    paddingBottom: 24,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.39,
    color: '#1a1a1a',
    padding: '15px 18px 15px 10px',
  },
  price: {
    fontSize: 21,
    fontWeight: 500,
    lineHeight: 1.19,
    color: '#328557',
    paddingLeft: 10,
  },
}));

export { useStyles, Image };
