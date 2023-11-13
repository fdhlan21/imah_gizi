import { View, Text, Image, Animated, Easing,} from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/colors'
import { ImahGiziCirle, LogoImahGizi } from '../../assets/img'
import { ActivityIndicator } from 'react-native';

export default function SplashScreen({navigation}) {
    const [fadeAnim] = useState(new  Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // Durasi animasi dalam milidetik
          easing: Easing.linear, // Easing function (misalnya, Easing.linear, Easing.ease, dsb.)
          useNativeDriver: true, // Menggunakan driver native untuk performa lebih baik
        }).start();
      }, [fadeAnim]);

      
  useEffect(() => {
    // Simulasi waktu tunggu untuk animasi loading (misalnya, 3 detik)
    setTimeout(() => {
      navigation.navigate('LoginScreen'); // Navigasi ke halaman selanjutnya
    }, 3000); // Waktu tunggu dalam milidetik (3 detik)
  }, [navigation]);

      
  return (
    <View style={{flex:1, backgroundColor:colors.primary,}}>
        <View style={{padding:10, alignItems:'center', marginTop:'50%'}}>
        <Animated.View style={{ opacity: fadeAnim , alignItems:'center'}}>
          <Image style={{ width: 215, height: 200 , alignItems:'center'}} source={ImahGiziCirle} />
          <Text style={{ fontSize: 50, marginTop: 20, color:'white', fontFamily:'Poppins-SemiBold', textAlign:'center'}}>Imah Gizi</Text>
          <Text style={{color:'white', textAlign:"center", fontFamily:"Poppins-Regular", }}>Tim Pendamping Keluarga Bergerak Mewujudkan Zero New Stunting</Text>
        </Animated.View>

        <View>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        </View>
        </View>
    </View>
  )
}