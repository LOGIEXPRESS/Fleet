import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
// import { logiarUsuario } from "./../actions/index";
import { useSelector } from "react-redux";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../Utils/HeaderBar";

const ProfileCarrier = () => {
  // const resptoken = useSelector((store) => store.respToken);
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();

  console.log("AQUI RESPONLOG EN PROFILEUSERScreen", data);
  // console.log("AQUI RESPTOKEN en PROFILEUSERScreen", resptoken);

  useEffect(() => {
    console.log("data", data);

  }, [data]);

  return (
    <View style={{ flex: 1,  backgroundColor: 'white'  }}>
      {/* <View style={{marginTop:hp("-2%"),marginLeft:wp("0%"),marginBottom:hp("-4%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
           <View style={{ marginTop: wp("12%")  }}>
            
            <Image
              source={{
                uri:
                  data?.photo === null || data?.photo === "url"
                    ? "https://girbaud.vteximg.com.br/arquivos/ids/190690-500-500/Gorra-Para-Hombre-Marithe-Francois-Girbaud1217.jpg?v=637732022965400000"
                    : data?.photo
                    
              }}
              style={styles.userImg}
            />
          </View>
          
          <Text style={styles.userName}>
            {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)} {data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1)}
            {/* {data.name} {data.lastName} */}
          </Text>
          <Text style={styles.empresaName}>
           {/* Transportista en RadioTruck       */}
           Transportista en {data?.business} 
          </Text>
          <Text style={styles.saldo}>
            Saldo:      $ 200.0000
            
          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: wp("60%"), padding: wp("5.5%"),  }}>
          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("PersonalDataCarrier")}
            // }}
          >
            <Icon name="person-circle-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Datos Personales</Text>
              {/* <Icon name="chevron-forward-outline" style={styles.icons3} /> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText}
          // onPress={() => {
          //   navigation.navigate("HistorialDeViajeCarrier");
          // }}
          >
            <Icon name="location-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Historial de viajes</Text>
              {/* <Icon name="chevron-forward-outline" style={styles.icons3} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("QuotTravel")}
          >
            <Icon name="calculator-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Cotizar viaje</Text>
            {/* <Icon name="chevron-forward-outline" style={styles.icons4} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn2}
            // onPress={() => navigation.navigate("ScreenMap")}
            onPress={() => navigation.navigate("CompleteProfileCarrier")}
          >
            <Text style={styles.userBtnTxt2}>Comenzar viaje</Text>
            {/* <Image
              style={{ width: wp('15%'), height: hp('6%'), marginLeft: wp('2%'), marginTop: wp('-2%') }}
              source={require("./Utils/camion.png")}
            /> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileCarrier;

const styles = StyleSheet.create({
  icons: {
    alignContent: "center",
    fontSize: hp("3.5%"),
    color: "#ff1c49",
    padding: wp("1.30%"),
    marginRight: wp("4%"),
    marginLeft: wp('1%'),
    backgroundColor: 'white',
    borderRadius: wp('7%'),
    width: wp('10%'),
    height: hp('5.2%'),
    marginTop: wp('-1%')
  },
  icons3: {
    fontSize: hp("2.70%"),
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: wp('1%'),
    marginLeft: wp('22%')
  },
  icons4: {
    fontSize: hp("2.70%"),
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: wp('1%'),
    marginLeft: wp('33.5%')
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
    height: hp("7%"),
    padding: wp('2.5%'),
    borderRadius: wp('3%'),
    shadowOpacity: 80,
    elevation: 16,
    marginTop: wp("7%"),
    borderColor: "#E1E8EB",
    borderWidth: 1.75,
  },
  btn2: {
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ff1c49",
    width: wp("88%"),
    height: hp("8.5%"),
    padding: wp('5%'),
    borderRadius: wp('4%'),
    shadowOpacity: 80,
    elevation: 15,
    marginTop: wp('7.5%'),
  },
  userImg: {
    marginTop: wp('-3%'),
    height: wp('50%'),
    width: wp('50%'),
    borderRadius: wp('40%'),
    borderWidth: wp('1.20%'),
    borderColor: "#ff1c49",
  },
  userName: {
    fontSize: 26,
    // fontWeight: "bold",
    // marginTop: 7,
    // marginBottom: wp("3%"),
    // color: "grey"
  },
  empresaName: {
    fontSize: 21,
    // fontWeight: "bold",
    // marginTop: hp("5%"),
    // marginBottom: hp("-7%"),
    color: "grey",
  },
  saldo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: hp("3%"),
    marginBottom: hp("-3%"),

  },
  userBtnTxt: {
    marginTop: wp('1%'),
    color: "black",
    textAlign: "center",
    fontSize: hp('2.5%'),
    marginLeft: wp('5.9%'),
    marginTop: wp('0.9%'),
    fontWeight: '700'
  },
  userBtnTxt2: {
    color: "white",
    textAlign: "center",
    fontSize: hp('3.5%'),
    height: hp('12%'),
   marginVertical:hp('-1%'),
    fontWeight: "bold",
  },
  userBtnTxt3: {
    marginTop: wp('1%'),
    color: "black",
    textAlign: "center",
    fontSize: hp('2.5%'),
    marginLeft: wp('11.5%'),
    marginTop: wp('0.9%'),
    fontWeight: '700'
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
