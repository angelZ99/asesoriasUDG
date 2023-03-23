import { createStackNavigator } from '@react-navigation/stack';
import { LogIn } from '../screens/LogIn';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { HomeScreen } from '../screens/HomeScreen';
import { LoadingScreen } from '../screens/LoadingScreen';


//Definir que argumentos reciben las pantallas poner tambien en el stack
export type RootStackParams = {
  LogIn: undefined,
  RegisterScreen: undefined,
}

//Agregar el generico de RootStackParams 
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const {status} = useContext( AuthContext );

  //if( status === 'checking') return <LoadingScreen/>;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      {/* Ternario paras validar que haya una sesión iniciado */}
      {
        ( status !== 'authenticated')
          ? (
            <>
              <Stack.Screen name="LogIn" options={{title: "LogIn"}} component={LogIn} />
              <Stack.Screen name="RegisterScreen" options={{title: "RegisterScreen"}} component={RegisterScreen} />
            </>
          )
          : (
            <Stack.Screen name="HomeScreen" options={{title: "HomeScreen"}} component={HomeScreen} />
          )
      }

    </Stack.Navigator>
  );
};