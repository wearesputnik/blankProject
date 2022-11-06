import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createRef,
  forwardRef,
} from 'react';
import {
  Card,
  Button,
  Checkbox,
  withTheme,
  HelperText,
} from 'react-native-paper';

import {StatusBar, View, Image, ScrollView, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useStateValue} from '../dataflow/context';
import LogoLogin from '../../assets/logo_login.png';
import TxtInput from '../shared_components/TxtInput';

import {userActionLogin} from '../dataflow/actions/userActions';
import ErrorText from '../shared_components/ErrorText';

Login = (props) => {
  const passwordTxtEdit = createRef();

  const {colors} = props.theme;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [{user, data}, dispatch] = useStateValue();
  const [checkedRemember, setCheckedRemember] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  useEffect(() => {
    user.data.status === 'SUCCESS' && props.navigation.navigate('Keyboard');
  }, [user]);

  clickLogin = () =>
    userActionLogin(dispatch, username, password, checkedRemember);

  return (
    <View style={styles.container}>
      <Image source={LogoLogin} style={styles.logo} resizeMode="contain" />

      <View style={styles.card}>
        <View style={styles.form}>
          <TxtInput
            label="Username"
            value={username}
            onChangeText={(username) => setUsername(username)}
            onSubmitEditing={() => {
              passwordTxtEdit.current?.focus();
            }}
          />
          <ErrorText field={'username'} state={user} />

          <TxtInput
            ref={passwordTxtEdit}
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            returnKeyType="done"
            onSubmitEditing={() => {
              passwordTxtEdit.current?.blur();
            }}
          />
          <ErrorText field={'password'} state={user} />

          <Checkbox.Item
            color={'black'}
            uncheckedColor={'gray'}
            status={checkedRemember ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedRemember(!checkedRemember);
            }}
            label="Remember me"
          />

          <Button
            labelStyle={{fontWeight: '700'}}
            style={styles.button}
            focusable={true}
            mode="contained"
            loading={user.loading}
            onPress={() => clickLogin()}>
            <Text adjustsFontSizeToFit={true} style={styles.btnLogin}>
              Get login
            </Text>
          </Button>
        </View>
        <Text adjustsFontSizeToFit={true} style={styles.terms}>
          Terms & Conditions
        </Text>
      </View>
    </View>
  );
};

export default withTheme(Login);

const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'stretch',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  logo: {
    alignSelf: 'auto',
    flex: 3,
    maxWidth: 325,
    marginTop: '20%',
    marginBottom: '-10%',
  },
  card: {
    flex: 7,
    width: '100%',
    padding: '10%',
  },
  button: {
    marginVertical: '6%',
  },
  form: {
    flex: 12,
  },
  terms: {flex: 1, textAlign: 'center'},
  btnLogin: {color: 'white', textAlign: 'center'},
};
