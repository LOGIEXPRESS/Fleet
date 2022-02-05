import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Modal,
  Button,
} from "react-native";
import HeaderBar from "../Utils/HeaderBar";
// import SimpleModal1 from "./AlertasReg/SimpleModalok.js";
// import SimpleModal2 from "./AlertasReg/SimpleModalok2.js";
// import SimpleModal3 from "./AlertasReg/SimpleModalname.js";
// import SimpleModal4 from "./AlertasReg/SimpleModalLastname.js";
// import SimpleModal5 from "./AlertasReg/SimpleModalmail.js";
// import SimpleModal6 from "./AlertasReg/SimpleModalpass.js";
// import SimpleModal7 from "./AlertasReg/SimpleModalphone.js";
// import SimpleModal8 from "./AlertasReg/SimpleModalterms.js";
// import SimpleModal9 from "./AlertasReg/SimpleModalrole.js";
// import SimpleModal40 from "./AlertasReg/SimpleModalsamemail.js";


import CheckBox from "expo-checkbox";

// import CheckBox from "@react-native-community/checkbox";
import { ModalPicker } from "./ModalPicker";
import { useDispatch, useSelector } from "react-redux";
import { adminregister } from "../../Redux/actions/index";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const respuesta = useSelector((store) => store.responseReg)



  // ALERTAS:

  //REGISTRO USUARIO OK
  // const [isModalVisible1, setisModalVisible1] = useState(false);
  // const [chooseData1, setchooseData1] = useState();

  // const changeModalVisible1 = (bool) => {
  //   setisModalVisible1(bool);
  // };

  // const setData1 = (data) => {
  //   setchooseData1(data);
  // };

  // // REGISTRO TRANSPORTISTA OK
  // const [isModalVisible2, setisModalVisible2] = useState(false);
  // const [chooseData2, setchooseData2] = useState();

  // const changeModalVisible2 = (bool) => {
  //   setisModalVisible2(bool);
  // };

  // const setData2 = (data) => {
  //   setchooseData2(data);
  // };


  // // NOMBRE MAL INGRESADO
  // const [isModalVisible3, setisModalVisible3] = useState(false);
  // const [chooseData3, setchooseData3] = useState();

  // const changeModalVisible3 = (bool) => {
  //   setisModalVisible3(bool);
  // };

  // const setData3 = (data) => {
  //   setchooseData3(data);
  // };

  // // APELLIDO MAL INGRESADO

  // const [isModalVisible4, setisModalVisible4] = useState(false);
  // const [chooseData4, setchooseData4] = useState();

  // const changeModalVisible4 = (bool) => {
  //   setisModalVisible4(bool);
  // };

  // const setData4 = (data) => {
  //   setchooseData4(data);
  // };

  // //MAIL MAL INGRESADO
  // const [isModalVisible5, setisModalVisible5] = useState(false);
  // const [chooseData5, setchooseData5] = useState();

  // const changeModalVisible5 = (bool) => {
  //   setisModalVisible5(bool);
  // };

  // const setData5 = (data) => {
  //   setchooseData5(data);
  // };

  // // CONTRASEÑA MAL INGRESADA

  // const [isModalVisible6, setisModalVisible6] = useState(false);
  // const [chooseData6, setchooseData6] = useState();

  // const changeModalVisible6 = (bool) => {
  //   setisModalVisible6(bool);
  // };

  // const setData6 = (data) => {
  //   setchooseData6(data);
  // };
  // // TELEFONO MAL INGRESADO

  // const [isModalVisible7, setisModalVisible7] = useState(false);
  // const [chooseData7, setchooseData7] = useState();

  // const changeModalVisible7 = (bool) => {
  //   setisModalVisible7(bool);
  // };

  // const setData7 = (data) => {
  //   setchooseData7(data);
  // };
  // // NO ACEPTA TERMINOS
  // const [isModalVisible8, setisModalVisible8] = useState(false);
  // const [chooseData8, setchooseData8] = useState();

  // const changeModalVisible8 = (bool) => {
  //   setisModalVisible8(bool);
  // };

  // const setData8 = (data) => {
  //   setchooseData8(data);
  // };

  // // NO ELIJE ROL
  // const [isModalVisible9, setisModalVisible9] = useState(false);
  // const [chooseData9, setchooseData9] = useState();

  // const changeModalVisible9 = (bool) => {
  //   setisModalVisible9(bool);
  // };

  // const setData9 = (data) => {
  //   setchooseData9(data);
  // };

  // // MAIL REPETIDO
  // const [isModalVisible40, setisModalVisible40] = useState(false);
  // const [chooseData40, setchooseData40] = useState();

  // const changeModalVisible40 = (bool) => {
  //   setisModalVisible40(bool);
  // };

  // const setData40 = (data) => {
  //   setchooseData40(data);
  // };

  


  // useEffect(()=>{
  //   //console.log('aqui esta la respuestaaaa:',respuesta);
  //   if(respuesta?.role === true){
  //     // alert('Te has registrado exitosamente!')
  //     // navigation.navigate("CompleteProfileUser");
  //     changeModalVisible1(true)
  //   }if(respuesta?.role === false){
  //     // alert('Te has registrado exitosamente!')
  //     // navigation.navigate("CompleteProfileCarrier");
  //     changeModalVisible2(true)
  //   }if(respuesta?.role === 1){
  //     // alert('El mail ingresado ya se encuentra en uso!')
  //     changeModalVisible40(true)
  //   }
  // },[respuesta]);




  const [reg, setReg] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    identification: 1234,
    contraseña: "",
    telefono: "",
    business:"",
    secret:"",
    photo:""
  });

  const [check, setCheck] = useState(false);

  const CheckboxChange = (e) => {
    setCheck(!check);
  };

  // const ChangeInput = (e) => {
  //   setReg({
  //     // y sino es  generos y platforms, directamente pongo lo que escribo en el input
  //     ...reg,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    // let rolex = undefined;
    // if (chooseData === "◉ Usuario") {
    //   rolex = true;
    // } if(chooseData === "◉ Transportista") {
    //   rolex = false;
    // }
    const obj = {
      name: reg.nombre,
      lastName: reg.apellido,
      eMail: reg.mail,
      identification: reg.identification,
      phone: reg.telefono,
      photo:selectedImage,
      password: reg.contraseña,
      business:reg.business,
      secret:reg.secret,
    };

    //validaciones 
//     if (!obj.name ) {
//       changeModalVisible3(true)
//       return
//   }
//   if (!obj.lastName) {
//       // alert("Por favor escribe el Apellido correctamente!")
//       changeModalVisible4(true)
//       return
//   }
//   if (!obj.eMail.includes('.com') || !obj.eMail.includes('@')  ) {
//     changeModalVisible5(true)
//     // alert("Por favor escribe un correo electrónico válido!")
//     return
// } if (!obj.password) {
//   changeModalVisible6(true)
//   // alert("Por favor escribe una Contraseña válida!")
//   return
// }
// if (!obj.phone) {
//   changeModalVisible7(true)
//       // alert("Por favor escribe un número de telefono válido!")
//       return
//   }if (obj.terminosCondiciones === false) {
//     changeModalVisible8(true)
//     // alert("Debes aceptar los términos para poder registrarte!")
//     return
//   }if (obj.role === undefined) {
//     changeModalVisible9(true)
//   // alert("Por favor elije un Rol!")
//   return
// }



dispatch(adminregister(obj));
 console.log("Estoy enviado", obj);
    setReg({
      nombre: "",
      apellido: "",
      mail: "",
      identification: 1234,
      contraseña: "",
      telefono: "",
      business:"",
      secret:"",
      photo:""
    });
navigation.navigate("Login")
//     console.log(obj);
};

  //funciones para cambiar e.value de los inputs

  const handelChangeName = (name) => {
    setReg({
      ...reg,
      nombre: name,
    });
  };
  const handelChangeLastName = (name) => {
    setReg({
      ...reg,
      apellido: name,
    });
  };
  const handelChangeMail = (name) => {
    setReg({
      ...reg,
      mail: name,
    });
  };
  const handelChangePass = (name) => {
    setReg({
      ...reg,
      contraseña: name,
    });
  };
  const handelChangeTel = (name) => {
    setReg({
      ...reg,
      telefono: name,
    });
  };

  const handelChangeBusiness = (businessname) => {
    setReg({
      ...reg,
      business: businessname,
    });
  };
  
  const  handelChangeSecretMail = (secret) => {
    setReg({
      ...reg,
      secret: secret,
    });
  };
   ////--> IMAGE PICKER <-- ////
   const [selectedImage, setSelectedImage] = useState(null);

   let openImagePickerAsync = async () => {
     let permissionResult =
       await ImagePicker.requestMediaLibraryPermissionsAsync();
 
     if (permissionResult.granted === false) {
       alert("Se requiere el permiso para acceder a la cámara");
       return;
     }
 
     //Si es true va a venir a pickerResult
     const pickerResult = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });
 
     if (pickerResult.cancelled !== true) {
       let newFile = {
         uri: pickerResult.uri,
         type: `logi/${pickerResult.uri.split(".")[1]}`,
         name: `logi.${pickerResult.uri.split(".")[1]}`,
       };
       handleUpload(newFile);
     }
   };
 
   const handleUpload = (image) => {
     const data = new FormData();
     data.append("file", image);
     data.append("upload_preset", "logiexpress");
     data.append("cloud_name", "elialvarez");
 
     fetch("https://api.cloudinary.com/v1_1/elialvarez/image/upload", {
       method: "post",
       body: data,
     })
       .then((res) => res.json())
       .then((data) => {
         //console.log(data)
         setSelectedImage(data.url);
       });
   };




  return (
    <View style={{ flex: 1,  backgroundColor: 'white'  }}>
      <View style={{marginTop:hp("-2%"),marginLeft:wp("0%"),marginBottom:hp("0%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View>
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
            marginTop:  hp('-18%'),
          height: hp('60%') ,
          width: wp('110%') ,
          alignSelf: "center",
        }}
      >
      </ImageBackground>
      {/* Botton View */}
      <View style={styles.bottonView}>
        {/* Welcome View */}
        <View style={{ padding: 40, display: "flex", alignItems: "center" }}>
          <Text style={{ color: "#151f27", fontSize: 34,fontWeight: '600', marginTop: hp("-5%") }}>
            Ingresa a Fleet
          </Text>
          <View style={{ alignItems: "center" }}>
          <Image
          resizeMode="contain"
            source={{
              uri:
                selectedImage !== null
                  ? selectedImage
                  : 
                  "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
            
                  // "https://girbaud.vteximg.com.br/arquivos/ids/190690-500-500/Gorra-Para-Hombre-Marithe-Francois-Girbaud1217.jpg?v=637732022965400000",
            }}
            style={styles.imgPerfil}
          />
          <View>
            <Text style={{fontSize:hp("2.5%"), color:"#8a9096"}}>
              Foto de la empresa
            </Text>
          </View>

          <View style={styles.add}>
            <TouchableWithoutFeedback onPress={openImagePickerAsync}>
              <Image
                source={require("./add-image.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>

            </View>
            </View>
        </View>
        {/* inputs */}
        <View style={styles.FormView}>
          <TextInput
            name="nombre"
            value={reg.nombre}
            onChangeText={(name) => handelChangeName(name)}
            placeholder="Nombre*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.apellido}
            onChangeText={(name) => handelChangeLastName(name)}
            name="apellido"
            placeholder="Apellido*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            icon="mail"
            value={reg.mail}
            onChangeText={(name) => handelChangeMail(name)}
            name="mail"
            placeholder="Dirección de Mail*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.contraseña}
            onChangeText={(name) => handelChangePass(name)}
            name="contraseña"
            placeholder="Contraseña*"
            secureTextEntry={true}
            style={styles.TextInput}
          ></TextInput>

          <TextInput
          keyboardType={'phone-pad'}
            value={reg.telefono}
            onChangeText={(name) => handelChangeTel(name)}
            name="telefono"
            placeholder="Telefono*"
            style={styles.TextInput}
          ></TextInput>
          <TextInput
            value={reg.business}
            onChangeText={(name) => handelChangeBusiness(name)}
            name="business"
            placeholder="Nombre de la Empresa*"
            style={styles.TextInput}
          ></TextInput>
          <TextInput
            value={reg.secret}
            onChangeText={(secret) => handelChangeSecretMail(secret)}
            name="secret"
            placeholder="Color favorito*"
            style={styles.TextInput}
          ></TextInput>

          <TouchableOpacity style={styles.Button} onPress={handleSubmit } >
            <Text style={styles.ButtonText} >
              Registrarme!
            </Text>
          </TouchableOpacity>
         
        </View>

        
      </View>
    </ScrollView>
    </View>
  );
};

export default SignUp;

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
    backgroundColor: "white",
    bottom: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -20,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ff1c49",
    height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "black",
  },
  Button: {
    width: "90%",
    color: "black",
    height: 52,
    backgroundColor: "#ff1c49",
    borderRadius: 10,
    marginTop: hp("5%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 80,
    elevation: 15,
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#E1E8EB",
  },
  SingUpText: {
    color: "#4632a1",
    fontSize: 20,
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
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    marginTop: 20,
    borderRadius: 20,
  },
  text: {
    // marginVertical: 20,
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  TouchableOpacity: {
    backgroundColor: "black",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  checkboxx: {
    marginTop: 15,
  },
  imgPerfil: {
    width: wp("100%"),
    height: hp('30%'),
    // borderRadius: 100,
    borderColor: "#ff1c49",
    borderWidth: wp('0.6%'),
    marginTop: hp('6%'),
    backgroundColor:"#e1e1e1"
  },
  imgAdd: {
    width: wp("20%"),
    height: wp("20%"),
    marginLeft: wp("75%"),
    marginTop: hp('-11%'),
    borderWidth: 4,
    borderColor: "#D5D5D5",
    borderRadius: 50,
  },
});