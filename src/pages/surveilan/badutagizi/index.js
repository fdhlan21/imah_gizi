import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../../utils/colors'
import { Calendar, LeftArrow } from '../../../assets/img'
import DatePicker from 'react-native-date-picker';
import Modal from "react-native-modal";
import axios from 'axios';
import { URLBadutaGizi } from '../../../utils/storedata/storedata';

export default function FromBadutaGizi({navigation}) {
    const[form, setForm] = useState({
        namabayi:'',
        namaibuayah:'',
        nikibuayah:'',
        usiaibu:'',
        alamat:'',
        usiaanak:'',
        hasilpengukuranhb:'',
        hasilpengukurantb:'',
        waktupendataan: '',
    })
    const [selectedDateText, setSelectedDateText] = useState('Waktu Pendataan'); // Tambah state untuk teks tanggal terpilih
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateTextColor, setSelectedDateTextColor] = useState('gray'); // Warna teks awal adalah abu-abu

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
      };
 
      const handleDateChange = date => {
    
          // Hanya perbarui form jika tanggal yang dipilih adalah tanggal saat ini atau masa lalu
          setForm({ ...form, waktupendataan: date });
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
    const initialDate = form.waktupendataan || new Date();
  
    return (
      <TouchableOpacity onPress={toggleDatePicker}>
        <Image style={{ height: 20, width: 20, tintColor: colors.primary, bottom: 5 }} source={Calendar} />
        <Modal isVisible={showDatePicker}>
          <View style={styles.datePickerContainer}>
          <Text style={{ fontFamily: 'Poppins-Regular', marginTop: 10 }}>Pilih Tanggal Pendataan</Text>
            <DatePicker
              style={{ alignSelf: 'center', marginTop: 10 }}
              date={initialDate}
              mode="date"
              textColor='black'
              onDateChange={handleDateChange}
            />
            <TouchableOpacity onPress={toggleDatePicker}>
            <TouchableOpacity onPress={handleSaveDate}  style={styles.button}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  };
  

    const HandleSimpan = () => {
        if ( (form.namabayi.length == 0 ) |  (form.namaibuayah.length == 0) | (form.nikibuayah.length == 0) | (form.usiaibu.length == 0)  | (form.alamat.length == 0) | (form.usiaanak.length == 0) | (form.hasilpengukuranhb.length ==0) | (form.hasilpengukurantb.length == 0)) {
            alert("Mohon Isi Semua Feild")
        } else {
          console.log(form);
          axios
          .post(URLBadutaGizi, form)
          .then(response => {
            console.log(response.data);
            if (response.data.status == 200) {
              console.log(response.data);
              alert("Data Berhasil di Simpan!");
              navigation.replace("HomeScreen");
            } else {
              alert("Terjadi Kesalahan!")
            }
          })
            .catch(error => {
              console.error(error);
            })
        }
    }

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
            
            <View style={{left: -50}}>
            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, color:'white'}}>Baduta Gizi Kurang / Gizi Buruk</Text>
            </View>
            </View>
        </View>

        <ScrollView>
            <View style={{padding:10,}}>

                <View style={{marginTop:'10%'}}>

                {/* NAMA BAYI */}
                <Text style={{fontFamily:'Poppins-SemiBold', left:2}}>Nama Bayi</Text>
                <TextInput style={{backgroundColor:'#f5f5f5', borderRadius:5, borderWidth:1, height:40, fontFamily:'Poppins-Regular', fontSize:12, color:'black',
                paddingRight:10, paddingLeft:10, }} placeholder='Nama Bayi' placeholderTextColor='gray' value={form.namabayi}
                    onChangeText={value => setForm({...form,namabayi: value})}
                />
                

                    {/* NAMA IBU / AYAH */}
                    <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>Nama Ibu / Ayah</Text>
                <TextInput style={{backgroundColor:'#f5f5f5', borderRadius:5, borderWidth:1, height:40, fontFamily:'Poppins-Regular', fontSize:12, color:'black',
                paddingRight:10, paddingLeft:10, }} placeholder='Nama Ibu / Ayah' placeholderTextColor='gray' value={form.namaibuayah}
                    onChangeText={value => setForm({...form,namaibuayah: value})}
                />

               
                
            

                 {/* NIK */}
                 <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>NIK Ibu / Ayah</Text>
                <TextInput style={{backgroundColor:'#f5f5f5', borderRadius:5, borderWidth:1, height:40, fontFamily:'Poppins-Regular', fontSize:12, color:'black',
                paddingRight:10, paddingLeft:10, }} placeholder='NIK Ibu / Ayah' placeholderTextColor='gray' keyboardType='numeric' value={form.nikibuayah}
                    onChangeText={value => setForm({...form,nikibuayah: value})}/>

                
                  {/* USIA IBU */}
                  <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>Usia Ibu</Text>
                <TextInput style={{backgroundColor:'#f5f5f5', borderRadius:5, borderWidth:1, height:40, fontFamily:'Poppins-Regular', fontSize:12, color:'black',
                paddingRight:10, paddingLeft:10, }} placeholder='Usia Ibu' placeholderTextColor='gray' keyboardType='numeric' value={form.usiaibu}
                    onChangeText={value => setForm({...form,usiaibu: value})}/>
                

                 {/*ALAMAT*/}
                 <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>Alamat</Text>
                <TextInput style={{backgroundColor:'#f5f5f5', borderRadius:5, borderWidth:1, height:40, fontFamily:'Poppins-Regular', fontSize:12, color:'black',
                paddingRight:10, paddingLeft:10, }} placeholder='Alamat' placeholderTextColor='gray' value={form.alamat}
                    onChangeText={value => setForm({...form,alamat: value})}/>
                

                {/*USIA ANAK*/}
                <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>Usia Anak</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor:'#f5f5f5'}}>
                <TextInput
                style={{
                flex: 1,
                backgroundColor: '#f5f5f5',
                fontSize: 12,
                color: 'black',
                paddingLeft: 10,
                height: 40,
                fontFamily: 'Poppins-Regular',
                borderRadius:5,
                     }}
          placeholder="Usia Anak"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={form.usiaanak}
                    onChangeText={value => setForm({...form,usiaanak: value})}
        />
      </View>

                {/*HASIL PENGUKURAN HB*/}
                <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>Hasil Pengukuran HB</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor:'#f5f5f5'}}>
                <TextInput
                style={{
                flex: 1,
                backgroundColor: '#f5f5f5',
                fontSize: 12,
                color: 'black',
                paddingLeft: 10,
                height: 40,
                fontFamily: 'Poppins-Regular',
                borderRadius:5,
                     }}
          placeholder="Hasil Pengukuran HB"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={form.hasilpengukuranhb}
        onChangeText={value => setForm({...form,hasilpengukuranhb: value})}
        />
      </View>

          {/*HASIL PENGUKURAN TB*/}
          <Text style={{fontFamily:'Poppins-SemiBold', left:2, marginTop:20}}>Hasil Pengukuran TB</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor:'#f5f5f5'}}>
                <TextInput
                style={{
                flex: 1,
                backgroundColor: '#f5f5f5',
                fontSize: 12,
                color: 'black',
                paddingLeft: 10,
                height: 40,
                fontFamily: 'Poppins-Regular',
                borderRadius:5,
                     }}
          placeholder="Hasil Pengukuran TB"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={form.hasilpengukurantb}
        onChangeText={value => setForm({...form,hasilpengukurantb: value})}
        />
      </View>
    


        {/*WAKTU PENDAFTARAN*/}
        <Text style={{ fontFamily: 'Poppins-SemiBold', left: 2, marginTop: 20 }}>Waktu Pendataan</Text>
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