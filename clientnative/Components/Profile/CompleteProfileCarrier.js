import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import HeaderBar from "../Utils/HeaderBar";
import { completeProfileCarrier } from "../../Redux/actions/index.js";
import SimpleModal10 from "../Alerts/Complete/SimpleModaldni";
import SimpleModal from "../Alerts/Complete/SimpleModal";
import SimpleModal11 from "../Alerts/Complete/SimpleModalzone";
import SimpleModal12 from "../Alerts/Complete/SimpleModallicense.js";
import SimpleModal13 from "../Alerts/Complete/SimpleModalbrand.js";
import SimpleModal14 from "../Alerts/Complete/SimpleModalpatent.js";
import SimpleModal15 from "../Alerts/Complete/SimpleModalmodel.js";
import SimpleModal16 from "../Alerts/Complete/SimpleModalcolor.js";
import SimpleModal17 from "../Alerts/Complete/SimpleModalcapacity.js";
import SimpleModal7 from './../Alerts/SingUp/SimpleModalphone';
import SimpleModal101 from "../Alerts/Complete/SimpleModalsecret.js";

// prueba para las screens responsive
import {

  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CompleteProfileCarrier = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const datosCarrier = useSelector((store) => store.responseLog);
  useEffect(() => {
    if(datosCarrier.business != null){
      console.log("business",datosCarrier.business)
  navigation.navigate('ProfileCarrier')
    }
}, [datosCarrier.business]);
  
  useEffect(() => {
    console.log("SOY DATOS DEL CARRIER", datosCarrier);
    if(datosCarrier) {
      if(datosCarrier.business !== null){
      navigation.navigate('ProfileCarrier')
      }
    }
  }, [datosCarrier]);

  
  // validaciones dni
  const [isModalVisible10, setisModalVisible10] = useState(false);
  const [chooseData10, setchooseData10] = useState();

  const changeModalVisible10 = (bool) => {
    setisModalVisible10(bool);
  };

  const setData10 = (data) => {
    setchooseData10(data);
  };

  //validaciones telefono

  const [isModalVisible7, setisModalVisible7] = useState(false);
  const [chooseData7, setchooseData7] = useState();

  const changeModalVisible7 = (bool) => {
    setisModalVisible7(bool);
  };

  const setData7 = (data) => {
    setchooseData7(data);
  };

  // validaciones zona

  const [isModalVisible11, setisModalVisible11] = useState(false);
  const [chooseData11, setchooseData11] = useState();

  const changeModalVisible11 = (bool) => {
    setisModalVisible11(bool);
  };

  const setData11 = (data) => {
    setchooseData11(data);
  };

    // validaciones color favorito

    const [isModalVisible101, setisModalVisible101] = useState(false);
    const [chooseData101, setchooseData101] = useState();
  
    const changeModalVisible101 = (bool) => {
      setisModalVisible101(bool);
    };
  
    const setData101 = (data) => {
      setchooseData101(data);
    };

  // validaciones licencia

  const [isModalVisible12, setisModalVisible12] = useState(false);
  const [chooseData12, setchooseData12] = useState();

  const changeModalVisible12 = (bool) => {
    setisModalVisible12(bool);
  };

  const setData12 = (data) => {
    setchooseData12(data);
  };

  // validacion marca

  const [isModalVisible13, setisModalVisible13] = useState(false);
  const [chooseData13, setchooseData13] = useState();

  const changeModalVisible13 = (bool) => {
    setisModalVisible13(bool);
  };

  const setData13 = (data) => {
    setchooseData13(data);
  };

  // validacion patente

  const [isModalVisible14, setisModalVisible14] = useState(false);
  const [chooseData14, setchooseData14] = useState();

  const changeModalVisible14 = (bool) => {
    setisModalVisible14(bool);
  };

  const setData14 = (data) => {
    setchooseData14(data);
  };

  // validacion modelo

  const [isModalVisible15, setisModalVisible15] = useState(false);
  const [chooseData15, setchooseData15] = useState();

  const changeModalVisible15 = (bool) => {
    setisModalVisible15(bool);
  };

  const setData15 = (data) => {
    setchooseData15(data);
  };
  // validacion color

  const [isModalVisible16, setisModalVisible16] = useState(false);
  const [chooseData16, setchooseData16] = useState();

  const changeModalVisible16 = (bool) => {
    setisModalVisible16(bool);
  };

  const setData16 = (data) => {
    setchooseData16(data);
  };

  // validacion capacidad

  const [isModalVisible17, setisModalVisible17] = useState(false);
  const [chooseData17, setchooseData17] = useState();

  const changeModalVisible17 = (bool) => {
    setisModalVisible17(bool);
  };

  const setData17 = (data) => {
    setchooseData17(data);
  };


  / --> ESTADO PARA EL MODAL <-- ///
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (data) => {
    setchooseData(data);
  };

  //// --> ESTADO PARA LOS INPUTS <-- ////

  const [carrier, setCarrier] = useState({
    //Datos del carrier//
    // documentID: "",
    identification:"",
    phone: "",
    secret:"",
    locacion: "",
    //Datos del vehiculo//
    license: "",
    brand: "",
    patent: "",
    model: "",
    color: "",
    capacity: "",
  });

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

  //// ---> HANDLERS INPUTS <--- ////
  //Carrier//
  const handleChangeDocumentID = (documentID) => {
    setCarrier({
      ...carrier,
      identification: documentID,
    });
  };

  const handleChangeLicense = (license) => {
    setCarrier({
      ...carrier,
      license: license,
    });
  };

  const handleChangePhone=(phone)=>{
    setCarrier({
      ...carrier,
      phone: phone,
    });
  }

  const handleChangeLocacion = (locacion) => {
    setCarrier({
      ...carrier,
      locacion: locacion,
    });
  };

  //Vehicule//
  const handleChangeBrand = (brand) => {
    setCarrier({
      ...carrier,
      brand: brand,
    });
  };

  const handleChangePatent = (patent) => {
    setCarrier({
      ...carrier,
      patent: patent,
    });
  };

  const handleChangeModel = (model) => {
    setCarrier({
      ...carrier,
      model: model,
    });
  };

  const handleChangeColor = (color) => {
    setCarrier({
      ...carrier,
      color: color,
    });
  };

  const handleChangeCapacity = (capacity) => {
    setCarrier({
      ...carrier,
      capacity: capacity,
    });
  };

  const handleChangeSecret=(secret)=>{
    setCarrier({
      ...carrier,
      secret: secret,
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      idSignUp: props.route.params.login.id,
      // documentID: carrier.documentID,
      identification:Number(carrier.identification),//tine q ser un numero
      
      locacion: carrier.locacion,
      photo: selectedImage||'url',
      phone:carrier.phone,
      secret:carrier.secret,
      // Vehicule //
      license: carrier.license,
      brand: carrier.brand,
      patent: carrier.patent,
      model: carrier.model,
      color: carrier.color,
      capacity: parseInt(carrier.capacity),
    };

    // // VALIDACIONES
    if (!obj.identification) {
      changeModalVisible10(true);
      return;
    }

    if (!obj.phone) {
      changeModalVisible7(true);
      return;
    }

    if (!obj.locacion) {
      changeModalVisible11(true);
      return;
    }

    if (!obj.secret) {
      changeModalVisible101(true);
      return;
    }
    if (!obj.license) {
      changeModalVisible12(true);
      return;
    }
    if (!obj.brand) {
      changeModalVisible13(true);
      return;
    }
    if (!obj.patent) {
      changeModalVisible14(true);
      return;
    }
    if (!obj.model) {
      changeModalVisible15(true);
      return;
    }
    if (!obj.color) {
      changeModalVisible16(true);
      return;
    }
    if (!obj.capacity) {
      changeModalVisible17(true);
      return;
    }

    dispatch(completeProfileCarrier(obj));
    console.log("soy lo que se envia", obj);
    
   
    // changeModalVisible(true)
    
  }

  //// --> Inicio de componente <-- ////

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{marginTop:hp("-2%"),marginLeft:wp("0%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: wp("3%"),
            // marginTop: hp("0%"),
            fontSize: 23,
            // alignSelf:"center",
            color: "#151f27",
            marginBottom: 15,
          }}
        >
          Completa tu Perfil
        </Text>
        {/* Foto e iconito de agregar imagen */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                selectedImage !== null
                  ? selectedImage
                  : 
                  // "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
                  "https://girbaud.vteximg.com.br/arquivos/ids/190690-500-500/Gorra-Para-Hombre-Marithe-Francois-Girbaud1217.jpg?v=637732022965400000",
            }}
            style={styles.imgPerfil}
          />

          <View style={styles.add}>
            <TouchableWithoutFeedback onPress={openImagePickerAsync}>
              <Image
                source={require("./add-image.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>

            {/* Inicio de inputs formulario */}
            <View
              style={styles.containerInputs}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Text
                style={{ fontSize:21, fontWeight: "bold", marginBottom: 20, alignSelf:'center', color:"#e81d42" }}
              >
                Datos personales
              </Text>
              <View style={styles.viewsInputs}>
                <Icon name="person" style={styles.icons} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {/* Santiago */}
                  {datosCarrier?.name}
                </Text>
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" style={styles.icons} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {/* Varela */}
                  {datosCarrier?.lastName}
                </Text>
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline"  style={styles.icons} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                 { datosCarrier?.eMail}
                  {/* {datosCarrier.eMail} */}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="reader-outline"  style={styles.icons} />
                <TextInput
                  value={carrier.documentID}
                  placeholder="Documento de Identidad (sin puntos)"
                  name="documentID"
                  style={styles.textPlaceholder}
                  onChangeText={(documentID) =>
                    handleChangeDocumentID(documentID)
                  }
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="phone-portrait-outline"  style={styles.icons} />
                <TextInput
                  value={carrier.documentID}
                  placeholder="Número de Teléfono"
                  name="documentID"
                  style={styles.textPlaceholder}
                  onChangeText={(documentID) =>
                    handleChangePhone(documentID)
                  }
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="map-outline"  style={styles.icons} />
                <TextInput
                  value={carrier.locacion}
                  onChangeText={(locacion) => handleChangeLocacion(locacion)}
                  placeholder="Ubicación de residencia actual"
                  name="locacion"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="color-fill-outline"  style={styles.icons} />
                <TextInput
                  value={carrier.secret}
                  onChangeText={(secret) => handleChangeSecret(secret)}
                  placeholder="¿Cuál es tu color favorito?"
                  name="secret"
                  style={styles.textPlaceholder}
                />
              </View>

              {/* Inicio de los input de completar vehiculo */}

              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold", marginBottom: 20, alignSelf:'center' }}
                >
                  Datos del vehiculo
                </Text>
                <View style={styles.viewsInputs}>
                  <Icon name="newspaper-outline"  style={styles.icons} />
                  <TextInput
                    value={carrier.license}
                    onChangeText={(license) => handleChangeLicense(license)}
                    placeholder="Tipo de licencia"
                    name="license"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-outline"  style={styles.icons} />
                  <TextInput
                    value={carrier.brand}
                    onChangeText={(brand) => handleChangeBrand(brand)}
                    placeholder="Marca"
                    name="brand"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="document-outline"  style={styles.icons} />
                  <TextInput
                    value={carrier.patent}
                    onChangeText={(patent) => handleChangePatent(patent)}
                    placeholder="Patente"
                    name="patent"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-sport-outline"  style={styles.icons} />
                  <TextInput
                    value={carrier.model}
                    onChangeText={(model) => handleChangeModel(model)}
                    placeholder="Modelo y año"
                    name="model"
                    // keyboardType="decimal-pad"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="color-palette-outline"  style={styles.icons} />
                  <TextInput
                    value={carrier.color}
                    onChangeText={(color) => handleChangeColor(color)}
                    placeholder="Color exterior"
                    name="color"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="construct-outline"  style={styles.icons} />
                  <TextInput
                    value={carrier.capacity}
                    onChangeText={(capacity) => handleChangeCapacity(capacity)}
                    placeholder="Capacidad máx en toneladas"
                    name="capacity"
                    style={styles.textPlaceholder}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.btnEditar} onPress={handleSubmit}>
                <Text style={styles.textBtn}>Finalizar</Text>
                 {/* MODAL */}
                 <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisible(false)}
                >
                  <SimpleModal
                    changeModalVisible={changeModalVisible}
                    setData={setData}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible10}
                  nRequestClose={() => changeModalVisible10(false)}
                >
                  <SimpleModal10
                    changeModalVisible10={changeModalVisible10}
                    setData10={setData10}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible11}
                  nRequestClose={() => changeModalVisible11(false)}
                >
                  <SimpleModal11
                    changeModalVisible11={changeModalVisible11}
                    setData11={setData11}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible12}
                  nRequestClose={() => changeModalVisible12(false)}
                >
                  <SimpleModal12
                    changeModalVisible12={changeModalVisible12}
                    setData12={setData12}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible13}
                  nRequestClose={() => changeModalVisible13(false)}
                >
                  <SimpleModal13
                    changeModalVisible13={changeModalVisible13}
                    setData13={setData13}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible14}
                  nRequestClose={() => changeModalVisible14(false)}
                >
                  <SimpleModal14
                    changeModalVisible14={changeModalVisible14}
                    setData14={setData14}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible15}
                  nRequestClose={() => changeModalVisible15(false)}
                >
                  <SimpleModal15
                    changeModalVisible15={changeModalVisible15}
                    setData15={setData15}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible16}
                  nRequestClose={() => changeModalVisible16(false)}
                >
                  <SimpleModal16
                    changeModalVisible16={changeModalVisible16}
                    setData16={setData16}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible17}
                  nRequestClose={() => changeModalVisible17(false)}
                >
                  <SimpleModal17
                    changeModalVisible17={changeModalVisible17}
                    setData17={setData17}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible7}
                  nRequestClose={() => changeModalVisible7(false)}
                >
                  <SimpleModal7
                    changeModalVisible7={changeModalVisible7}
                    setData7={setData7}
                  />
                </Modal>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible101}
                  nRequestClose={() => changeModalVisible101(false)}
                >
                  <SimpleModal101
                    changeModalVisible101={changeModalVisible101}
                    setData101={setData101}
                  />
                </Modal>
                
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileCarrier;

const styles = StyleSheet.create({
  iconBar: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  icons:{
    fontSize: hp("3.5%"),
    color: "#ff1c49",
    padding: wp("0.3%"),
    marginTop: wp('-0.7%'), 
  },
  containerInputs: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 40,
  },
  textPlaceholder: {
    marginLeft: 20,
    fontSize: 18,
    marginBottom: 2,
  },
  imgPerfil: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: "#ff1c49",
    borderWidth: 6,
    // marginTop: 30,
  },
  imgAdd: {
    width: 55,
    height: 55,
    marginLeft: 222,
    marginTop: -82,
    borderWidth: 4,
    borderColor: "#D5D5D5",
    borderRadius: 50,
  },

  btnEditar: {
    
    backgroundColor: "#ff1c49",
    borderRadius: wp('3%'),
    width: wp("88%"),
    height: hp("7%"),
    marginTop: wp('10%'),
    alignSelf: "center",
    marginBottom: 20,
  },
  textBtn: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 10,
  },
  viewsInputs: {
    borderColor: "#151f27",
    borderBottomWidth: 1.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 360,
    alignItems: "flex-start",
    marginBottom: 20,
  },
});
