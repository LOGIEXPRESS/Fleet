import React, { useState, useEffect, useReducer } from "react";
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
import Icon from "react-native-vector-icons/Ionicons";
// HOOK PARA LA NAVEGACION
import { useNavigation } from "@react-navigation/core";
import HeaderBar from "../../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicle } from "../../../Redux/actions";
// import { editVehicule } from "../../actions";
// import ModalVehicule from "./ModalVehicule";
// import { desmount  } from "../../actions";


const EditVehicule = () => {
  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const datosCarrier = useSelector((store) => store.responseLog)

  const vehicule = useSelector((store) => store.editVehicule)
  //console.log(editUser)

  // useEffect(() => {
  //   if(vehicule?.msg) {
  //    changeModalVisible(true)
  //   }
  // }, [vehicule, datosCarrier]);

  // useEffect(() => {
  //   return () => {
  //    dispatch(desmount())
  //   };
  // }, [dispatch]);

  /// --> ESTADO PARA EL MODAL <-- ///
  // const [isModalVisible, setisModalVisible] = useState(false);
  // const [chooseData, setchooseData] = useState();

  // const changeModalVisible = (bool) => {
  //   setisModalVisible(bool);
  // };

  // const setData = (data) => {
  //   setchooseData(data);
  // };

  //// --> ESTADO PARA LOS INPUTS <-- ////
  const [vehiculo, setVehiculo] = useState({
    brand: '',
    patent: '',
    model: '',
    color: '',
    capacity: '',
    license: ''
  });

  //// ---> HANDLERS INPUTS <--- ////
  const handleChangeBrand = (brand) => {
    setVehiculo({
      ...vehiculo,
      brand : brand
    })
  };

  const handleChangePatent = (patent) => {
    setVehiculo({
      ...vehiculo,
      patent : patent
    })
  };

  const handleChangeModel = (model) => {
    setVehiculo({
      ...vehiculo,
      model : model
    })
  };

  const handleChangeColor = (color) => {
    setVehiculo({
      ...vehiculo,
      color : color
    })
  };

  const handleChangeCapacity = (capacity) => {
    setVehiculo({
      ...vehiculo,
      capacity : capacity
    })
  }

  const handleChangelicense = (license) => {
    setVehiculo({
      ...vehiculo,
      license : license
    })
  }

   //// --> HANDLE SUBMIT <-- ////
 function handleSubmit(e) {
  e.preventDefault();
  const edit= {
    brand : vehiculo.brand,
    patent : vehiculo.patent,
    model : vehiculo.model,
    color : vehiculo.color,
    capacity : vehiculo.capacity,
    license : vehiculo.license,
    id: datosCarrier.id
  }
  dispatch(updateVehicle(edit))
  console.log("soy lo que se envia el front", edit);
 // changeModalVisible(true)
}

  return (
    <View style={styles.container}>
      <ScrollView 
       showsVerticalScrollIndicator={false}
      >
      <View style={{marginTop:hp("-1%"),marginLeft:wp("-2%"),}}>
      <HeaderBar  screen={'null'} />
      </View>
        <Text style={styles.textEditar}>Editar datos del vehiculo</Text>
        <View style={styles.containerInputs}>
          <View style={styles.viewsInputs}>
            <Icon name="newspaper-outline" style={styles.icons} />
            <TextInput
              // value = {vehicule.license}
              placeholder="Licencia actualizada"
              name="license"
              style={styles.textPlaceholder}
              onChangeText = {(license) => handleChangelicense(license)}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="car-outline" style={styles.icons} />
            <TextInput
              // value = {vehicule.brand}
              placeholder="Scania, Mercedes-Benz, etc."
              name="brand"
              style={styles.textPlaceholder}
              onChangeText={(brand) => handleChangeBrand(brand)}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="document-outline" style={styles.icons} />
            <TextInput
              // value = {vehicule.patent}
              placeholder="Número de patente"
              name="patent"
              style={styles.textPlaceholder}
              onChangeText={(patent) => handleChangePatent(patent)}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="car-sport-outline" style={styles.icons} />
            <TextInput
              // value = {vehicule.model}
              placeholder="Modelo de vehículo"
              name="model"
              style={styles.textPlaceholder}
              onChangeText={(model) => handleChangeModel(model)}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="color-palette-outline" style={styles.icons} />
            <TextInput
            //  value = {vehicule.color}
              placeholder="Color del vehículo"
              name="color"
              style={styles.textPlaceholder}
              onChangeText={(color) => handleChangeColor(color)}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="construct-outline" style={styles.icons} />
            <TextInput
            // value = {vehicule.capacity}
              placeholder="Capacidad de carga en toneladas"
              name="capacity"
              style={styles.textPlaceholder}
              onChangeText={(capacity) => handleChangeCapacity(capacity)}
            />
          </View>
        </View>

        <View style={styles.btn2}>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => navigation.navigate("DetallesVehicule")}
          >
            <Text style={styles.textBtn}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnEditar}
            onPress={handleSubmit}
          >
            <Text style={styles.textBtn}>Editar</Text>
            {/* MODAL */}
            {/* <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisible(false)}
                >
                  <ModalVehicule
                    changeModalVisible={changeModalVisible}
                    setData={setData}
                  />
                </Modal> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white'
  },
  textEditar: {
    fontSize: hp("4%"),
    fontWeight: "bold",
    // paddingHorizontal: wp("3%"),
    alignSelf:'center',
    marginTop:hp("2%"),
  },
  containerInputs: {
    marginTop: hp('8%'),
  },
  viewsInputs: {
    padding: wp('2.7%'),
    backgroundColor: "#E8EAE6",
    borderRadius: wp('3%'),
    flexDirection: "row",
    width: wp('92%'),
    marginBottom: wp('4.8%'),
  },
  textPlaceholder: {
    marginLeft: 20,
    fontSize: hp('2.2%'),
    marginBottom: wp('0.25%'),
  },
  icons:{
    fontSize: hp('3.3%'),
    color:"#ff1c49"
  },
  btnEditar: {
    backgroundColor: "#ff1c49",
    borderRadius: wp('3%'),
    width: wp('40%'),
    height: hp('7%'), 
  },
  textBtn: {
    color: "white",
    fontSize: hp('3%'),
    textAlign: 'center',
    fontWeight: 'bold',
    // alignItems:"center"
    marginTop: wp('2.5%')
  },
  btn2: { 
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: hp('8%'),
    width: wp('90%'),
    marginBottom: hp('10%')
  },
});

export default EditVehicule;
