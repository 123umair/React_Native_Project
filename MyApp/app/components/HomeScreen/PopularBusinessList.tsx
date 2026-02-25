import { View, Text , Image,ActivityIndicator, FlatList,  } from 'react-native'
import React, {useState,useEffect} from 'react'
import { axiosClient } from '@/services/GlobalApi'
import Colors from '@/services/Colors'
import { categoryType } from './Category'

type BusinessType={
    name:string,
    address:string,
    premium:boolean,
    description:string,
    category:categoryType,
    images:ImagesType[],
    id:number
}
type ImagesType={
    url:string
}
export default function PopularBusinessList() {

    const [buisnesslist,setBuisnessList] = useState<BusinessType[]>([])
    const [loading,setLoading]=useState(false)
    
    useEffect(()=>{
        GetPopularBuisnessList()
    },[])
    
    const GetPopularBuisnessList=async()=>{
        setLoading(true)

   const result= await axiosClient.get('/buisness-lists?filters[premium][$eq]=true&populate=*')
        setBuisnessList(result?.data?.data)
        setLoading(false)
        
    }
  return (
  <View style={{ marginTop: 10 }}>

    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Text style={{
        fontSize: 18,
        fontFamily: 'appFontBold'
      }}>
        Popular Business
      </Text>

      <Text style={{
        fontFamily: 'appFont',
        color: Colors.PRIMARY
      }}>
        View All
      </Text>
    </View>

    {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}

    <FlatList
      data={buisnesslist}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ width: 230, marginRight: 10, 
            borderRadius:15,
            backgroundColor:Colors.WHITE
        }}>
          <Image
           
               source={{uri:item.images[0]?.url}}
        
            style={{
              width: '100%',
              aspectRatio: 1.5,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,

            }}
            resizeMode="cover"
          />

          <View style={{padding:10}}>
            <Text style={{
                fontFamily:'appFontBold',
                fontSize:14
            }}>
                {item?.name}
            </Text>
        <Text style={{
            marginTop:2,
            color:Colors.Gray,
            fontFamily:'appFont'
        }}>{item.address}</Text>
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

      )}
    />
    
       
   
  </View>
)}