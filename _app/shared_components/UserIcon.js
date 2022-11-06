import React from 'react';
import {Popover, PopoverController} from 'react-native-modal-popover';

import {IconButton, Button, DataTable} from 'react-native-paper';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function UserIcon() {
  const icon = (
    <IconButton
      icon="account-box-outline"
      color={'gray'}
      size={35}
      onPress={() => console.log('Pressed')}
    />
  );
  return (
    <PopoverController>
      {({
        openPopover,
        closePopover,
        popoverVisible,
        setPopoverAnchor,
        popoverAnchorRect,
      }) => (
        <View>
          <TouchableOpacity
            ref={setPopoverAnchor}
            onPress={() => openPopover()}>
            <IconButton icon="account-box-outline" color={'gray'} />
          </TouchableOpacity>
          <Popover
            placement="bottom"
            contentStyle={styles.content}
            arrowStyle={styles.arrow}
            backgroundStyle={styles.background}
            visible={popoverVisible}
            onClose={closePopover}
            fromRect={popoverAnchorRect}
            supportedOrientations={['portrait', 'landscape']}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>
                  <TouchableOpacity onPress={() => console.log('l')}>
                    <Button icon="history">
                      <Text>History</Text>
                    </Button>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <TouchableOpacity onPress={() => console.log('l')}>
                    <Button icon="logout">
                      <Text>Log Out</Text>
                    </Button>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Popover>
        </View>
      )}
    </PopoverController>
  );
}
const styles = {
  app: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2ffd2',
  },
  content: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: '#eee',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
