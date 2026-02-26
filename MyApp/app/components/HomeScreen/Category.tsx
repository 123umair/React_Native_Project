import { View, Text, FlatList,Image ,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import { axiosClient } from '@/services/GlobalApi'
import Colors from '@/services/Colors'
import { useRouter } from 'expo-router'


export type categoryType = {
    name:string,
    premium:boolean,
    icon:{url:string}
}
export default function Category() {

    const router = useRouter()

    const [categoryList,setCategoryList]=useState<categoryType[]>([])
    useEffect(() => {
      GetCategories()
    }, [])
    

    const GetCategories=async()=>{
        const result = await axiosClient.get('/categories?populate=*')
        setCategoryList(result?.data?.data)
    }
  return (
   <View style={{
    marginTop:15
   }}>
     <View style={{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
      <Text
      style={{fontFamily:'appFontBold',
        fontSize:18
      }}>Category</Text>
      <Text style={{
        fontFamily:'appFont',
        color:Colors.PRIMARY
      }}>View All</Text>
    </View>
    <FlatList
    data={categoryList}
    numColumns={4}
    renderItem={({item,index})=>(
        <TouchableOpacity style={{
            flex:1,
            alignItems:'center',
            padding:4,
            backgroundColor:Colors.WHITE,
          
            margin:3,
            borderRadius:10,
            height:85,
            justifyContent:"center"
        }}
        onPress={()=>router.push(
        { pathname:'/business-list/BusinessList',
          params:{
            categoryName:item?.name
          }
        }
        )}
        >
                <Image source={{uri:item?.icon?.url}}
                style={{
                    width:40,
                    height:40
                }}
                 />
                 <Text style={{textAlign:'center',
                     fontSize:9,

                     fontFamily:'appFont'}}>{item.name}</Text>
        </TouchableOpacity>

    )}
    />
   </View>
  )
}