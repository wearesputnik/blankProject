import React, {useState, createRef, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {
  Button,
  withTheme,
  Card,
  IconButton,
  Text,
  Dialog,
  Portal,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import TxtInput from '../shared_components/TxtInput';
import {numberInput} from '../utils/validators';
import {dataScan} from '../dataflow/actions/networkActions';
import {useStateValue} from '../dataflow/context';
import {useIsFocused} from '@react-navigation/native';

KeyboardPage = (props) => {
  const {colors, container} = props.theme;
  const focused = useIsFocused();
  const [{user, data}, dispatch] = useStateValue();
  const amountInput = createRef();
  const [amount, setAmount] = useState('0');
  const [visible, setEnterPinDialog] = useState(false);

  const hideDialog = () => {
    setEnterPinDialog(false);
  };
  const submitBtn = () => {
    hideDialog();
    dataScan(dispatch, '---------------', 32, amount);
  };

  useEffect(() => {
    visible ? amountInput.current?.blur() : amountInput.current?.focus();
  }, [visible, focused]);

  useEffect(() => {
    data.data.incoming && props.navigation.navigate('Redemption', data.data);
    setAmount('0');
  }, [data]);

  return (
    <View style={container}>
      {data.loading ? (
        <ActivityIndicator style={{flex: 1000}} />
      ) : (
        <>
          <View style={{flex: 2}}></View>
          <Text adjustsFontSizeToFit={true} style={styles.infoText}>
            Enter the amount greater than 0 before scanning or entering PIN
          </Text>
          <View style={{flex: 0.4}}></View>

          <TxtInput
            style={styles.amountInput}
            label="Amount"
            ref={amountInput}
            keyboardType="numeric"
            placeholder={amount}
            onChangeText={(amount) => {
              setAmount(numberInput(amount));
            }}
          />

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Manual entry</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Enter customer details</Paragraph>
                <TxtInput
                  // style={styles.amountInput}
                  label="Giftcard PIN"
                  // ref={amountInput}
                  // keyboardType="numeric"
                  // value={amount}
                  // onChangeText={(amount) => setAmount(numberInput(amount))}
                />
                <TxtInput
                  // style={styles.amountInput}
                  label="+999-999-9999"
                  // ref={amountInput}
                  // keyboardType="numeric"
                  // value={amount}
                  // onChangeText={(amount) => setAmount(numberInput(amount))}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button mode={'outlined'} onPress={hideDialog}>
                  Cancel
                </Button>
                <Button mode={'contained'} onPress={submitBtn}>
                  Submit
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <View style={styles.scanBtns}>
            <Button
              style={[styles.enterPinBtn, {borderColor: colors.primary}]}
              color={colors.primary}
              mode="outlined"
              size={40}
              onPress={() => {
                amount === '0'
                  ? alert('Enter amount!')
                  : setEnterPinDialog(!visible);
              }}>
              <Text style={{color: colors.primary, fontWeight: '700'}}>
                ENTER PIN
              </Text>
            </Button>
            <View style={{flex: 0.2}}></View>
            <Button
              style={styles.scanBtn}
              icon="qrcode-scan"
              color={colors.primary}
              mode="contained"
              size={40}
              onPress={() => {
                amount === '0'
                  ? alert('Enter amount!')
                  : props.navigation.navigate('ScanScreen', {amount});
              }}>
              <Text style={{color: 'white', fontWeight: '700'}}>SCAN</Text>
            </Button>
          </View>
        </>
      )}
      <View style={{flex: 3}}></View>
    </View>
  );
};

export default withTheme(KeyboardPage);

const styles = {
  infoText: {
    textAlign: 'center',
    color: '#abc',
    fontWeight: '600',
    flex: 1,
  },
  amountInput: {
    flex: 1,
  },
  scanBtns: {
    flex: 3,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scanBtn: {
    flex: 1,
  },
  enterPinBtn: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
  },
};
