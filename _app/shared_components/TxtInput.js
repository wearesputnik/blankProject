import React, {forwardRef} from 'react';
import {TextInput} from 'react-native-paper';

export default TxtInput = forwardRef((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      mode="outlined"
      style={{marginVertical: '3%'}}></TextInput>
  );
});
