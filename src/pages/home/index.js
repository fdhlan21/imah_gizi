import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ImahGiziCirle, MenuLapaoran1, MenuLapaoran2, MenuLapaoran3, MenuSurveilan1, MenuSurveilan2, MenuSurveilan3, Slider1 } from '../../assets/img'
import colors from '../../utils/colors'

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex:1, backgroundColor:colors.primary}}>
     <ScrollView>
        <View style={{padding:10, }}>

    <View>
        <Image style={{width:340, height:170,  borderRadius:5, }} source={Slider1}/>
    </View>

    <View style={{marginTop:'10%'}}>
        <View>
            <Text style={{fontFamily:'Poppins-SemiBold', left:40, marginBottom:10, color:'white', fontSize:18}}>Menu Surveilan</Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly',}}>
                <TouchableOpacity onPress={() => navigation.navigate("FromIbuHamilKEK")}>
                    <Image style={{height:70, width:70, }} source={MenuSurveilan1}/>
                    <Text style={{fontFamily:'Poppins-Medium', fontSize:10, textAlign:'center', left: -0, color:'white', top:5}}>Ibu Hamil{'\n'}KEK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FromIbuHamilAnemia")}>
                    <Image style={{height:70, width:70, }} source={MenuSurveilan2}/>
                    <Text style={{fontFamily:'Poppins-Medium', fontSize:10, textAlign:'center', left: -0, color:'white', top:5}}>Ibu Hamil{'\n'}Anemia</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FromBadutaGizi")}>
                    <Image style={{height:70, width:70, }} source={MenuSurveilan3}/>
                    <Text style={{fontFamily:'Poppins-Medium', fontSize:10, textAlign:'center', left: -0, color:'white', top:5}}>Baduta{'\n'}Gizi Kurang{'\n'}/ Gizi Buruk</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{marginTop: '10%'}}>
            <Text style={{fontFamily:'Poppins-SemiBold', left:40, marginBottom:0, color:'white', fontSize:18}}>Menu Laporan</Text>
            <Text style={{fontFamily:'Poppins-Regular', left:40, marginBottom:10, color:'white'}}>Kegiatan perdampingan{'\n'}keluarga risiko Stunting</Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly',}}>
                <TouchableOpacity onPress={() => navigation.navigate("FromKonseling")}>
                    <Image style={{height:70, width:70, }} source={MenuLapaoran1}/>
                       <Text style={{fontFamily:'Poppins-Medium', fontSize:10, textAlign:'center', left: -0, color:"white", top:5}}>Konseling</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FromBantuanSocial")}>
                    <Image style={{height:70, width:70, }} source={MenuLapaoran2}/>
                    <Text style={{fontFamily:'Poppins-Medium', fontSize:10, textAlign:'center', left: -0, color:"white", top:5}}>Bantuan{'\n'}Sosial</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FromRujukan")}>
                    <Image style={{height:70, width:70, }} source={MenuLapaoran3}/>
                    <Text style={{fontFamily:'Poppins-Medium', fontSize:10, textAlign:'center', left: -0, color:"white", top:5}}>Rujukan</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>

        <View style={{alignItems:'center', marginTop:'11%'}}>
            <Image style={{height:115, width:120}} source={ImahGiziCirle}/>
        </View>
        </View>
     </ScrollView>
    </View>
  )
}