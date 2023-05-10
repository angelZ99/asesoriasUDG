import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, Alert, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogInBtn } from '../components/buttons/LogInBtn';
import { colors } from '../theme/appTheme';
import { Background } from '../components/Background';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHeaderHeight } from '@react-navigation/elements'


//Se modificó porque se debe acceder a la clase padre del drawer para acceder a las propiedades de navigation
// interface Props extends StackScreenProps<any, any>{};
interface Props extends StackScreenProps<any, any>{};



export const LogIn = ({navigation, children} : Props) => {

  console.log(children)
  //Llamar el useContext
  const { signIn, errorMessage, removeError } = useContext( AuthContext ); 

  const {email, password, onChange} = useForm({
    email: '',
    password: ''
  });

  //Cuando haya mensaje de error muestra una alerta en pantalla
  useEffect(() => {
    if(errorMessage.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError()}]);
  }, [errorMessage])
  

  const onLogin = () => {
    //Oculta el teclado cuando entra a la función
    Keyboard.dismiss();
    console.log(email, password);
    signIn({ email, password });
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          enabled
          keyboardVerticalOffset={-500}
      >
        <Background/>
        <TouchableWithoutFeedback>
          <View style={{margin: 20, marginTop: 50}}>
            <View style={styles.container}>
                <Text style={styles.title}>ASESORIAS UDG</Text>
                {/* <View style={styles.imgContainer}>
                  <Image 
                    style={styles.logoUdg}
                    source={require('../../images/logo.png')} 
                  />
                </View> */}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputSection}>
                <Icon name="person-outline" size={30} color={colors.black}/>
                <TextInput
                  style={styles.input}
                  textAlign='left'
                  placeholder='Correo institucional'
                  keyboardType="email-address"
                  placeholderTextColor={colors.gray}
                  onChangeText={(value) => onChange(value, 'email')}
                  onSubmitEditing={onLogin}
                  value={email}
                />
              </View>

              <View style={styles.inputSection}>
                <Icon name="lock-closed-outline" size={30} color={colors.black}/>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  textAlign='left'
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholderTextColor={colors.gray}
                  onChangeText={(value) => onChange(value, 'password')}
                  value={password}
                  onSubmitEditing={onLogin}
                />
              </View>
            </View>

            <View style={styles.btnContainer}>
              <LogInBtn
                title='Ingresar'
                onPress = { onLogin }
                //btnColor = {colors.secondary}
              />
            </View>
            <View style={styles.registerContainer}>
              <Text style={{color: colors.white}}>¿No estás registrado en Asesorías UDG? </Text>
              <TouchableOpacity
                //el .replace() hace que no se pueda regresar a la pestaña anterior
                onPress={ () => navigation.replace('RegisterScreen')}
              ><Text style={{color: colors.yellow}}>Regístrate</Text></TouchableOpacity>
            </View>               
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent : 'center',
      alignItems: 'center',
      backgroundColor: 'white ',
      flexDirection: 'row',
      marginTop: 0,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.black,
    },
    btnContainer: {
      marginTop: 40,
    },
    logoUdg: {
      width: 200,
      height: 50,
      tintColor: 'black'
    }, 
    input: {
      flex: 1,
      borderWidth: 2,
      borderColor: colors.yellow,
      borderRadius: 10,
      marginLeft: 5,
      padding: 12,
    },
    inputContainer: {
      marginTop: 30,
    },
    inputSection:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    imgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
    },
    registerContainer: {
      height: 400,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    }
});
