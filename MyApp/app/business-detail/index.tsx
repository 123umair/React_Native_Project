import { View, Text,TouchableOpacity, ToastAndroid } from 'react-native'
import Colors from '@/services/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter , useLocalSearchParams} from 'expo-router'
import BusinessInfo from '../components/BusinessDetailScreen/BusinessInfo'
import ActionButtonSection from '../components/BusinessDetailScreen/ActionButtonSection'
import BusinessDescription from '../components/BusinessDetailScreen/BusinessDescription'
import { axiosClient } from '@/services/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import React, {useEffect,useState} from 'react'



export default function BusinessDetail() {
  const {business} = useLocalSearchParams()
  const {user} = useUser()
  const router = useRouter()
  const businessDetail = JSON.parse(business.toString())
  const [isFav,setIsFav]=useState(false)
  const [isfavDetail,setIsFavDetail]=useState<{documentId:string}>()
  
const MarkAsFavorite = async () => {

  try {
    if (isFav && isfavDetail?.documentId) {
      await axiosClient.delete('/user-favorites/' + isfavDetail.documentId)

      setIsFav(false)   // 👈 IMPORTANT
      setIsFavDetail(undefined)

      ToastAndroid.show('Removed from favorites', ToastAndroid.BOTTOM)

    } else {

      const data = {
        data: {
          businessid: parseInt(businessDetail?.id),
          userEmail: user?.primaryEmailAddress?.emailAddress
        }
      };

      const result = await axiosClient.post('/user-favorites', data)

      setIsFav(true)    // 👈 IMPORTANT
      setIsFavDetail(result?.data?.data)

      ToastAndroid.show('Marked business favorite!', ToastAndroid.BOTTOM)
    }

  } catch (error) {
    console.log("Error:", error)
  }
};

const CheckMarked= async()=>{
  const result = await axiosClient.get('/user-favorites?filters[userEmail][$eq]='+user?.primaryEmailAddress?.emailAddress+"&filters[businessid][$eq]="+businessDetail?.id)
  const data = result?.data.data;
  setIsFavDetail(data[0])
  if(data?.length>0)
  {
    setIsFav(true)
  }
  else{
    setIsFav(false)
  }
}
  
  useEffect(()=>{
    user&&CheckMarked();
  },[user])

  return (
    <View
    style={{  
      padding:20,
      paddingTop:25,
     
    }}>
      <View style = {{
             height:200,  
             backgroundColor:Colors.PRIMARY,  
             position:'absolute',
             width:'200%'}}>
           </View>

           <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
           }}>
                <TouchableOpacity onPress={()=>router.back()}><Ionicons name="arrow-back-outline" size={24} color="white" /></TouchableOpacity>
                
            { !isFav ? <TouchableOpacity onPress={(MarkAsFavorite)} ><Ionicons name="bookmark-outline" size={24} color="white" /></TouchableOpacity>
               : <TouchableOpacity onPress={(MarkAsFavorite)} ><Ionicons name="bookmark" size={24} color="white" /></TouchableOpacity>
              } 

           </View>
        

         <BusinessInfo business = {businessDetail}/>

          {/* Action Buttons Section */}
          
          <ActionButtonSection business={businessDetail}/>

          {/* Description Section */}
          <BusinessDescription business={businessDetail} />


 
        


    </View>
  )}