import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogInBtn } from '../components/buttons/LogInBtn';


//Se modificó porque se debe acceder a la clase padre del drawer para acceder a las propiedades de navigation
// interface Props extends StackScreenProps<any, any>{};
interface Props extends DrawerScreenProps<any, any>{};

export const LogIn = ({navigation} : Props) => {
  return (
    <View style={styles.container}>
        <Text>LogIn</Text>
          <LogInBtn
            title='Ingresar'
            onPress = { console.log("Ingresé")}
          />
          <LogInBtn
            title='Registrarme'
            onPress = { console.log("Me registré")}
            position = 'bl'
          />

    </View>
  );
};

const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center'
    },
});
