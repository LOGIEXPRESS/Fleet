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
  YellowBox,
  Modal
} from "react-native";
// import StarRating from "react-native-star-rating";
// import SimpleModalCarrier from './SimpleModalCarrier';
import { useNavigation } from "@react-navigation/core";
import io from 'socket.io-client'
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../Utils/HeaderBar";
import axios from "axios";
import SimpleModalCarrier from "../Alerts/Travel/SimpleModalCarrier";

import { API_URLS } from "@env"




const StartCarrier = (props) => {


// ACEPTAR VIAJE 




 
  / --> ESTADO PARA EL MODAL <-- ///
  const [isModalVisible300, setisModalVisible300] = useState(false);
  const [chooseData300, setchooseData300] = useState();

  const changeModalVisible300 = (bool) => {
    setisModalVisible300(bool);
  };

  const setData300 = (data) => {
    setchooseData300(data);
  };


  // const handleSubmit = () => {
  //   const respMessage = () =>{
  //     const aceparTravel={
  //       carrierId: response?.idRole,
  //       userId: data?.travel.userId
  //     }
  //     console.log("ESTO ENVIANDO ESTOOOOO", aceparTravel)
  //     socket.emit('response',aceparTravel);
  //   }
  //   respMessage()
  //   changeModalVisible(true)
  // }



  // socket
  const socket = useSelector((store) => store.socket)
  const response = useSelector((store) => store.responseLog)
  const dataCarrier = useSelector((store) => store.responseLog)

  const navigation = useNavigation();
  const data = props.route.params
  const orig = data.origen.split("/")
  const dest = data.destination.split("/")
  console.log('dataCarrier startCarrier: ',dataCarrier)
  console.log("Esto es lo que llega: ", data)
  // console.log("ESTE ES EL SOCKET", socket.id)



  const handleSubmit=async(e)=>{
    e.preventDefault()
    let payload={
      userId:dataCarrier.id,
      id:data.id
    }

    let upDateTravel= await axios.post(`${ API_URLS }/api/confirmTravel`,payload)
    console.log(upDateTravel.data)

      
    changeModalVisible300(true);




  }






  return (
    //Container Start

    <ScrollView
      style={{ backgroundColor: "#f3f3f3" }}
      showsVerticalScrollIndicator={false}
    >
         <View style={{marginBottom:hp("-6%"),marginTop:hp("-2%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View>
      <View style={{ flex: 1, marginBottom: 400 }}>
        {/* Brand View */}
        <View style={{ backgroundColor: "#ff1c49", marginTop: 50, height: 60 }}>
          <Text
            style={{
              color: "white",
              display: "flex",
              alignSelf: "center",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Comenzar Viaje
          </Text>
        </View>
        <ImageBackground
          source={require("./camion.gif")}
          style={{
            height: hp("25%"),
            width: wp("100%"),
            display: "flex",
            alignSelf: "center",
            // marginLeft: 40,
          }}
        ></ImageBackground>
        <View >

          <View>
            <View>
              <Text
                style={{
                  marginLeft: wp("2%"),
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "500",
                  alignSelf:"center"
                }}
              >
                Detalle del Envío
              </Text>
            </View>
            {/* ORIGEN */}
            <View
              style={{
                height: 35,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Desde: </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                {orig[2]}
              </Text>
            </View>
            {/* DESTINO */}
            <View
              style={{
                height: 35,
                marginTop: 3,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Hasta: </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>{dest[2]}</Text>
            </View>
            {/* PESO */}
            <View
              style={{
                height: 35,
                marginTop: 3,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Peso de la Carga:{" "}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>{data?.weight} Toneladas</Text>
            </View>
                   {/* DESCRIPCION */}
                   <View
              style={{
                height: 35,
                marginTop: 3,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Descripción:{" "}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>{data?.description}</Text>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              height: 40,
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", alignSelf: "center" }}
            >
              Monto Total:{" "}
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "300", alignSelf: "center" }}
            >
              $ {data?.price}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
              <Text style={styles.aceptar}>Aceptar</Text>
              {/* MODAL */}
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible300}
                nRequestClose={() => changeModalVisible300(false)}
              >
                <SimpleModalCarrier
                  changeModalVisible300={changeModalVisible300}
                  setData300={setData300}
                />
              </Modal>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('ScreenMap')}>
              <Text style={styles.rechazar}>Rechazar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StartCarrier;

const styles = StyleSheet.create({
  botones: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  aceptar: {
    alignSelf: "center",
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  rechazar: {
    alignSelf: "center",
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    height: "120%",
    width: "40%",
    backgroundColor: "#ff1c49",
    borderRadius: 10,
  }
});
