import { View, Text,Image , StyleSheet,TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '@/services/Colors'

export default function Header() {
    const { user } = useUser()
  return (
    <View>
    <View style={{display:'flex',
      justifyContent:'space-between',
      flexDirection:"row",
      alignItems:'center'
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10

      }}>
        <Image source={{uri:user?.imageUrl}} style={{width:50,height:50,borderRadius:99}}></Image>
        <View>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={[styles.heading,{fontFamily:'appFontBold'}]}>{user?.firstName}</Text>
        </View>
        <View>
        </View>
      </View>
         <Image source={require('../../../assets/images/bell.png')} style={{width:50,height:50}}/>
    </View>
    <TextInput placeholder='Search' style={{padding:15,
      fontSize:20,
      backgroundColor:Colors.WHITE,
      borderRadius:99,
      paddingHorizontal:20,
      marginTop:15}}>


    </TextInput>
        </View>
  )
}

const styles = StyleSheet.create({
  heading:{
    fontSize:20,
    fontFamily:'appFont',
    color:Colors.WHITE
  }
})