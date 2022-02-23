import { View, Text , Image , StyleSheet} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function Header () {
  return (
    
    <View style={styles.container}>
      <Text style={styles.personalData}>Datos personales</Text>

      <Image
        style={styles.logo}
        source={require("../../assets/icon2-removebg-preview.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        color:"white"
    },
    personalData:{
        fontSize: 18,
        textAlignVertical: "center",
        paddingRight: 70,
        color:"white"
    },
    logo:{
        width: 60, 
        height: 50,
        backgroundColor:"transparent",
        
    }
})