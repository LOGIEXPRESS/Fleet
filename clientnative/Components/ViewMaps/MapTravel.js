import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URLS } from "@env"

export default function MapTravel() {

  const data = useSelector((store) => store.responseLog)
  const travelCarrier=useSelector((store)=>store.carrierTravels)
  
  const navigation = useNavigation();


  const handelFinishTravel= async(e)=>{
    e.preventDefault()

    let finishTravel= await axios.post(`${ API_URLS }/api/finishTravel/${travelCarrier.payload[0].id}`)

    console.log('FNISH TRAVEL: ',finishTravel.data)

    navigation.push('ProfileCarrier')

  }
  console.log('VIAJES DEL CARRIER EN PROCESS: ',travelCarrier)




    return(
        <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Mapa finalizar Viaje</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handelFinishTravel}
    
        >
          <Text>Finalizar Viaje</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });

