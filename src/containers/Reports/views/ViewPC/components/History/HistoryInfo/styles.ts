import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const Image = styled.div`
  width: 40px;
  height: 34px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

const useStyles = makeStyles(theme => ({
  infoHistory: {
    height: 72,
    maxHeight: 72,
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    marginBottom: 17,
    padding: '0 10px',
  },
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 50,
    borderRadius: '50%',
    height: 50,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 10,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.34,
  },
  textFont15: {
    fontSize: 15,
  },
  borderPart: {
    width: 1,
    height: 22,
    backgroundColor: '#e0e0e0',
  },
  pr: {
    paddingRight: 30,
  },
  flexColEnd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    lineHeight: 1.34,
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1.34,
  },
  textFont12: {
    fontSize: 12,
    fontWeight: 300,
  },
  textFont17: {
    fontSize: 17,
  },
  pl: {
    paddingLeft: 30,
  },
}));

export { useStyles, Image };
