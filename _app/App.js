import React from 'react';

import {StatusBar, LogBox} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, IconButton} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './utils/theme';
import ScanScreen from './screens/QRScanner';
import KeyboardPage from './screens/KeyboardPage';
import User from './screens/User';
import Login from './screens/Login';
import Splash from './screens/SplashScreen';
import Redemption from './screens/Redemption';
import History from './screens/History';

import {
  todoReducer,
  initialState,
  ContextProvider,
  Context,
} from './dataflow/context';
import UserIcon from './shared_components/UserIcon';

const Stack = createStackNavigator();

const smoothTransition = {
  cardStyle: {backgroundColor: 'transparent'},
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

const screenOptions = {
  header: () => <></>,
  headerLeft: null,
  gestureEnabled: false, ///disabling Back button/backswipe
  // ...smoothTransition,
};

const App = () => {
  return (
    <>
      <ContextProvider>
        <Provider theme={theme}>
          <StatusBar barStyle="light-content" />
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                  headerBackTitleVisible: false,
                  headerRight: () => <UserIcon />,
                }}>
                <Stack.Screen
                  name="Splash"
                  component={Splash}
                  options={{...screenOptions, ...smoothTransition}}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{...screenOptions, ...smoothTransition}}
                />
                <Stack.Screen
                  name="Keyboard"
                  component={KeyboardPage}
                  options={{
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTitle: '',
                  }}
                />
                <Stack.Screen name="ScanScreen" component={ScanScreen} />
                <Stack.Screen name="User" component={User} />
                <Stack.Screen
                  name="Redemption"
                  component={Redemption}
                  options={{headerTitle: 'Card Redemption'}}
                />
                <Stack.Screen name="History" component={History} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </ContextProvider>
    </>
  );
};

export default App;
