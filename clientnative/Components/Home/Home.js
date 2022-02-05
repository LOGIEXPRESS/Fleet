import React, { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
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
} from "react-native";
import { logiarUsuario, enviarToken, consultReg } from "./../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/core";
import { Image } from "react-native-elements/dist/image/Image";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const resptoken = useSelector((store) => store.respToken);
  const adminreg = useSelector((store) => store.adminreg);
  console.log("llega adminreg", adminreg)
  console.log("llega respotoken", resptoken)
  useEffect(() => {
    getValueFor();
    dispatch(consultReg())
  }, []);



  async function getValueFor() {
    // SE CONSULTA EL VALUE DEL STORE, CON EL KEY
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      console.log("se activa el guardartoken?", result)
      onChangeResult(result);
     // console.log(result);
    } else {
      //   alert('Invalid Key')
    }
  }

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    try{
    await SecureStore.setItemAsync(key, value);
    } catch(error){
      console.log('error', error.response)
    }
  }
  
  //TOKEN
  const [result, onChangeResult] = useState("(result)");
  // getValueFor(); // PRIMERO CORROBORAMOS SI HAY UN TOKEN GUARDADO

  console.log("result",result)
  useEffect(() => {
    if (result != "(result)") {
      console.log("resultttt", result)
      // SI YA SE LOGIO ANTERIORMENTE
      const obj2 = {
        token: result,
      };

      //console.log("este es el result", obj2);
      
      dispatch(enviarToken(obj2));
    }
  }, [result]);

  useEffect(() => {
    // console.log("respotoken:", resptoken);
    // console.log("resptoken.mensaje", resptoken.mensaje);
    if(adminreg != null){
    console.log("hace 2 console.log?", resptoken,adminreg)
    if(resptoken === null && adminreg === false){
      navigation.navigate("SingUp");
    }if(resptoken === null && adminreg === true){
      navigation.navigate("Login");
    }

  }
  }, [adminreg]);

  useEffect(() => {
    // console.log("respotoken:", resptoken);
    // console.log("resptoken.mensaje", resptoken.mensaje);
    
    if(adminreg !== false){
    if (resptoken !== null) {
      console.log("holaaa",resptoken)
      if (resptoken.mensaje === true) {
        console.log("resptoken", resptoken.role)
        if (resptoken.role === true) {
          console.log("llega aca?")
          navigation.navigate("ProfileAdmin");
        } if(resptoken.role === false) {
          navigation.navigate("ProfileCarrier");
        }
       }else {
        console.log("entra acaaaa")
        save("token", "(result)");
        navigation.navigate("Login");
      }
    }
  }
  
  }, [resptoken]);









  return (
    //Container Start
    <View
      style={{ flex: 1, backgroundColor: "#ffffffff" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand View */}
      <Image
      resizeMode="contain"
        source={require("./logo.png")}
      >
      </Image>
    </View>
    // Container End
  );
};

export default Home;


