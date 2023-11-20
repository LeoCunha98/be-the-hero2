//import './src/config/firebase';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Incidents from './src/pages/incidentes/index'
import Detail from './src/pages/detail/index'
import History from './src/pages/history/index'
import LoginScreen from './src/pages/login';
import Profile from './src/pages/profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        <Stack.Screen name='Incidentes' component={Incidents} />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
