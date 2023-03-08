import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/appTheme';


interface Props{
    title : string;
    onPress : () => void;
    position ?: 'br' | 'bl'; //Botom right o botom left
    //? significa que es opcional recibir esta propiedad
    btnColor : string;
}

export const LogInBtn = ({title, onPress, position = 'br', btnColor}: Props) => {
  return (
    <TouchableOpacity
        //Si recibe bl (botonLeft) devuelve fabLocationBL sino devuelve BR
        style={
            (position === 'bl') ? styles.fabLocationBL : styles.fabLocationBR
            //styles.boton.backgroundColor  btnColor
        }
        //Se ejecuta la función que recibe en los props
        onPress={onPress}
    >
        <View style={styles.boton}>
            <Text style={styles.btnText}>{title}{btnColor}</Text>
        </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    fabLocationBR: {
    },
    fabLocationBL: {
    },
    boton: {
        backgroundColor: '#260F55',
        borderWidth: 1,
        borderColor: colors.yellow,
        borderRadius: 5,
        width: 140,
        height: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        padding: 12,
    }
})