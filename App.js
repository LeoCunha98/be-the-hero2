import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Incidents from './src/pages/incidentes/index'
import Detail from './src/pages/detail/index'
import History from './src/pages/history/index'
import LoginScreen from './src/pages/login';
import Profile from './src/pages/profile';
import Register from './src/pages/register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function IncidentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
      <Stack.Screen name='Incidentes' component={Incidents} />
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Incidentes' component={IncidentsStack} />
        <Tab.Screen name='Historico' component={History} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
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
