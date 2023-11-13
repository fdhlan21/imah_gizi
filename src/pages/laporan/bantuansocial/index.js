import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../../utils/colors'
import { Calendar, LeftArrow } from '../../../assets/img'
import DatePicker from 'react-native-date-picker';
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URLBantuansosial } from '../../../utils/storedata/storedata';

export default function FromBantuanSocial({navigation}) {

    
    

  const[form, setForm] = useState({
        waktukegiatan:'',
        jenisbantuan:'',
        sumberbantuan:'',
        foto: null, // State untuk gambar yang dipilih
    });


    const pickImage = () => {
      const options = {
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          includeBase64: false, // Jangan gunakan base64 di sini
      };
    
      launchImageLibrary(options, (response) => {
          if (response.didCancel) {
              console.log('Pengguna membatalkan pemilihan gambar');
          } else if (response.error) {
              console.log('Error:', response.error);
          } else if (response.customButton) {
              console.log('Tombol kustom ditekan:', response.customButton);
          } else {
              // Mendapatkan path file gambar yang dipilih
              const imageUri = response.assets ? response.assets[0]?.uri : null;
    
              if (imageUri) {
                  // Mengonversi gambar ke base64
                  RNFS.readFile(imageUri, 'base64')
                      .then((base64data) => {
                          // Menyimpan base64 dalam state form
                          setForm({ ...form, foto: base64data });
                          alert('Gambar Profile Berhasil di Unggah');
                      })
                      .catch((error) => {
                          console.error('Terjadi Kesalahan', error);
                      });
              }
          }
      });
    };
    
      
    const [selectedDateText, setSelectedDateText] = useState('Waktu Kegiatan'); // Tambah state untuk teks tanggal terpilih
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateTextColor, setSelectedDateTextColor] = useState('gray'); // Warna teks awal adalah abu-abu

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
      };
 
      const handleDateChange = date => {
       
     
          // Hanya perbarui form jika tanggal yang dipilih adalah tanggal saat ini atau masa lalu
          setForm({ ...form, waktukegiatan: date });
          setSelectedDateText(
            `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
          );
          setSelectedDateTextColor('black');
       
      };
      

const handleSaveDate = () => {
    setShowDatePicker(false); // Menutup modal
  };

    
  const PickerDate = () => {
    // Set tanggal awal di modal kalender sebagai tanggal saat ini
    const initialDate = form.waktukegiatan || new Date();
  
    return (
      <TouchableOpacity onPress={toggleDatePicker}>
        <Image style={{ height: 20, width: 20, tintColor: colors.primary, bottom: 5 }} source={Calendar} />
        <Modal isVisible={showDatePicker}>
          <View style={styles.datePickerContainer}>
          <Text style={{ fontFamily: 'Poppins-Regular', marginTop: 10 }}>Pilih Tanggal Kegiatan</Text>
            <DatePicker
              style={{ alignSelf: 'center', marginTop: 10 }}
              date={initialDate}
              mode="date"
              textColor='black'
              onDateChange={handleDateChange}
            />
            <TouchableOpacity onPress={toggleDatePicker} >
            <TouchableOpacity onPress={handleSaveDate} style={styles.button}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  };
  
  const HandleSimpan = () => {
    if (!form.waktukegiatan) {
      alert("Waktu Kegiatan harus diisi!");
    }  else if (!form.jenisbantuan) {
        alert("Jenis Bantuan harus diisi!");
    } else if (!form.sumberbantuan) {
      alert("Sumber Bantuan harus diisi!");
    } else if (!form.foto) {
      alert("Anda harus mengunggah foto!");
    } else {
    
      console.log(form);

      axios
      .post(URLBantuansosial, form)
      .then(response => {
        console.log(response.data);

        if (response.data.status == 200) {
          console.log(response.data);
          alert("Data Berhasil di Simpan!");
          navigation.navigate("HomeScreen")
        } else {
          alert("Terjadi Kesalahan!")
        }
      })
      .catch(error => {
        console.error(error);
      })
      
    }
  };
  

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <>
    <View style={{flex:1,  backgroundColor:'white'}}>
   
        <View style={{padding:10, backgroundColor:colors.primary,}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

            <View>
            <TouchableOpacity onPress={handleBack}>
                <Image source={LeftArrow} style={{tintColor:'white', height:25, width:25}}/>
            </TouchableOpacity>
            </View>
            
            <View style={{left: -115}}>
            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, color:'white'}}>Bantuan Sosial</Text>
            </View>
            </View>
        </View>

        <ScrollView>
            <View style={{padding:10,}}>

                <View style={{marginTop:'10%'}}>

        {/*WAKTU PENDAFTARAN*/}
        <Text style={{ fontFamily: 'Poppins-SemiBold', left: 2, marginTop: 20 }}>Waktu Kegiatan</Text>
        <View style={{  flexDirection:'row', borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor:'#f5f5f5', height:40, justifyContent:'space-between'}}>
        <View>
          
          <Text style={{    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontSize:12,
    bottom:0,
    top:0,
    left:10,
    marginTop:10,
    color: selectedDateTextColor
   }}>
            {selectedDateText}
          </Text>
       
        </View>


        <View style={{top:15, left:-10}}>
     <PickerDate/>
        </View>
        </View>

        {/* JENIS BANTUAN */}
        <View style={{marginTop:20}}>
            <Text style={{fontFamily:"Poppins-SemiBold", left:2}}>Jenis Bantuan</Text>
            <TextInput style={{backgroundColor:'#f5f5f5', borderWidth:1, borderRadius:5, height:40, paddingRight:10, 
            paddingLeft:10, color:'black', fontFamily:"Poppins-Regular", fontSize:12}} placeholder='Jenis Bantuan' placeholderTextColor='gray'
                value={form.jenisbantuan}  onChangeText={value => setForm({...form,jenisbantuan: value})}
            />
        </View>


        {/* SUMBER BANTUAN */}
        <View style={{marginTop:20}}>
            <Text style={{fontFamily:"Poppins-SemiBold", left:2}}>Sumber Bantuan</Text>
            <TextInput style={{backgroundColor:'#f5f5f5', borderWidth:1, borderRadius:5, height:40, paddingRight:10, 
            paddingLeft:10, color:'black', fontFamily:"Poppins-Regular", fontSize:12}} placeholder='Sumber Bantuan' placeholderTextColor='gray'
                value={form.sumberbantuan}  onChangeText={value => setForm({...form,sumberbantuan: value})}
            />
        </View>


              {/* UPLOAD PHOTO */}
              <View style={{marginTop:20}}>
            <Text style={{fontFamily:"Poppins-SemiBold", left:2}}>Unggah Foto</Text>
            <TouchableOpacity onPress={pickImage} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: 'center' }}>Pilih Foto</Text>
            </TouchableOpacity>

            {form.foto && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', left: 2 , textAlign:"center"}}>Foto Terpilih</Text>
                                    <View style={{alignItems:"center"}}>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${form.foto}` }}
                                        style={{ width: 150, height: 150, marginTop: 10 }}
                                    />

                                    </View>
                                </View>
                            )}




        </View>
     </View>


     

        {/* SIMPAN */}
        <View style={{marginTop:20}}>
            <TouchableOpacity  onPress={HandleSimpan} style={{padding:10, backgroundColor:colors.primary, borderRadius:5, }}>
                <Text style={{color:'white', fontFamily:'Poppins-SemiBold', fontSize:15, textAlign:'center'}}>Simpan</Text>
            </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    </View>
    </>
  )
}


const styles = StyleSheet.create({
    placehorder:{
      height:40,
        backgroundColor:'#dedede',
        borderRadius:10, 
        color:'black', 
        paddingRight:10, 
        paddingLeft:10, 
        fontFamily:'Poppins-Regular',
        fontSize:12,
    },
    nameholder: {
       height:40,
        backgroundColor:'#dedede',
        borderRadius:10, 
        color:'black', 
        paddingRight:10, 
        paddingLeft:10, 
        fontFamily:'Poppins-Regular',
        fontSize:12,
},

datePickerContainer: {
    height:280,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:10,
 
    
   
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.success,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'white',
    height:40,
    width:100,


  },
  buttonText: {
    color: 'white',
    fontFamily:'Poppins-SemiBold',
    textAlign:'center',
    fontSize:12

  },

})