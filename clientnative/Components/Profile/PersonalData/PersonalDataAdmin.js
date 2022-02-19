import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
// import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
// import StarRating from "../StarRating";
// import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import { cleanToken } from "../../../Redux/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../../Utils/HeaderBar";
import * as SecureStore from "expo-secure-store";

const PersonalDataAdmin = () => {
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    await SecureStore.setItemAsync(key, value);
  }
  
  const cerrarsesion = () =>{
    console.log("cerrar sesion")
    dispatch(cleanToken())
    save("token", "(result)")
    
    navigation.navigate('Login')
  }

  // useEffect(() => {
  //   //console.log("data", data)
  // }, [data]);

  return (
    <View style={styles.container}>
      <View showsVerticalScrollIndicator={false}>
        <View style={{marginTop:hp("-10%"),}}>
      <HeaderBar  screen={'null'} />
      </View>
      <View>
        
      {/* <HeaderBar  screen={'null'}/> */}
        <Text style={styles.perfilTex}>Datos personales</Text>
      </View>
        
        <View    
          // style={{
          //   flexDirection: "column",
          //   alignContent: "center",
          //   // marginLeft: wp('5%'),
          //}}
        >
          <View style={styles.containerImg} >
            <Image
            // resizeMode="contain"
              source={{
                uri:
                  data?.photo === null || data?.photo === "url"
                    // ? "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg"
                    ? "https://www.radiotruck.sk/wp-content/uploads/2021/05/cropped-logo-radio-truckmale-1.png" 
                    : data?.photo
                    
                    
              }}
              style={styles.userImg}
            />
          </View>
          <View style={styles.boxDatos} >
            <Text style={styles.userName}>
              {/* Matias Vila */}
              {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)} {data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1)}
            </Text>
            <Text style={styles.userName2}>
            {/* Administrador de RadioTruck */}
            Administrador de {data?.business.charAt(0).toUpperCase() + data?.business.slice(1)} 
            
          </Text>
          </View>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("EditProfileCarrier")}
          >
            <Text style={styles.textBtn}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.textBtn}>Cambiar contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={cerrarsesion}>
            <Text style={styles.textBtn}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PersonalDataAdmin;

const styles = StyleSheet.create({
  containerImg: {
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    marginLeft: wp ("22%"),
    marginTop: 8,
    borderColor: "#E1E8EB",
    borderWidth: 1,
    //Properties to setup your Shadow

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#E1E8EB",
    shadowOpacity: 80,
    elevation: 15,
    backgroundColor: "#E1E8EB",
  },
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
   },
  perfilTex: {
    // marginTop:hp("2%"),
    alignSelf:'center',
    fontSize: hp("4.8%"),
    fontWeight: "bold",
    textDecorationColor: "#ff1c49",
    marginBottom:hp("2%"),
  },
  userImg: {
    height: '100%',
    width: '100%',
    // borderRadius: wp('3%'),
    // borderWidth: wp('0.9%'),
    // borderColor: "black",
  },
  userName: {
    fontSize: hp('3.5%'),
    // fontWeight: "bold",
    alignSelf:'center',
  },
  boxDatos: {
    // flexDirection: "column",
    
    marginTop: hp("1%"),
    
  },
  estrellitas: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
  },
  botones: {
    alignContent: "center",
    alignItems: "center",
   marginTop : wp('8%')
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#ff1c49",
    width: wp("88%"),
    height: hp("8%"),
    padding: wp('2.5%'),
    borderRadius: wp('3%'),
    marginTop: wp("7%"),
    shadowOpacity: 80,
    elevation: 15,
    // borderColor: "black",
    // borderWidth: hp("0.5%"),
  },
  textBtn: {
    marginTop: wp('1%'),
    color: "white",
    justifyContent:"center",
    textAlign: "center",
    fontSize: hp('3%'),
    marginTop: wp('0.9%'),
    fontWeight: '600'
  },
  
  userName2: {
    fontSize: hp("2.24%"),
    alignSelf:'center',
    // marginTop: 7,
    // marginBottom: wp("3%"),
    color: "#ff1c49"
  },
});
