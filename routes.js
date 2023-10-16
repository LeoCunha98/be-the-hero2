import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createNativeStackNavigator();

import Incidents from './pages/incidentes/index';

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name='Incidentes' component={Incidents} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
