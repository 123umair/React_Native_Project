import { View, Text,Image,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { BusinessType } from '../HomeScreen/PopularBusinessList'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/services/Colors';
type Props={
    business:BusinessType
}
export default function BusinessInfo({business}:Props) {
  return (
    <View style={{
        marginTop:20
    }}>
     <Image source={{uri:business?.images[0].url}}
     style={{
        width:'100%',
        height:230,
        borderRadius:15
     }}></Image>
     <View style={{
        margin:15
     }}>
        <Text style={{
            fontFamily:'appFontBold',
            fontSize:20

        }}>{business?.name}</Text>

        <View style={styles.infoIconText}>
            <Ionicons name="location-outline" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>{business?.address}</Text>
        </View>
          <View style={styles.infoIconText}>
            <Ionicons name="globe-outline" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>{business?.website}</Text>
        </View>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    infoIconText:{
        display:"flex",
        flexDirection:"row",
        gap:5,
        alignItems:'center',
        marginTop:5
    },
    infoText:{
        fontSize:13,
        fontFamily:'appFont',
        color:Colors.Gray
    }
})