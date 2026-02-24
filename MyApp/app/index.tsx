import { Image,StyleSheet, Text, View, Platform, TouchableOpacity} from "react-native";
import { useEffect,useCallback } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useSSO } from '@clerk/clerk-expo'
import Colors from "@/services/Colors";
import { useUser } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session'
import { axiosClient } from "@/services/GlobalApi";

import * as WebBrowser from 'expo-web-browser'



// Preloads the browser for Android devices to reduce authentication load time
// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

export default function Index() {
   useWarmUpBrowser()
const { startSSOFlow } = useSSO()
const navigation=useNavigation()
const router = useRouter()
const {user}=useUser()
console.log(user)
useEffect(() => {
  navigation.setOptions({headerShown: false})
}, [])

const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri({  scheme: "myapp",}),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              // Navigate to Home Screen
              router.replace('/tabs/Home')
              return
            }
 // Navigate to Home Screen
            router.replace('/tabs/Home')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])
   useEffect(() => {
    user&&CreateNewUser();
    
  }, [user])
  


  const CreateNewUser=async()=>{
    try {
      const result = await axiosClient.post('/user-lists',{
        data:{
          fullName:user?.fullName,
          email:user?.primaryEmailAddress?.emailAddress
        }
      })
      console.log(result.data)
      router.replace('/tabs/Home')
    } catch (error) {
      console.log(error)
      router.replace('/tabs/Home')
    }
  }

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

           <TouchableOpacity onPress={onPress} style={[styles.button,
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
      </TouchableOpacity >
<View style={[styles.button,{backgroundColor:Colors.PRIMARY,borderWidth:0}]}>
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