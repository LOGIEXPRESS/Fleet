import React, { useState, useEffect } from "react";
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
  Modal
} from "react-native";
//iconos
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
// HOOK PARA LA NAVEGACION
import { useNavigation } from "@react-navigation/core";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updatePerfil } from '../../../Redux/actions/index.js'
import SimpleModal from "../../Utils/SimpleModal.js";
import { desmount } from "../../../Redux/actions/index.js";
import HeaderBar from "../../Utils/HeaderBar";


const EditProfileCarrier = () => {
  const dispatch = useDispatch();
  const datosUser = useSelector((store) => store.responseLog)

  const editCarrier = useSelector((store) => store.editarPerfilUser)
  //console.log(editCarrier)

   useEffect(() => {
   console.log("SOY DATOS DEL USER", datosUser);
   if(editCarrier?.msg) {
   changeModalVisible(true)
   }
  }, [datosUser, editCarrier]);

  useEffect(() => {
   return () => {
   dispatch(desmount())
  };
 }, [dispatch]);

  /// --> ESTADO PARA EL MODAL <-- ///
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const changeModalVisible = (bool) => {
  setisModalVisible(bool);
  };

  const setData = (data) => {
  setchooseData(data);
  };

  const handelNavigetion=(e)=>{
    e.preventDefault()
    if(datosUser.role){
      navigation.navigate('ProfileAdmin')
    }
    if(!datosUser.role){
      navigation.navigate('ProfileCarrier')
    }
    

  }

  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();

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

  //// --> ESTADO PARA LOS INPUTS <-- ////
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    documentID: '',
    location: '',
    phone: '',

  });


  //// ---> HANDLERS INPUTS <--- ////
  const handleChangeName = (name) => {
    setUser({
      ...user,
      name: name,
    });
  };

  const handleChangelastName = (lastName) => {
    setUser({
      ...user,
      lastName: lastName,
    });
  };

  const handleChangeDocumentID = (documentID) => {
    setUser({
      ...user,
      documentID: documentID,
    });
  };

  const handleChangelocation = (location) => {
    setUser({
      ...user,
      location: location,
    });
  };

  const handleChangePhone = (phone) => {
    setUser({
      ...user,
      phone: phone,
    });
  };

  //// --> HANDLE SUBMIT <-- ////
  function handleSubmit(e) {
    e.preventDefault();
    const edit = {
      name: user.name,
      lastName: user.lastName,
      documentID: user.documentID,
      location: user.location,
      phone: user.phone,
      photo: selectedImage,
      id: datosUser.id
    }
    dispatch(updatePerfil(edit))
    console.log("soy lo que se envia el front", edit);
    changeModalVisible(true)
  }

  //// --> Inicio de componente <-- ////

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        {/*   <View style={styles.iconBar}>
          <TouchableOpacity
            //no esta conectado a ningun lugar
            onPress={() => navigation.navigate("DatosPersonalesCarrier")}
          >
            <Icon name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        </View> */}
        <HeaderBar screen={'null'} />
        <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: hp("5%"), }}>
          Editar perfil
        </Text>
        {/* Foto e iconito de agregar imagen */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                selectedImage !== null
                  ? selectedImage
                  : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
            }}
            style={styles.imgPerfil}
          />
          <View>
            <TouchableWithoutFeedback onPress={openImagePickerAsync}>
              <Image
                source={require("../../Utils/add-photo.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Inicio de inputs formulario */}
        <View style={styles.containerInputs}
        // onSubmit={(e) => handleSubmit(e)}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 20, marginTop: hp("2%") }}>
            Datos personales
          </Text>
          <View style={styles.viewsInputs}>
            <Icon name="person-outline" size={26} />
            <TextInput
              value={user.name}
              placeholder="Nombre"
              name="name"
              style={styles.textPlaceholder}
              onChangeText={(name) =>
                handleChangeName(name)
              }
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="person-outline" size={26} />
            <TextInput
              value={user.lastName}
              placeholder="Apellido"
              name="lastName"
              style={styles.textPlaceholder}
              onChangeText={(lastName) =>
                handleChangelastName(lastName)
              }
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="reader-outline" size={26} />
            <TextInput
              value={user.documentID}
              placeholder="Documento de identidad"
              name="documentID"
              style={styles.textPlaceholder}
              onChangeText={(documentID) =>
                handleChangeDocumentID(documentID)
              }
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="phone-portrait-outline" size={26} />
            <TextInput
              value={user.phone}
              placeholder="Celular válido"
              name="phone"
              style={styles.textPlaceholder}
              onChangeText={(phone) =>
                handleChangePhone(phone)}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="earth-outline" size={26} />
            <TextInput
              value={user.location}
              placeholder="Lugar de residencia actual"
              name="location"
              style={styles.textPlaceholder}
              onChangeText={(location) => handleChangelocation(location)}
            />
          </View>
          {/* <View style={styles.viewsInputs}>
            <Icon name="reader-outline" size={26} />
            <TextInput
              value={user.cbu}
              placeholder="Número de CBU"
              name="cbu"
              style={styles.textPlaceholder}
              onChangeText={(cbu) => handleChangeCbu(cbu)}
            />
          </View> */}

          <View style={styles.btn2}>
            <TouchableOpacity
              style={styles.btnEditar}
              onPress={handelNavigetion}
            >
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              ///---> PONER A DONDE TIENE QUE VOLVER <--- ///
              style={styles.btnEditar}
            >
              <Text style={styles.textBtn}
              onPress={handleSubmit}
              >Editar</Text>
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
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBar: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  containerInputs: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 10,
  },
  imgPerfil: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: "#ff1c49",
    borderWidth: 6,
    marginTop: 10,
  },
  imgAdd: {
    width: 50,
    height: 50,
    marginLeft: 135,
    marginTop: -70,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 50,
  },

  textPlaceholder: {
    marginLeft: 20,
    fontSize: 17,
    marginBottom: 2,
  },
  btnEditar: {
    backgroundColor: "#ff1c49",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 5,
    alignSelf: "center",
    // marginBottom: 20,
    marginRight:wp("10%"),
    marginLeft: wp("3.5%"),
  },
  textBtn: {
    color: "white",
    fontSize: hp("2.9%"),
    alignSelf: "center",
    marginTop: hp("1%"),
    fontWeight: "bold"
  },
  viewsInputs: {
    margin: 2,
    borderColor: "#ff1c49",
    borderBottomWidth: 2,
    flexDirection: "row",
    width: 360,
    alignItems: "flex-start",
    marginBottom: 15,
  },
  btn2: { flexDirection: "row", marginTop:hp("7%"),   },
});

export default EditProfileCarrier;
