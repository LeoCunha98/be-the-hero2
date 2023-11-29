import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { auth } from './src/config/firebase';

import Incidentes from './src/pages/incidentes/index';
import Detail from './src/pages/detail/index';
import History from './src/pages/history/index';
import LoginScreen from './src/pages/login';
import Profile from './src/pages/profile';
import Register from './src/pages/register';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false}}>
    <Tab.Screen
      name='Incidentes'
      component={IncidentesStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='Historico'
      component={History}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="history" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='Profile'
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="profile" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Register' component={Register} />
  </Stack.Navigator>
);

const IncidentesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='IncidentesStack' component={Incidentes} />
    <Stack.Screen name='DetailStack' component={Detail} />
  </Stack.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => setIsAuthenticated(!!user));
    setIsAuthenticated(true);
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainTabs />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;
