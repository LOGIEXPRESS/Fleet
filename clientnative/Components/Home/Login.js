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



const Login = () => {
  const [log, setLog] = useState({
    mail: "",
    contraseña: "",
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector((store) => store.responseLog);
  const lastNameRef = useRef();

  
  useEffect(() => {
    console.log("se activa el login?",login)
    if (login?.business !== undefined) {
      console.log("que tiene loginbusiness", login?.business)
      console.log(login,"login")
      if(login.role === true){
        navigation.navigate("ProfileAdmin");
      }if(login.role===false){
        console.log(login,"login")
        if (login.identification === null) {
          navigation.navigate("CompleteProfileCarrier", { login });
        } else {
          navigation.navigate("ProfileCarrier", { login });
        }
        // navigation.navigate("ProfileCarrier");
      }
      if(login.role===1){
        Alert.alert('Debe ingresar datos')
        navigation.navigate('Login')
      }
      
    
    }
  }, [login]);

   useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])


  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    try{
      await SecureStore.setItemAsync(key, value);
    } catch(error){
      console.log('error', error.response)
    }
    }  
  const nuevotoken = useSelector((store) => store.token);
  useEffect(() => {
    if(nuevotoken !== ""){
    console.log("verificando, que se envia", nuevotoken); 
    save("token", nuevotoken);
    console.log("se guarda el token?", nuevotoken)
    }
  }, [nuevotoken]);

  const disabledSummit = useMemo(() => {
    if (
      log.contraseña < 0 && log.mail<0
    ) {
      return true;
    } else {
      return false;
    }
  }, [log])
  

  const navegar = () =>{
    navigation.navigate("RecoverPassword")
  }
    
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
      
  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    const obj = {
      eMail: log.mail.trim(),
      password: log.contraseña,
    };

    //Validaciones:

    // if (!obj.eMail.includes(".com") || !obj.eMail.includes("@")) {
    //   changeModalVisible5(true)
    //   return;
    // }
    // if (!obj.password) {
    //   changeModalVisible6(true)
    //   return;
    // }

    dispatch(logiar(obj));
    console.log("Estoy enviado", obj);
    setLog({
      mail: "",
      contraseña: "",
    });

    //cuando se cumpla que respuesta != null
    //haga un console.log(respuesta)

  
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
            placeholder="Dirección de Mail*"
            style={styles.TextInput}
            
            autoFocus={true}

            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
            blurOnSubmit={false}
            
          ></TextInput>
          <TextInput
            value={log.contraseña}
            onChangeText={(name) => handelChangePass(name)}
            name="contraseña"
            placeholder="Contraseña*"
            secureTextEntry={true}
            style={styles.TextInput}
            ref={lastNameRef} onSubmitEditing={() => {
              return console.log('done')
          }}
           
          
          ></TextInput>
          <TouchableOpacity style={styles.Button} disabled={disabledSummit}>
            <Text style={styles.ButtonText} onPress={handleSubmit}>
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.preg}>
          <Text style={styles.pregunta}>Olvidaste tu contraseña? </Text>
        </View>

        <TouchableOpacity style={styles.TextButton}  onPress={navegar}>
          <Text style={styles.SingUpText}>Recuperarla Ahora</Text>
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
