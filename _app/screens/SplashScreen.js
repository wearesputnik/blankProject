import React, {useContext, useEffect, useState} from 'react';
import {Context, useStateValue} from '../dataflow/context';
import {View, Text, Image, Dimensions} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import Logo from '../../assets/logo.png';
import SplashScreen from 'react-native-splash-screen';
import {Button} from 'react-native-paper';
const useForceUpdate = () => useState()[1];
export default Splash = (props) => {
  const [{user}, dispatch] = useStateValue();
  const navigation = props.navigation;
  const [network, setNetwork] = useState(true);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    NetInfo.fetch().then((network) => {
      setNetwork(network.isConnected);
      if (network.isConnected !== null) {
        navigation.navigate('Login');
      }
      SplashScreen.hide();
    });
  }, []);

  return (
    <View style={styles.container}>
      {network === false && (
        <>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.noInet}>
            <Text>Unable to connect. Please check internet connection.</Text>
            <Button
              mode="contained"
              color={'white'}
              onPress={() => forceUpdate()}>
              <Text>Retry</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(42,114,255,1)',
  },
  logo: {
    flex: 4,
    maxWidth: 375,
    width: '60%',
  },
  noInet: {
    flex: 1,
  },
};
