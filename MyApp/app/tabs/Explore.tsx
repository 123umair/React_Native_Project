import { View, Text, TextInput , Image, FlatList, TouchableOpacity} from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Colors from '@/services/Colors'
import { axiosClient } from '@/services/GlobalApi'
import { BusinessType } from '../components/HomeScreen/PopularBusinessList'
import { useRouter } from 'expo-router'

export default function Explore() {

   const [getbusinesslist,setGetBusinessList]=useState<BusinessType[]>([])
   const [searchText,setSearchText]=useState<string>('')
   const searchTimer=useRef<any>(null);
   const [loading,setLoading]=useState(false)
   const router=useRouter()

   useEffect(()=>{
    GetBusinessList()
   },[])
    const GetBusinessList = async() =>{
    const result= await axiosClient.get('/buisness-lists?filters[premium][$eq]=true&populate=*')
           setGetBusinessList(result?.data?.data)
           setLoading(false)
          
           
  }

  const onChangeSeachInput=(value:string)=>{
    setSearchText(value);
    if(searchTimer?.current)
      {
      clearTimeout(searchTimer.current)
    }
    searchTimer.current=setTimeout(()=>{
      if(value.trim()==='')
      {
        GetBusinessList()
      }
      else{
        
        SearchBusiness(value)
      }
    },500)

  }

  const SearchBusiness=async(value:string)=>{
    setLoading(true)
   
    const result= await axiosClient.get('/buisness-lists?filters[name][$containsi]='+value+'&populate=*')
           setGetBusinessList(result?.data?.data)
           setLoading(false)
          
           
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

      {/* Search Bar */}

      <Text style={{
        fontFamily:'appFontBold',
        fontSize:20,
        color:Colors.WHITE
      }}>Explore More Business</Text>
    
       <TextInput placeholder='Search' style={{
            padding:15,
            fontSize:20,
            backgroundColor:Colors.WHITE,
            borderRadius:99,
            paddingHorizontal:20,
            marginTop:15}}
          onChangeText={(value)=>onChangeSeachInput(value)}>
      
      
          </TextInput>
      {/* Business List */}
      <FlatList
      data={getbusinesslist}
      onRefresh={()=>searchText?SearchBusiness(searchText):GetBusinessList}
      refreshing={loading}
      style={{
        marginBottom:120
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>
        (
          <TouchableOpacity key={index}
          onPress={()=>{ router.push({pathname:'/business-detail',
            params:{
              business:JSON.stringify(item)
            }
          })}}
            style={{
              borderRadius:15,
              borderWidth:1,
              borderColor:Colors.Gray,
              marginTop:15


            }
          }>
            <Image source={{uri:item?.images[0]?.url}}
            style={{
              width:`100%`,
              height:160,
              borderTopLeftRadius:15,
                 borderTopRightRadius:15
            }}
            ></Image>
            <View style={{ padding:10,}}>
              <Text style={{fontFamily:'appFontBold',}}>{item?.name}</Text>
               <Text style={{fontFamily:'appFont',color:Colors.Gray}}>{item?.address}</Text>
               <View style={{
                       display:'flex',

                       gap:5
                     }}> 
                       <View style={{
                                   display:'flex',
                                   flexDirection:'row',
                                   alignItems:'center',
                                   gap:4,
                                   marginTop:5
                               }}>
                                   <Image source={require('../../assets/images/star.png')} style={{width:20,height:20}}></Image>
                                   <Text>4.3/5</Text>
                               </View>
                     </View>
            </View>
          </TouchableOpacity>
        )
      }
      >

      </FlatList>


    </View>
  )
}