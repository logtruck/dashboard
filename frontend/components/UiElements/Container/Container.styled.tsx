import { styled } from 'baseui';

const ContainerArea = styled('div', {
  width: '100%',
  maxWidth: '1070px',
  paddingLeft: '15px',
  paddingRight: '15px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,

  '@media screen and (max-width: 1200px)': {
    maxWidth: '970px',
  },

  // '@media screen and (max-width: 991px)': {
  //   maxWidth: '750px',
  // },
});

export default ContainerArea;
