import React from 'react'
import { Text, View, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const HomeScreen = () => {

  const {user, token, logOut} = useContext(AuthContext);
  console.log(JSON.stringify(user, null, 5));
  console.log(token)
  return (
    <>
      <Text>Home Screen</Text>
      <View style={{flex: 1}}>
        <Button
          title='LogOut'
          onPress={logOut}
        />
        <Text>{token}</Text>
        <Text>{JSON.stringify(user, null, 5)}</Text>
      </View>
    </>
  )
}
