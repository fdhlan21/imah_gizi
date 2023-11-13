import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import colors from '../../utils/colors/'

const loading = () => {
  return (
    <View style={styles.wrapper}>
    <ActivityIndicator size='large' color={colors.white}/>
      <Text style={styles.text}>loading...</Text>
    </View>
  )
}

export default loading

const styles = StyleSheet.create({

    wrapper: {
        flex:1,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.loadingBackground,
        width:'100%',
        height:'100%',
    },

    text: {

        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color:colors.primary
    }
        

    

})