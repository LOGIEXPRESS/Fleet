import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
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

  const { travel, info } = props
  console.log("Esto es Travel:", travel)
  console.log("Esto es Info:", info)
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bannertop}>
            <Text style={styles.number}>{info}</Text>
            <View style={{ display: "flex", flexDirection: "row", marginTop: hp("1%") }}>
              {travel.finishedTravel === 'process' ?
                <TouchableOpacity
                  onPress={() => navigation.navigate('TravelOn', travel)}
                  style={styles.btn}
                >
                  <Text style={styles.txt}>
                    Ver Viaje Actual
                  </Text>
                </TouchableOpacity> : <Text></Text>}
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.name}>
              Origen: {travel.orig.split("/")[2]}
            </Text>
            <View style={{ height: hp("0.1%"), backgroundColor: "grey", width: wp("70%") }}></View>
            <Text style={styles.name}>
              Destino: {travel.destination.split("/")[2]}
            </Text>
            <View style={{ height: hp("0.1%"), backgroundColor: "grey", width: wp("70%") }}></View>
            <Text style={styles.name}>
              Carga: {capitalize(travel.description)}
            </Text>
            <View style={{ height: hp("0.1%"), backgroundColor: "grey", width: wp("70%") }}></View>
            <Text style={styles.name}>
              Peso: {capitalize(travel.weight)} Toneladas
            </Text>
            <View style={{ height: hp("0.1%"), backgroundColor: "grey", width: wp("70%") }}></View>
            <Text style={styles.name}>
              Total: ${capitalize(travel.price)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bannertop:{
    flexDirection: 'row',
    backgroundColor: '#E6E1C5',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: hp('5%'),
    width: wp('75%'),
    right: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  card: {
    marginTop: hp('2%'),
    backgroundColor: "#1B4353",
    flex: 1,
    height: hp('28%'),
    borderRadius: wp('3.3%'),
    elevation: 20,
    shadowOpacity: 80,
    shadowColor: "black",

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
    fontSize: wp('3%'),
    paddingTop: hp('0.8%')
  },
  number: {
    position: "absolute",
    top: hp('1%'),
    color: "#000",
    fontSize: hp('2%'),
    fontWeight: "bold",
    left: hp('1%')
  },
  container: {
    marginTop: hp('1%')
  },
  btn: {
    backgroundColor: "#0d1317",
    // marginTop:hp("20%"),
    // paddingTop: hp("0.2%"),
    color: 'white',
    borderWidth: hp('0.1%'),
    width: wp("26"),
    borderColor: "#E6E1C5",
    borderRadius: wp("1%"),
    paddingLeft: wp("2%"),
    fontSize: hp("2.3%"),
    marginLeft: wp("45%"),
    height: hp("3%"),
    // fontWeight:"bold"

    // borderRadius:10,

  },
  txt: {
    color: '#fff',
    fontSize: wp('2.8'),
    marginTop:hp("0.3%"),
    marginStart:wp("1%")
  },
});
