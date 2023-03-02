import 'react-native-gesture-handler';

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
// import { StackNavigator } from './src/navigator/StackNavigator';
// import { DrawerNavigation } from './src/navigator/DrawerNavigation';
// import { Menu } from './src/navigator/Menu';
// import { AuthProvider } from './src/context/AuthContext';

//Agregué una linea al babel.config.js : plugins: ['react-native-reanimated/plugin'],
//Reinicie el caché de npm npm start -- --reset-cache y despues volví a compilar la aplicación
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
};


export default App;
