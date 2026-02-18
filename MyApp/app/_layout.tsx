import { Stack } from "expo-router";
import { useFonts } from 'expo-font'
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFont':require('./../assets/fonts/Montserrat-Regular.ttf'),
    'appFontBold':require('./../assets/fonts/Montserrat-Bold.ttf'),

  })
  if (!fontsLoaded){
    return <ActivityIndicator/>
  }
  return <Stack />;
}
