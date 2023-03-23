import React, { createContext, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import asesoriasApi from "../api/asesoriasApi";
import { authReducer, AuthState } from "./authReducer";
import { useEffect } from 'react';


//El objetio que se recibirá al iniciar sesión debe lucir asi
export interface LoginResponse{
    user: User;
    token: string;
}

//Asi debe lucir el objeto de usuario
export interface User{
    codigo: string,
    email: string,
    name: string,
    surname1: string,
    surname2: string,
    phoneNumber: string,
    password: string,
    nip: string,
}

interface LogInData{
    email : string,
    password : string,
}

interface RegisterData{
    codigo : string,
    name : string,
    surname1 : string,
    surname2 : string,
    phoneNumber : string,
    email : string,
    password : string,
    nip: string,
}
//Esta es la información que el context va a proporcionar
type AuthContextProps = {
    errorMessage : string;
    token : string | null;
    user: User;
    status: 'checking' | 'authenticated' | 'no-authenticated';
    signIn: ( loginData : LogInData) => void;
    signUp: ( registerData : RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
}


//Initial state
const authInitialState: AuthState = {
    status: "checking",
    token: null,
    user: null,
    errorMessage: '',
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);
    
    //Descomentar todo esto para validar el JWT
    /*useEffect(() => {
        checkToken();
    }, [])
    

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        //Si no hay token
        if(!token) return dispatch({ type: 'notAuthenticated' });


        //Si hay token
        const { data, status } = await asesoriasApi.get('/auth');

        //Si el status es diferente de exitoso
        if(status !== 200) return dispatch({ type: 'notAuthenticated' });

        //Modificar para poner el token que se recibe
        await AsyncStorage.setItem('token', 'yhugvfbrlsvinheiurbvhneibujnhuj');
        //Si el estatus es igual a 200
        dispatch({
            type: 'singUp',
            payload: {
                token: data.token,
                user: data.user,
            }
        });
    }*/

    const signIn = async ( {email, password} : LogInData) => {
        try {
            const {data} = await asesoriasApi.post<LoginResponse>('/users/login', {institutional_email: email, password});
            //console.log(data.user);

            //Se dispara la accion de signUp
            dispatch({
                type: 'singUp',
                payload: {
                    //token: data.token,
                    user: data,
                }
            });

            await AsyncStorage.setItem('token', 'yhugvfbrlsvinheiurbvhneibujnhuj');
            //Descomentar esta linea para guardar el token en el async storage
            // await AsyncStorage.setItem('token', data.token);

        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || "Datos incorrectos"
            })
        }
    };

    const signUp = async ( object : RegisterData) => {
        try {
            const {data} = await asesoriasApi.post<LoginResponse>('/users/', { 
                user_code: object.codigo,
                institutional_email: object.email,
                name: object.name,
                surname1: object.surname1,
                surname2: object.surname2,
                phone_number: object.phoneNumber,
                password: object.password, 
                nip_code: object.nip,
            });
            //console.log(data.user);

            //Se dispara la accion de signUp
            dispatch({
                type: 'singUp',
                payload: {
                    //token: data.token,
                    user: data,
                }
            });

            await AsyncStorage.setItem('token', 'yhugvfbrlsvinheiurbvhneibujnhuj');
            //Descomentar esta linea para guardar el token en el async storage
            // await AsyncStorage.setItem('token', data.token);

        } catch (error) {
            console.log(error.response.data.message[0])
            dispatch({
                type: 'addError',
                payload: error.response.data.message[0] || "Revise la información"
            })
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logOut'});

    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        })

    };

    return(
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    );
}