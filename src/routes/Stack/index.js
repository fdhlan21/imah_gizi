// In App.js in a new project

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import SplashScreen from '../../pages/splash';
import LoginScreen from '../../pages/login';
import HomeScreen from '../../pages/home';
import FromIbuHamilKEK from '../../pages/surveilan/ibuhamilkek';
import FromIbuHamilAnemia from '../../pages/surveilan/ibuhamilanemia';
import FromBadutaGizi from '../../pages/surveilan/badutagizi';
import FromKonseling from '../../pages/laporan/konseling';
import FromBantuanSocial from '../../pages/laporan/bantuansocial';
import FromRoujukan from '../../pages/laporan/rujukan';
import RegisterScreen from '../../pages/register';

const Tab = createBottomTabNavigator();



const Stack = createNativeStackNavigator();

function StackNav() {
  return (
 
      <Stack.Navigator initialRouteName='FromIbuHamilKEK'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="FromIbuHamilKEK" component={FromIbuHamilKEK} options={{headerShown:false}}/>
        <Stack.Screen name="FromIbuHamilAnemia" component={FromIbuHamilAnemia} options={{headerShown:false}}/>
        <Stack.Screen name="FromBadutaGizi" component={FromBadutaGizi} options={{headerShown:false}}/>
        <Stack.Screen name="FromKonseling" component={FromKonseling} options={{headerShown:false}}/>
        <Stack.Screen name="FromBantuanSocial" component={FromBantuanSocial} options={{headerShown:false}}/>
        <Stack.Screen name="FromRujukan" component={FromRoujukan} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  );
}

export default StackNav;