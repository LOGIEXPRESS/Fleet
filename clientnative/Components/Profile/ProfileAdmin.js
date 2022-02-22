import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
// import { requestPermisse, deletePermisse } from "./../actions/index";
import { useSelector, useDispatch } from "react-redux";
import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as SecureStore from "expo-secure-store";

const ProfileAdmin = () => {
  // const login = useSelector((store) => store.login);
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const respPermisse = useSelector((store) => store.respPermisse);

  useEffect(() => {
    async function getValueFor() {
      // SE CONSULTA EL VALUE DEL STORE, CON EL KEY
      let result = await SecureStore.getItemAsync("token");

      console.log("TOKEN EN SECURE STORE ", result);
    }
    // console.log("ESTE ES  LOGIN",data);
    getValueFor();
  }, []);

  // useEffect(() => {
  //   if (respPermisse === "user sin travel") {
  //     // console.log("AQUI ESTA LA RESPUESTA DEL HANDLeeEEEEEEEEEEE", respPermisse)
  //     navigation.navigate("RequestTravel", data?.idRole);
  //   }
  //   if (respPermisse?.menssage === "user travel") {
  //     // console.log("llege aca", respPermisse.payload[0].id)
  //     navigation.navigate("ScreenWaiting", respPermisse.payload[0].id);
  //   }
  //   return () => {
  //     dispatch(deletePermisse());
  //   };
  // }, [data, respPermisse]);

  //console.log("AQUI ESTA LA RESPUESTA DEL HANDLE", respPermisse);
  // console.log("AQUI RESPTOKEN en PROFILEUSERScreen", resptoken);

  const handleRequest = (props) => {
    console.log(props);
    dispatch(requestPermisse(props));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View style={{marginTop:hp("-2%"),marginLeft:wp("0%"),marginBottom:hp("-4%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View> */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.containerImg}>
            <Image
              // resizeMode="contain"
              source={{
                uri:
                  data?.photo === null || data?.photo === "url"
                    ? "https://www.radiotruck.sk/wp-content/uploads/2021/05/cropped-logo-radio-truckmale-1.png"
                    : data?.photo,
              }}
              style={styles.userImg}
            />
          </View>
          <Text style={styles.userName}>
            {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}{" "}
            {data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1)}
          </Text>
          <Text style={styles.userName2}>
            {/* Administrador de RadioTruck */}
            Administrador de{" "}
            {data?.business.charAt(0).toUpperCase() + data?.business.slice(1)}
          </Text>
        </View>

        <View style={{ padding: wp("5.5%") }}>
          {/* BOTÓN DE DATOS PERSONALES */}
          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("PersonalDataAdmin");
            }}
          >
            <Icon name="person" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Datos Personales</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons3} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("ViewFleet");
            }}
          >
            <Icon name="bus" style={styles.icons} />
            <Text style={styles.userBtnTxt4}>Mi Flota</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons3} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("QuotTravel")}
          >
            <Icon name="calculator" style={styles.icons} />
            <Text style={styles.userBtnTxt3}>Cotizar viaje</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons4} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn2}
            // onPress={() => handleRequest(data?.idRole)}
            onPress={() => navigation.navigate("AddTravel", data)}
          >
            {/* <Image
              style={{ width: wp('12%'), height: hp('6%'), marginTop: wp('-2%')}}
              source={
                {uri: "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg"}
              }
            /> */}
            <Text style={styles.userBtnTxt2}>Agregar Viaje</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

export default ProfileAdmin;

const styles = StyleSheet.create({
  containerImg: {
    marginTop: wp("12%"),
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    marginTop: 80,
    borderColor: "#E1E8EB",
    borderWidth: 1,
    //Properties to setup your Shadow

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#000",
    shadowOpacity: 5,
    elevation: 10,
    backgroundColor: "#000",
  },
  icons: {
    alignContent: "center",
    fontSize: hp("3.5%"),
    color: "#ff1c49",
    padding: wp("1.30%"),
    marginRight: wp("4%"),
    marginLeft: wp("1%"),
    backgroundColor: "white",
    borderRadius: wp("7%"),
    width: wp("10%"),
    height: hp("5.2%"),
    marginTop: wp("-1%"),
  },
  icons3: {
    fontSize: hp("2.70%"),
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: wp("1%"),
    marginLeft: wp("22%"),
  },
  icons4: {
    fontSize: hp("2.70%"),
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: wp("1%"),
    marginLeft: wp("33.5%"),
  },
  perfilTex: {
    fontSize: hp("2.6%"),
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  btnText: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: wp("88%"),
    height: hp("8%"),
    padding: wp("2.5%"),
    borderRadius: wp("3%"),
    shadowOpacity: 5,
    elevation: 2,
    marginTop: wp("7%"),
    borderColor: "#E1E8EB",
    borderWidth: 1.75,
  },
  btn2: {
    alignContent: "center",
    alignSelf: "center",
    // flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ff1c49",
    width: wp("88%"),
    height: hp("8.5%"),
    padding: wp("5%"),
    borderRadius: wp("4%"),
    shadowOpacity: 5,
    elevation: 2,
    marginTop: wp("7.5%"),
  },
  userImg: {
    // height: hp('30%'),
    // width: wp('100%'),
    // borderRadius: wp('40%'),
    // borderWidth: wp('0.6%'),
    // borderColor: "black",
    // marginTop: wp('-8%'),
    height: "100%",
    width: "100%",
    // borderRadius: wp('40%'),
    // borderWidth: wp('0.5%'),
    // borderColor: "#ff1c49",
  },
  userName: {
    fontSize: 26,
    // fontWeight: "bold",
    marginTop: hp("1%"),
    // marginBottom: wp("3%"),
  },
  userName2: {
    fontSize: hp("2.24%"),

    // marginTop: 7,
    // marginBottom: wp("3%"),
    color: "#ff1c49",
  },
  userBtnTxt: {
    marginTop: wp("1%"),
    color: "black",
    textAlign: "center",
    fontSize: hp("2.8%"),
    marginLeft: wp("7.3%"),
    marginTop: wp("0.9%"),
    fontWeight: "600",
  },
  userBtnTxt4: {
    marginTop: wp("1%"),
    color: "black",
    textAlign: "center",
    fontSize: hp("2.8%"),
    marginLeft: wp("14.3%"),
    marginTop: wp("0.9%"),
    fontWeight: "600",
  },
  userBtnTxt2: {
    color: "white",
    textAlign: "center",
    fontSize: hp("3.5%"),
    height: hp("9.5%"),
    fontWeight: "600",
    paddingVertical: hp("2%"),
  },
  userBtnTxt3: {
    marginTop: wp("1%"),
    color: "black",
    textAlign: "center",
    fontSize: hp("2.8%"),
    marginLeft: wp("11.5%"),
    marginTop: wp("0.9%"),
    fontWeight: "600",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
