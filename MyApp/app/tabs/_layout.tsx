import {useEffect} from 'react'
import { Tabs } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import Colors from '@/services/Colors';
import Ionicons from '@expo/vector-icons/Ionicons'; 

export default function TabLayout() {
    const navigation = useNavigation()
    useEffect(() => {
      navigation.setOptions({headerShown:false})}
    , [])
    
  return (
    <Tabs   screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: Colors.PRIMARY
    }}>
    <Tabs.Screen name='Home' options={{tabBarIcon:({color,size})=><Ionicons name="home" size={size} color={color} />}}  />
    <Tabs.Screen name='Explore' options={{tabBarIcon:({color,size})=><Ionicons name="search" size={size} color={color} />}} />
    <Tabs.Screen name='Favourite' options={{tabBarIcon:({color,size})=><Ionicons name="heart" size={size} color={color} />}} />
    <Tabs.Screen name='Profile' options={{tabBarIcon:({color,size})=><Ionicons name="people-circle" size={size} color={color} />}} />
     </Tabs>
   
  )
} 