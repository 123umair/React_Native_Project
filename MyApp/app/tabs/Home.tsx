import { View,  FlatList } from 'react-native' // 1. Import ScrollView
import Header from '../components/HomeScreen/Header'
import Sliders from '../components/HomeScreen/Sliders'
import Category from '../components/HomeScreen/Category'
import PopularBusinessList from '../components/HomeScreen/PopularBusinessList'
import Colors from '@/services/Colors'

export default function Home() {
  return (
    <FlatList
    data={[]}
    renderItem={null}
    ListHeaderComponent={
    <View 
   >
      <View style={{
        paddingTop: 28,
        padding: 15,
      }}>
        
        {/* Background Blue Box */}
        <View style={{
          height: 300,
          width: '200%',
          backgroundColor: Colors.PRIMARY,
          position: 'absolute',
          top: 0, // Ensure it stays at the top
          left: 0
        }} />

        {/* Header */}
        <Header />

        {/* Sliders */}
        <Sliders />

        {/* Category */}
        <Category /> 

        {/* PopularBusinessList */}
        
           <PopularBusinessList />
        <View style={{height:100}}>

        </View>

      </View>
    </View>
    }/>
   
  )
}
