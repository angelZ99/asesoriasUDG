import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogInBtn } from '../components/buttons/LogInBtn';
import { colors } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({navigation} : Props) => {

  const {signUp, removeError, errorMessage} = useContext( AuthContext );

  const {codigo, email, name, surname1, surname2, phoneNumber, password, password2, nip, onChange} = useForm({
    codigo: '',
    email: '',
    name: '',
    surname1: '',
    surname2: '',
    phoneNumber: '',
    password: '',
    password2: '',
    nip: '',
  });


    useEffect(() => {
      if(errorMessage.length === 0) return;

      Alert.alert('Registro incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError()}]);
    }, [errorMessage]);

  const onRegister = () => {
    //Oculta el teclado cuando entra a la función
    Keyboard.dismiss();
    if(password !== password2) return Alert.alert("Las contraseñas no coinciden");

    signUp({
      codigo,
      email,
      name,
      surname1,
      surname2,
      phoneNumber,
      password,
      nip
    });
  }
 
  return (
    <>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
      >
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
            <Text style={styles.title}>Registro</Text>
            <View style={styles.inputSection}>
              <TextInput
                style={{
                  ...styles.input,
                  marginLeft: 0,
                }}
                textAlign='left'
                placeholder='Nombre'
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize='words'
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'name')}
                onSubmitEditing={onRegister}
                value={name}
              />
            </View>
            <View style={styles.inputNameContainer}>
              <TextInput
                style={{
                  ...styles.input,
                  marginLeft: 0,
                }}
                textAlign='left'
                placeholder='Primer apellido'
                keyboardType="default"
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'surname1')}
                onSubmitEditing={onRegister}
                value={surname1}
              />
              <TextInput
                style={styles.input}
                textAlign='left'
                placeholder='Segundo apellido'
                keyboardType="default"
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'surname2')}
                onSubmitEditing={onRegister}
                value={surname2}
              />
            </View>

            <View style={styles.inputSection}>
              <Icon name="person-outline" size={30} color={colors.black}/>
              <TextInput
                style={styles.input}
                textAlign='left'
                placeholder='Código'
                keyboardType="numeric"
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'codigo')}
                onSubmitEditing={onRegister}
                value={codigo}
              />
            </View>
            <View style={styles.inputSection}>
              <Icon name="call-outline" size={30} color={colors.black}/>
              <TextInput
                style={styles.input}
                textAlign='left'
                placeholder='Numero de celular'
                keyboardType="phone-pad"
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'phoneNumber')}
                onSubmitEditing={onRegister}
                value={phoneNumber}
              />
            </View>
            <View style={styles.inputSection}>
              <Icon name="mail-outline" size={30} color={colors.black}/>
              <TextInput
                style={styles.input}
                textAlign='left'
                placeholder='Correo institucional'
                keyboardType="email-address"
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'email')}
                onSubmitEditing={onRegister}
                value={email}
              />
            </View>

            <View style={styles.inputSection}>
              <Icon name="lock-closed-outline" size={30} color={colors.black}/>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                textAlign='left'
                placeholder='Contraseña'
                autoCapitalize='none'
                autoCorrect={false}
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'password')}
                value={password}
                onSubmitEditing={onRegister}
              />
            </View>
            <View style={styles.inputSection}>
              <Icon name="lock-closed-outline" size={30} color={colors.black}/>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                textAlign='left'
                placeholder='Confirmar contraseña'
                autoCapitalize='none'
                autoCorrect={false}
                placeholderTextColor={colors.gray}
                onChangeText={(value) => onChange(value, 'password2')}
                value={password2}
                onSubmitEditing={onRegister}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <LogInBtn
              title='Registrarme'
              onPress = { onRegister }
              //btnColor = {colors.secondary}
            />
          </View>
          <View style={styles.registerContainer}>
            <Text style={{color: colors.gray}}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity
              //el .replace() hace que no se pueda regresar a la pestaña anterior
              onPress={ () => navigation.replace('LogIn')}
            ><Text style={{color: colors.secondary}}>Inicia Sesión</Text></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
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
      marginTop: 20,
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
      padding: 10,
      marginLeft: 15,
    },
    inputContainer: {
      marginTop: 10,
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
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    inputNameContainer: {
      flexDirection: 'row',
      marginTop: 30,
    }
});