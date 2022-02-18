import { View, Text , StyleSheet , Image , TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import { capitalize } from "lodash";
import { Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";






export default function CardTravel(props) {

  const navigation = useNavigation()

  const{travel , info} = props
  console.log("Esto es Travel:", travel)
  console.log("Esto es Info:", info)
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <View style={styles.spacing}>
             <Text style={styles.number}>{info}</Text>
          <View style={styles.container}>
            <Text style={styles.name}>
              Origen: {travel.orig.split("/")[2]}
            </Text>
            <View style={{height:hp("0.1%"), backgroundColor:"grey", width:wp("70%")}}></View>
            <Text style={styles.name}>
            Destino: {travel.destination.split("/")[2]}
            </Text>
            <View style={{height:hp("0.1%"), backgroundColor:"grey", width:wp("70%")}}></View>
            <Text style={styles.name}>
              Carga: {capitalize(travel.description)}
            </Text>
            <View style={{height:hp("0.1%"), backgroundColor:"grey", width:wp("70%")}}></View>
            <Text style={styles.name}>
              Peso: {capitalize(travel.weight)} Toneladas
            </Text>
            <View style={{height:hp("0.1%"), backgroundColor:"grey", width:wp("70%")}}></View>
            <View style={{display:"flex", flexDirection:"row", marginTop:hp("3%")}}>
      {   travel.finishedTravel === 'process' ?   <TouchableOpacity 
            onPress={() => navigation.navigate('TravelOn', travel) }
            >
              <Text style={styles.btn}>
                Ver Viaje Actual
              </Text>
            </TouchableOpacity> : <Text> Viaje Finalizado</Text> }
            <Text style={{alignSelf:"center", fontSize:hp("2.8%"), color:"white", marginLeft:wp("4%"), fontWeight:"bold"}}>
              Total: ${capitalize(travel.price)}
            </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: hp('2%'),
    backgroundColor: "#1B4353",
    flex: 1,
    height: hp('28%'),
    borderRadius: wp('3.3%'),
    elevation:20,
    shadowOpacity:80,
    shadowColor:"black",
  
  },
  spacing: {
    flex: 1,
    padding: wp('4%'),
  },
 /*  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  }, */
  /* image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  }, */
  name: {
    color: "#E6E1C5",
    fontWeight: "400",
    fontSize: wp('3.3%'),
    paddingTop: hp('0.8%')
  },
  number: {
    position: "absolute",
    right: hp('1.5%'),
    top: hp('0.7%'),
    color: "#fff",
    fontSize: hp('2.1%'),
    fontWeight:"bold",
    color:"#E1E2EF",

    

    
  },
  container: {
      marginTop: hp('3%')
  }, 
  btn: {
    backgroundColor:"#0d1317",
    // marginTop:hp("1.2%"),
    paddingTop:hp("0.8%"),
    color: 'white',
    borderWidth:1,
    width:wp("35%"),
    borderColor:"#E6E1C5",
    borderRadius:wp("1%"),
    paddingLeft:wp("2%"),
    fontSize:hp("2.3%"),
    marginLeft:wp("-2%"),
    height:hp("4.5%"),
    // fontWeight:"bold"
  
    // borderRadius:10,
    
  },
});
