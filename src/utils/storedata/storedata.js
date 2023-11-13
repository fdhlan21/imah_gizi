import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
}


export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return JSON.parse(value);
    }
  } catch(e) {
    // error reading value
  }
}

export const RegisterURL = 'https://imahgizi.okeadmin.com/api/register';
export const LoginURL = 'https://imahgizi.okeadmin.com/Api/login';
export const URLIbuHamilKEK = 'https://imahgizi.okeadmin.com/Api/ibuhamilkek';
export const URLIbuHamilAnemia = 'https://imahgizi.okeadmin.com/Api/ibuhamilanemia';
export const URLBadutaGizi = 'https://imahgizi.okeadmin.com/Api/badutagizi';
export const URLKonseling = 'https://imahgizi.okeadmin.com/Api/konseling';
export const URLBantuansosial = 'https://imahgizi.okeadmin.com/Api/bantuansosial';
export const URLRujukan = 'https://imahgizi.okeadmin.com/Api/rujukan';
export  const MYAPP = 'Imah Gizi'; 