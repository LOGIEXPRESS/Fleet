import React, { useState, useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
  Modal
} from "react-native";

const Login = ({ navigation }) => {

    const [log, setLog] = useState({
        mail: "",
        contraseña: "",
      });
    
      const handelChangeMail = (email) => {
        setLog({
          ...log,
          mail: email,
        });
      };
      const handelChangePass = (pass) => {
        setLog({
          ...log,
          contraseña: pass,
        });
      };


return (
    //Container Start
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffffff" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand View */}
      <ImageBackground
        source={require("./logo.png")}
        resizeMode= "contain"
        style={{
            display:'flex',
            marginTop:  hp('-13%'),
          height: hp('60%') ,
          width: wp('110%') ,
          alignSelf: "center",
        }}
      >
      </ImageBackground>
      {/* Botton View */}
      <View style={styles.bottonView}>
        {/* Welcome View */}
        <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
          <Text style={{ color: "#151f27", fontSize: 34,fontWeight: '600', }}>Bienvenido</Text>
        </View>
        {/* inputs */}
        <View
          style={styles.FormView}
          // onChange={(e) => ChangeInput(e)}
        //   onSubmit={(e) => handleSubmit(e)}
        >
          <TextInput
            value={log.mail}
            onChangeText={(name) => handelChangeMail(name)}
            name="mail"
            placeholder="Dirección de Mail / Teléfono*"
            style={styles.TextInput}
          ></TextInput>
          <TextInput
            value={log.contraseña}
            onChangeText={(name) => handelChangePass(name)}
            name="contraseña"
            placeholder="Contraseña*"
            secureTextEntry={true}
            style={styles.TextInput}
          ></TextInput>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText} >
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.preg}>
          <Text style={styles.pregunta}>No tienes una cuenta? </Text>
        </View>

        <TouchableOpacity style={styles.TextButton} >
          <Text style={styles.SingUpText}>Registrate Ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // Container End
  );
};

export default Login;

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
