import { createStackNavigator } from '@react-navigation/stack';
import { LogIn } from '../screens/LogIn';
import { Pagina2Screen } from '../screens/Pagina2Screen';


//Definir que argumentos reciben las pantallas poner tambien en el stack
export type RootStackParams = {
  LogIn: undefined,
  Pagina2Screen: undefined,
}

//Agregar el generico de RootStackParams 
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
        },
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="LogIn" options={{title: "LogIn"}} component={LogIn} />
      <Stack.Screen name="Pagina2Screen" options={{title: "Página 2"}} component={Pagina2Screen} />
    </Stack.Navigator>
  );
};