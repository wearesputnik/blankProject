import React, {useEffect, useState} from 'react';
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
  DataTable,
  Divider,
} from 'react-native-paper';
import {useStateValue} from '../dataflow/context';
import {color} from 'react-native-reanimated';
import {clearData} from '../dataflow/actions/networkActions';

const Redemption = (props) => {
  const {colors, container} = props.theme;
  const [{user, data}, dispatch] = useStateValue();
  const [incoming, setIncoming] = useState();

  useEffect(() => {
    console.log(data);
    const inc = data.data.incoming;
    const names = Object.keys(inc);

    setIncoming(drawTables(packData(inc)));
  }, [data]);

  useEffect(() => {
    return () => {
      clearData(dispatch);
    };
  }, []);

  completeScan = () => {
    props.navigation.navigate('Keyboard');
  };

  packData = (data) => {
    let r1 = [];
    let r2 = [];
    Object.keys(data).forEach((key, index) => {
      let processedName, tableNum, order;
      let isPercent = false;
      switch (key) {
        case 'transaction_amount':
          processedName = 'Charge Amount';
          tableNum = 1;
          order = 1;
          break;
        case 'gift_card_current_balance':
          processedName = 'Prev gift card balance';
          tableNum = 1;
          order = 2;
          break;
        case 'potential_new_balance':
          processedName = 'New gift card balance';
          tableNum = 1;
          order = 3;
          break;

        case 'pos_percentage_discount':
          processedName = 'POS % Discount';
          tableNum = 2;
          order = 1;
          isPercent = true;
          break;
        case 'pos_cash_discount':
          processedName = 'POS $ Discount';
          tableNum = 2;
          order = 2;
          break;
        case 'customer_owes':
          processedName = 'Customer Owes';
          tableNum = 2;
          order = 3;
          break;
      }

      if (key !== 'uuid') {
        tableNum === 1
          ? r1.push({isPercent, order, processedName, value: data[key]})
          : r2.push({isPercent, order, processedName, value: data[key]});
      }
    });
    sorter = (a, b) => {
      return a.order - b.order;
    };
    r1.sort(sorter);
    r2.sort(sorter);

    return {r1, r2};
  };

  createRow = (array, isPercent = false, name, value) => {
    return (
      <DataTable.Row key={name}>
        <DataTable.Cell>
          <Text
            style={[styles.tableText, {color: array === 1 ? '#999' : '#555'}]}>
            {name}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text
            style={[styles.tableText, {color: array === 1 ? '#999' : '#555'}]}>
            {!isPercent && '$ '}
            {parseFloat(value).toFixed(2)}
            {isPercent && ' %'}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  drawTables = ({r1, r2}) => {
    return (
      <View style={styles.container}>
        <DataTable style={styles.dataTable}>
          {r1.map((item) => {
            return createRow(1, item.isPercent, item.processedName, item.value);
          })}
        </DataTable>
        <View style={{height: 50}}></View>
        <DataTable style={styles.dataTable}>
          {r2.map((item) => {
            return createRow(2, item.isPercent, item.processedName, item.value);
          })}
        </DataTable>
      </View>
    );
  };

  return (
    <View style={container}>
      {incoming}
      <View style={styles.btnHolder}>
        <Button
          mode="outlined"
          color={colors.primaryColor}
          onPress={() => {
            props.navigation.navigate('Keyboard');
          }}>
          <Text style={{...styles.btnText, color: colors.primaryColor}}>
            Cancel
          </Text>
        </Button>
        <Button
          mode="contained"
          color={colors.primaryColor}
          onPress={() => {
            completeScan();
          }}>
          <Text style={styles.btnText}>COMPLETE CHARGE</Text>
        </Button>
      </View>
    </View>
  );
};

export default withTheme(Redemption);

const styles = {
  tableText: {fontWeight: '700'},
  btnHolder: {
    flex: 3,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {color: 'white', fontWeight: '700'},
  dataTable: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eef',
  },
};
