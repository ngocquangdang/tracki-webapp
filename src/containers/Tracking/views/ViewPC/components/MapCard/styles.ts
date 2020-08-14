export default {
  mapCard: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  mapLabel: {
    zIndex: 410,
    right: 8,
    top: 8,
    padding: '6px 15px',
    color: '#fff',
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,.6)',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    fontSize: 14,
    lineHeight: '18px',
    fontFamily: 'Roboto',
  },
  labelMobile: {
    fontSize: 11,
    lineHeight: '13px',
    padding: '4px 10px',
  },
  selects: {
    zIndex: 410,
    right: 8,
    top: 8,
    width: '50%',
    '& > div': {
      margin: '0 !important',
    },
  },
  selectMobile: {
    maxWidth: '50%',
    width: 'auto',
    '& > div > div > div': {
      padding: '5px 26px 5px 10px',
    },
  },
};
