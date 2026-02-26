import { View, Text,TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useLocalSearchParams , useRouter} from 'expo-router'
import Colors from '@/services/Colors'
import { axiosClient } from '@/services/GlobalApi'
import BusinessListCard from '../components/BusinessListScreen/BusinessListCard'
import { BusinessType } from '../components/HomeScreen/PopularBusinessList'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function BusinessList() {
  // const [getcategoryName,setGetcategoryName]=useState({})
  const { categoryName } = useLocalSearchParams()
  const [buisnessList,setBuisnessList]=useState<BusinessType[]>([])
  const [originalBusinessList,setOriginalBusinessList]=useState<BusinessType[]>([])
  const [loading,setLoading]=useState(false);
  const router = useRouter()
  useEffect(()=>{
    GetBusinessListByCategory()
  },[])
  const GetBusinessListByCategory =async () =>{
    setLoading(true);
   const result = await axiosClient.get('/buisness-lists?filters[category][name][$eq]=' + categoryName + '&populate=*');
    setBuisnessList(result?.data?.data);
    setOriginalBusinessList(result?.data?.data);
    
    setLoading(false)
  }

  const onSearchFilter=(searchInputValue:string)=>{
    if(!searchInputValue)
    {
      setBuisnessList(originalBusinessList)
      return
    }
    const filterList=originalBusinessList.filter((item)=>{
     return  item.name.toLocaleLowerCase().includes(searchInputValue?.toLowerCase())
    })
    setBuisnessList(filterList)


  }
  return (
    <View style={{
      padding:20,
      paddingTop:30
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
      alignItems:'center',
      gap:5
    }}>
      <TouchableOpacity onPress={()=>router.back()}><Ionicons name="arrow-back-outline" size={24} color="white" /></TouchableOpacity>
       <Text style={{
        marginTop:5,
        fontFamily:'appFontBold',
        fontSize:20,
        color:Colors.WHITE
      }}>{categoryName} Business-list </Text>
    </View>
   
   <View>
    <TextInput placeholder='Search business'
    
    style={{
      backgroundColor:Colors.WHITE,
      padding:15,
      borderRadius:99,
      paddingHorizontal:20,
      fontSize:18,
      marginTop:6

    }}
    onChangeText={(value) => onSearchFilter(value)}
    ></TextInput>
   </View>
   <FlatList
   data={buisnessList}
   onRefresh={()=>GetBusinessListByCategory()}
   refreshing={loading}
   renderItem = {({item,index})=>(
    <BusinessListCard business={item} key={index} />
   )}

   />
    </View>
    
  )
}