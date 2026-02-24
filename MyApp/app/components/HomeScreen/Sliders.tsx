import { View,  FlatList,Image, Dimensions } from 'react-native'
import React,{useEffect , useState} from 'react'
import { axiosClient } from '@/services/GlobalApi'

type SliderType = {
    name:string,
    image:{url:string}
}
export default function Sliders() {
//Fetch Slider from Admin Panel
const [sliders,setSliders] = useState<SliderType[]>([])
  useEffect(() => {
    GetSliders()
    }, [])
const GetSliders = async () => {
    const result = await axiosClient.get('/sliders?populate=*')
    console.log(result.data)
    setSliders(result?.data?.data)
}
  return (
    <View style={{marginTop:20}}>
     <FlatList
     data={sliders}
     horizontal={true}
     showsHorizontalScrollIndicator={false}
     pagingEnabled
     renderItem={({item,index})=>(
        <View key={index}>
            <Image source={{uri:item?.image?.url}} 
            style = {{
                width:Dimensions.get('screen').width*0.9,
                height:200,
                borderRadius:20,
                marginRight:5,
               
            }}
            />
        </View>
     )} />
    </View>
  )
}