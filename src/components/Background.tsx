import React from 'react'
import { View } from 'react-native'
import { colors } from '../theme/appTheme'

export const Background = () => {
  return (
    <View
        style={{
            borderWidth: 3,
            borderColor: colors.yellow,
            position: 'absolute',
            backgroundColor: colors.secondary,
            top: 550,
            left: -400,
            width: 1000,
            height: 1200,
            transform: [
                {rotate: '-75deg'}
            ]
        }}
    />
  )
}
