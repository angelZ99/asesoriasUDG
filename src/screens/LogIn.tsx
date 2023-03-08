import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogInBtn } from '../components/buttons/LogInBtn';
import { colors } from '../theme/appTheme';


//Se modificó porque se debe acceder a la clase padre del drawer para acceder a las propiedades de navigation
// interface Props extends StackScreenProps<any, any>{};
interface Props extends DrawerScreenProps<any, any>{};

export const LogIn = ({navigation} : Props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
          <Text style={styles.title}>ASESORIAS UDG</Text>
          <Image 
            style={styles.logoUdg}
            source={require('../../images/udgLogo.png')} 
          />
      </View>
      <View>
          <Text style={styles.label}>Código</Text>
          <TextInput
            
            style={styles.input}
            textAlign='center'
            placeholder='Tu código de alumno'
            placeholderTextColor={colors.black}
          />
          <Text style={styles.label}>NIP</Text>
          <TextInput
            style={styles.input}
            textAlign='center'
            placeholder='Tu código de alumno'
            placeholderTextColor={colors.black}

          />
      </View>
      <View style={styles.btnContainer}>
        <LogInBtn
          title='Ingresar'
          onPress = {console.log("Ingresé")}
          //btnColor = {colors.secondary}
        />
        <LogInBtn
          title='Registrarme'
          onPress = { console.log("Me registré")}
          position = 'bl'
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent : 'center',
      alignItems: 'center',
      backgroundColor: 'white ',
      flexDirection: 'row',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.black,
    },
    btnContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoContainer: {
      height: 100,
      textAlign: 'center',
    },
    logoUdg: {
      width: 50,
      height: 80,
      marginLeft: 20,
    }, 
    input: {
      marginTop: 5,
      borderWidth: 2,
      borderColor: colors.yellow,
      width: 150,
      borderRadius: 10,
    },
    label: {
      color: 'red',
      marginTop: 30,
    }
});
