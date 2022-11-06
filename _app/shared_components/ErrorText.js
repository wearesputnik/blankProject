import React from 'react';
import {HelperText} from 'react-native-paper';

export default ErrorText = (state) => {
  //   console.log(state.state);
  return (
    <HelperText type="error" visible={state.state.error?.validate[state.field]}>
      {state.state.error?.validate[state.field]}
    </HelperText>
  );
};
