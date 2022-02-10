import React, { useState, useEffect, useRef,useMemo } from "react";


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
  BackHandler
} from "react-native";
import { logiar } from "../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";



const Checkout = () => {
  const navigation = useNavigation();


  const checkout = () => {
    navigation.navigate("MercadoPago")
  }


  

return (
  //Container Start

    <TouchableOpacity style={styles.Button} onPress={checkout}>
      <Text style={styles.ButtonText} >
        Checkout
      </Text>
    </TouchableOpacity>

);
};

export default Checkout;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandViewText: {
    color: "#FFC107",
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",
    // justifyContent:'flex-start'
  },
  bottonView: {
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -10,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ff1c49",
    height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "#161a23",
  },
  Button: {
    width: "90%",
    color: "#FFC107",
    height: 52,
    backgroundColor: "#ff1c49",
    borderRadius: 10,
    borderColor: "black",
    // borderWidth:1,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 80,
    elevation: 15,
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  SingUpText: {
    color: "#151f27",
    fontSize: 23,
  },
  TextButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  preg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pregunta: {
    color: "#ff1c49",
  },
});
