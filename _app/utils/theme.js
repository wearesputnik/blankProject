const {DefaultTheme} = require('react-native-paper');

export const theme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(42,114,255,1)',
    accent: '#f1c40f',
  },
  container: {
    justifyContent: 'center',
    alignContent: 'space-around',
    alignItems: 'stretch',
    padding: '4%',
    flex: 11,
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
};
