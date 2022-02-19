import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image , TouchableOpacity} from "react-native";
// import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { cleanToken, statusOff } from "../../../Redux/actions";
// import StarRating from "../StarRating";
// import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/FontAwesome5"
import * as SecureStore from "expo-secure-store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../../Utils/HeaderBar";

const PersonalDataCarrier = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const rating = 4;

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    try{
    await SecureStore.setItemAsync(key, value);
    } catch(error){
      console.log('error', error.response)
    }
  }
  console.log("Esta es la data que llega al perfil data CArrier:", data)

  const cerrarsesion = () => {
    const id = {
      id: data.id
    }
    console.log("cerrar sesion");
    save("token", "(result)");
    dispatch(cleanToken());
    // dispatch(statusOff(id));//MANEJAR STATUS
    navigation.navigate('Login');
  }

  // useEffect(() => {
  //   //console.log("data", data)
  // }, [data]);
  

  return (
    <View style={styles.container}>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    >
      <View showsVerticalScrollIndicator={false} >
        <View style={{ marginTop: hp("1%"), marginBottom: hp("-3%"), marginLeft: wp('-4%')}}>
          <HeaderBar screen={'null'} />
        </View>
        <View>
          <Text style={styles.perfilTex}>Datos personales</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignContent: "flex-start",
            marginLeft: wp('5%'),
          }}
        >
          <View style={{ marginTop: wp('5%'), marginLeft: wp('3%')}}>
            <Image
              source={{
                uri:
                  data?.photo === null || data?.photo === "url"
                    ? "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg"
                    : data?.photo,
              }}
              style={styles.userImg}
            />
          </View>
          <View style={styles.boxDatos} >
            <Text style={styles.userName}>

              {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)} {data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1)}
            </Text>
            <Text style={{ fontSize: hp('2.3%') }}>
              {data?.eMail}

            </Text>
            <Text style={{ fontSize: hp('2.3%'), marginTop: hp('0.3%') }}>
              {/* Buenos Aires */}
              {data.locacion}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, marginBottom: wp("60%"), padding: wp("5.5%"), }}>
          <TouchableOpacity

            style={styles.btnText}
            onPress={() => navigation.navigate("EditProfileCarrier")}
          >
            <View style={{flexDirection:'row', alignContent:'center',alignItems:'center',justifyContent:'center'}}>
              <Icon4 name="user-edit" style={styles.icons} />
              <Text style={styles.textBtn}>Editar perfil</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("EditVehicule")}
          >
            <View style={{flexDirection:'row', alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <Icon3 name="truck" style={styles.icons} />
            <Text style={styles.textBtn}>Editar Vehículo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("ScreenAccessToken")}
          >
            <View style={{flexDirection:'row', alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <Icon2 name="payments" style={styles.icons} />
            <Text style={styles.textBtn}>Preferencia de pago</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <View style={{flexDirection:'row', alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <Icon name="key" style={styles.icons} />
            <Text style={styles.textBtn}>Cambiar contraseña</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText} onPress={cerrarsesion}>
          <View style={{flexDirection:'row', alignContent:'center',alignItems:'center',justifyContent:'center'}}>
          <Icon name="log-out" style={styles.icons} />
            <Text style={styles.textBtn}>Cerrar sesión</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  icons: {
    alignContent: "center",
    fontSize: hp("3.5%"),
    color: "#ff1c49",
    padding: wp("1.30%"),
    // marginRight: wp("4%"),
    // marginLeft: wp('1%'),
    backgroundColor: 'white',
    borderRadius: wp('7%'),
    width: wp('10%'),
    height: hp('5.2%'),
    // marginTop: wp('-1%')
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
  perfilTex: {
    alignSelf: 'center',
    fontSize: hp("4.8%"),
    fontWeight: "bold",
    marginTop: hp("3%"),
  },
  userImg: {
    marginTop: 12,
    marginStart: wp("-5%"),
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#ff1c49",
  },
  userName: {
    fontSize: hp('3.75%'),
    fontWeight: "bold",
    marginBottom: hp('0.5%'),
  },
  boxDatos: {
    flexDirection: "column",
    marginTop: 45,
    marginLeft: 10,

  },
  estrellitas: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
  },
  botones: {
    alignContent: "center",
    alignItems: "center",
    marginTop: wp('10%')
  },
  btn: {
    borderWidth: 4,
    backgroundColor: "#fff",
    borderColor: "#ff1c49",
    width: wp("82%"),
    height: hp("8%"),
    marginBottom: wp('8%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    shadowOpacity: 80,
    elevation: 13,

  },
  textBtn: {
    textAlign: "center",
    // marginTop: 5,
    fontSize: hp('2.9%'),
    fontWeight: "bold",
    marginLeft:hp('4%')
  },
});
