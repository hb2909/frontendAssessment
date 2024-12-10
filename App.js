import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';

import Login from './screens/LoginScreen';
import TransactionHistory from './screens/TransactionHistory';
import TransactionDetail from './screens/TransactionDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} options={{ headerShown: false }} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
