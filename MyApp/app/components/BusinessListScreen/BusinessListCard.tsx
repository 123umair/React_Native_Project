import { View, Text ,Image } from 'react-native'
import React from 'react'
import { BusinessType } from '../HomeScreen/PopularBusinessList'
import Colors from '@/services/Colors'

type Props={
    business:BusinessType
}
export default function BusinessListCard({business}:Props) {
  return (
 
     <View
    style={{
        padding:7,
        backgroundColor:Colors.WHITE,
       borderRadius:15,
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        gap:10

        }}>
   <Image source={{uri:business?.images?.[0]?.url}}
      style={{
        width:120,
        height:120,
        borderRadius:15,
      }}></Image>
      
      

      <View style={{
        display:'flex',
     
        gap:5
      }}>
        <Text style={{fontFamily:'appFontBold',
            fontSize:14
        }}>{business?.name}</Text>
         <Text style={{
            fontFamily:'appFont',
            fontSize:13,
            color:Colors.Gray
         }}>{business?.address}</Text>
        <View style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:4,
                    marginTop:5
                }}>
                    <Image source={require('../../../assets/images/star.png')} style={{width:20,height:20}}></Image>
                    <Text>4.3/5</Text>
                </View>
      </View>
    
    </View>
    
 
  )
}