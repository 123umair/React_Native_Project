import { View, Text,TouchableOpacity, Platform, Linking , Share, Alert } from 'react-native'
import React from 'react'
import { BusinessType }   from '../HomeScreen/PopularBusinessList'
import { StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '@/services/Colors'

type Props={
    business: BusinessType
}
export default function ActionButtonSection({ business }: Props) {
  const onNavigate = async () => {
    // This function is related to the google map functionality 
    const nativeUrl = Platform.OS == 'ios' ?
    `maps:0,0?q=${business?.address}`                       
    : `geo:0,0?q=${business?.address}`

    await Linking.openURL(nativeUrl)
  }

  const onCall = async()=>{
  if(business?.phone)
  {

    const callUrl = `tel:${business?.phone}`
    await Linking.openURL(callUrl)
  } else 
  {
     Alert.alert('Error','Phone number not available for this business')
  }
  }

 const onWebsiteClick = async () => {
  if (!business?.website) {
    alert("Website link not available");
    return;
  }

  // Sahi logic: check karein ke http ya https se shuru ho raha hai ya nahi
  const url = business.website.startsWith('http') 
    ? business.website 
    : `https://${business.website}`; // Yahan // lazmi hai

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open this URL: " + url);
    }
  } catch (error) {
    console.error("Error opening URL:", error);
  }
};

  const onShareClick=async ()=>{
    const result = await Share.share({
      message:`check our this local business:\n`+
      `Business Name:`+business?.name
      
    })
  }
  return (
    // Main View
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10
    }}>
      {/* Location */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={(onNavigate)}>
        <View style={styles.container}>
          <Ionicons name="navigate" size={24} color={Colors.WHITE} />
        </View>
        <Text style={styles.ActionText}>Location</Text>
      </TouchableOpacity>

      {/* Website */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={(onWebsiteClick)}>
        <View style={styles.container}>
          <Ionicons name="globe" size={24} color={Colors.WHITE} />
        </View>
        <Text style={styles.ActionText}>Website</Text>
      </TouchableOpacity>

      {/* Contact - Fix here */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={(onCall)}>
        <View style={styles.container}>
          <Ionicons name="call" size={24} color={Colors.WHITE} />
        </View>
        <Text style={styles.ActionText}>Contact</Text>
      </TouchableOpacity>

      {/* Share - Fix here */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onShareClick}>
        <View style={styles.container}>
          <Ionicons name="share" size={24} color={Colors.WHITE} />
        </View>
        <Text style={styles.ActionText}>Share</Text>
      </TouchableOpacity>
      
    </View> // Main View closing tag
  );
}
const styles = StyleSheet.create({

  container: {
    padding:15,
   
    backgroundColor:Colors.PRIMARY,
    borderRadius:15,
  },
  ActionText:{
    fontFamily:'appFont',
    textAlign:'center',
    marginTop:2
  }


})