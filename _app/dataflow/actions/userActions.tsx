import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ATTEMPT,
} from '../../utils/constants';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-community/async-storage';
import {userCredsValidator} from '../../utils/validators';

export const userActionLogin = (
  dispatch: CallableFunction,
  username: string,
  password: string,
  remember: boolean,
) => {
  dispatch(loginAttempt());
  const validate = userCredsValidator(username, password);

  if (validate?.valid) {
    const data = {username: username, password: password};

    remember && AsyncStorage.setItem('creds', data.toString());
    axios
      .post('/login', data)
      .then((result) => {
        result.status === 200 && dispatch(loginSuccess({status: 'SUCCESS'}));
      })
      .catch((error) => {
        alert(error);
        dispatch(loginFailed({error}));
      });
  } else dispatch(loginFailed({validate}));
};

const loginAttempt = () => ({
  type: LOGIN_ATTEMPT,
  loading: true,
});
const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  loading: false,
  data: data,
});

const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  loading: false,
  error: error,
});
