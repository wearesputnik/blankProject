import React, {useEffect} from 'react';

import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Button} from 'react-native-paper';
import {useStateValue} from '../dataflow/context';
import {dataScan} from '../dataflow/actions/networkActions';

export default ScanScreen = (props) => {
  const [{user, data}, dispatch] = useStateValue();

  onSuccess = (e) => {
    const scannedQR = JSON.parse(e.data);
    // Linking.openURL(scannedQR).catch((err) =>
    //   console.error('An error occured', err),
    // );

    dataScan(
      dispatch,
      scannedQR.uuid,
      scannedQR.cashier_id,
      props.route.params.amount,
    );
  };

  useEffect(() => {
    data.data.incoming && props.navigation.navigate('Redemption', data.data);
  }, [data]);

  return (
    <QRCodeScanner
      onRead={this.onSuccess}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
          on your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Button
            onPress={() => props.navigation.navigate('Login')}
            title="home">
            <Text style={styles.buttonText}>Home</Text>
          </Button>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
