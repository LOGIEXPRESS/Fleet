import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
// import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
// import StarRating from "../StarRating";
// import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../../Utils/HeaderBar";
const PersonalDataCarrier = () => {
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const rating = 4;

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    await SecureStore.setItemAsync(key, value);
  }

  const cerrarsesion = () =>{
    save("token", "(result)")
    navigation.navigate('Login')
  }

  // useEffect(() => {
  //   //console.log("data", data)
  // }, [data]);

  return (
    <View style={styles.container}>
      <View showsVerticalScrollIndicator={false}>
      <View style={{marginTop:hp("-1%"),marginLeft:wp("-5%"),marginBottom:hp("-3%")}}>
      <HeaderBar  screen={'null'} />
      </View>
      <View>
      {/* <HeaderBar  screen={'null'}/> */}
        <Text style={styles.perfilTex}>Datos personales</Text>
      </View>
        
        <View    
          style={{
            flexDirection: "row",
            alignContent: "flex-start",
            marginLeft: wp('5%'),
          }}
        >
          <View style={{ marginTop: wp('5%') }}>
            <Image
              source={{
                uri:
                  // data.photo !== null
                  //   ? data.photo
                  //   : 
                    "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
              }}
              style={styles.userImg}
            />
          </View>
          <View style={styles.boxDatos} >
            <Text style={styles.userName}>
              Matias Vila
              {/* {data.name} {data.lastname} */}
            </Text>
            <Text style={{ fontSize: hp('2.75%') }}>
              {/* {data.eMail} */}
              asd@.com
              </Text>
            <Text style={{ fontSize: hp('2.75%') }}>
              Buenos Aires
              {/* {data.location} */}
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
            onPress={() => navigation.navigate("EditVehicule")}
          >
            <Text style={styles.textBtn}>Editar Vehículo</Text>
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

export default PersonalDataCarrier;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
   },
  perfilTex: {
    alignSelf:'center',
    fontSize: hp("5.8%"),
    fontWeight: "bold",
    marginTop: 12,
  },
  userImg: {
    marginTop: 12,
    marginStart:wp("-5%"),
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#ff1c49",
  },
  userName: {
    fontSize: hp('3.75%'),
    fontWeight: "bold",
    marginBottom: 1,
  },
  boxDatos: {
    flexDirection: "column",
    marginTop: 40,
    marginLeft: 20,
    
  },
  estrellitas: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
  },
  botones: {
    alignContent: "center",
    alignItems: "center",
   marginTop : wp('15%')
  },
  btn: {
    borderWidth: 4,
    backgroundColor: "#fff",
    borderColor: "#ff1c49",
    width: wp("88%"),
    height: hp("8%"),
    marginBottom: wp('10%'),
    borderRadius: wp('3%'),
    justifyContent:'center',
    shadowOpacity: 80,
    elevation: 13,
    
  },
  textBtn: {
    textAlign: "center",
    // marginTop: 5,
    fontSize: hp('3.25%'),
    fontWeight: "bold",
  },
});
