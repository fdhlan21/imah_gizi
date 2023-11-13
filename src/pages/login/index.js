import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import colors from '../../utils/colors'
import { ImahGiziCirle } from '../../assets/img'
import axios from 'axios';
import { LoginURL, storeData } from '../../utils/storedata/storedata';
import { showMessage } from 'react-native-flash-message';

export default function LoginScreen({navigation}) {

    const [form, setForm] = useState({
        username:'',
        password:'',
    });

    const handlleLogin = () => {
    
        if (!form.username) {
            showMessage({
                type:'default',
                color:'white',
                backgroundColor:colors.errormessage,
                message:'Username Harus diisi!'
            });
        } else if (!form.password) {
            showMessage({
                type:'default',
                color:'white',
                backgroundColor:colors.errormessage,
                message:'Password Harus diisi!'
            });
        } else {

        console.log(form);
        
        axios
        .post(LoginURL, form)
        .then(response => {
            console.log(response.data);
            if (response.data.status == 200) {
                console.log(response.data);
                storeData('user', response.data);
                navigation.replace('HomeScreen');
                alert("Yes!, Login Berhasil.")
          
            } else {
                showMessage({
                    type:'default',
                    color:'white',
                    backgroundColor:colors.errormessage,
                    message:'Sepertinya akun belum terdaftar!'
                });
            }
        })
        .catch(error => {
            console.error(error)
        })

        }
    }

  return (
    <View style={{flex:1, backgroundColor:colors.primary, }}>
    <ScrollView>
     <View style={{padding:10}}>

        <View style={{alignItems:'center', marginTop:'10%'}}>
            <Image style={{width:210, height:200}} source={ImahGiziCirle}/>
        </View>

        <View style={{padding:10, backgroundColor:'white', borderRadius:5, marginTop:50,}}>

        <Text style={{fontFamily:"Poppins-SemiBold", marginBottom:5, left: 2}}>Username</Text>
        <TextInput style={{backgroundColor:'#f5f5f5', borderWidth:1, borderRadius:5, height:40, color:"black", fontFamily:'Poppins-Regular',
        fontSize:12, paddingRight:10, paddingLeft:10, marginBottom:20,}} placeholder='Username' placeholderTextColor='black'
            value={form.username} onChangeText={value => setForm({...form,username: value})}
        />

        
        <Text style={{fontFamily:"Poppins-SemiBold", marginBottom:5, left: 2}}>Password</Text>
        <TextInput style={{backgroundColor:'#f5f5f5', borderWidth:1, borderRadius:5, height:40, color:"black", fontFamily:'Poppins-Regular',
        fontSize:12, paddingRight:10, paddingLeft:10, }} placeholder='Password' placeholderTextColor='black' secureTextEntry={true} 
        value={form.password} onChangeText={value => setForm({...form,password: value})}
        />


        <TouchableOpacity onPress={handlleLogin} style={{padding:10, backgroundColor:colors.primary, borderRadius:5, marginTop:20}}>
            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, textAlign:'center', color:"white"}}>
                Login
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={{padding:10, borderRadius:5, marginTop:5}}>
            <Text style={{fontFamily:"Poppins-Medium", fontSize:12, textAlign:'center', color:"black"}}>
                Belum mempunyai akun? yuk daftar!
            </Text>
        </TouchableOpacity>

        


        </View>

     </View>
    </ScrollView>
    </View>
  )
}