import { View, Text } from 'react-native'
import React from 'react'
import { BusinessType } from '../HomeScreen/PopularBusinessList'
import Colors from '@/services/Colors'


type Props = {
    business:BusinessType
}
export default function BusinessDescription({business}:Props) {
  return (
    <View
    style = {{
        marginTop: 15
    }}
    >
      <Text style={{ fontFamily:'appFontBold', fontSize:15}}>BusinessDescription</Text>
      <Text style = {{
        fontSize:10,
        fontFamily:'appFont',
        color:Colors.Gray
      }}>
        {business?.description}
      </Text>
    </View>
  )
}