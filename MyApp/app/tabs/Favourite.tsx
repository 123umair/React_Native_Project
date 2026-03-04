import { View, Text,FlatList, } from 'react-native'
import React,{useState,useEffect} from 'react'
import { axiosClient } from '@/services/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import { BusinessType } from '../components/HomeScreen/PopularBusinessList'
import Colors from '@/services/Colors'
import BusinessListCard from '../components/BusinessListScreen/BusinessListCard'










export default function Favourite() {
  const { user } = useUser()
  const [businessList,setBuisnessList] = useState<BusinessType[]>([])
  const [loading, setLoading] = useState(false)
 


  
  useEffect(()=>{
    GetUserFavBusinessList();
  },[])
  const GetUserFavBusinessList = async()=>{
    setLoading(true)
    const result = await axiosClient('/user-favorites?filter[userEmail][$eq]='+user?.primaryEmailAddress?.emailAddress)
    let businessIds:any=[];
    const favList = result?.data?.data;
    favList.forEach((item:any)=>{
      businessIds.push(item?.businessid)
    })
   
    await GetBusinessList(businessIds)
    setLoading(false)

  }

  const GetBusinessList = async (businessid:[]) =>{
    const result = await axiosClient.get('/buisness-lists',
     { params:{
        'filters[id][$in]':businessid,
        "populate": "*"
      }})
      setBuisnessList(result?.data?.data)
  }
  return (
    <View style={{
      padding:20,
      paddingTop:30
    }}>
      <View style={{
              height:200,
              backgroundColor:Colors.PRIMARY,
              position:'absolute',
              width:'200%'
            }}>
            </View>
      <Text style={{
        fontFamily:'appFontBold',
        fontSize:20,
        color:Colors.WHITE
      }}>User Favorities</Text>

    <FlatList 
    data={businessList}
    showsVerticalScrollIndicator={false}
    onRefresh={()=>GetUserFavBusinessList()}
    refreshing={loading}
    renderItem={({item,index})=>(
      <View>
        <BusinessListCard business={item} key={index}/>
      </View>
    )}
    />
    </View>
  )
}