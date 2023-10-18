import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createNativeStackNavigator();

import Incidents from './src/pages/incidentes/index';
import Detail from './src/pages/detail/index';
import History from './src/pages/history/index';

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name='Incidentes' component={Incidents} />
        <AppStack.Screen name='Detail' component={Detail} />
        <AppStack.Screen name='History' component={History} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
