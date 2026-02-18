import { Image,StyleSheet, Text, View} from "react-native";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import Colors from "@/services/Colors";
export default function Index() {
const navigation=useNavigation()

useEffect(() => {
  navigation.setOptions({headerShown: false})
}, [])

  return (
  <View style={styles.container}>
   

    <Image source={require(`./../assets/images/welcome.png`)} 
    style={{
      width:'100%',
      height:270,
      marginTop:130,
      marginBottom:25
    }}/>
      <Text style={styles.heading}> Welcome to</Text>
      <Text style={styles.heading}> Business Directory</Text>
      
      <View
      style={{
        padding:20,
        backgroundColor:Colors.WHITE,
        margin:20,
        borderRadius:20,

      }}>
          <Text
          style={{
            fontFamily:'appFont',
            fontSize:10,
            textAlign:'center',
          }}>
            Discover thousands of local business all in one place
          </Text>

           <View style={[styles.button,
            {display:'flex',
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              gap:5,

            }
            
           ]}>
            <Image source={require('./../assets/images/google.png')}
            style={{
              width:20,
              height:20,

            }}></Image>
        <Text style={{
          textAlign:'center',
          fontFamily :'appFont',
          fontSize: 12}}>
          
          Sign In With Google
        </Text>
      </View>
<View style={[styles.button,{backgroundColor:Colors.PRIMARY}]}>
        <Text style={{
          textAlign:'center',
          fontFamily :'appFont',
          fontSize: 12,
          color:Colors.WHITE,}}>
         Skip
        </Text>
      </View>
          
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
      backgroundColor:Colors.PRIMARY,
      height:"100%",
      
  },
  heading:{
    fontFamily:'appFontBold',
    fontSize:25,
    color:Colors.WHITE,
    textAlign:'center'
  },
  button:{
    borderWidth:2,
    padding:15,
    borderRadius:99,
    marginTop:15,
  }
})