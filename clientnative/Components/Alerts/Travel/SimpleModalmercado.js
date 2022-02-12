import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WIDTH = Dimensions.get("window").width;
const HEIGTH_MODAL = 220;

const SimpleModalMercado = (props) => {
  const navigation = useNavigation();

  let closeModal = (bool, data,boole) => {
    props.changeModalVisible70(bool);
    props.setData70(data);
    props.setActivacion70(boole);
  };

  let fuxion = () =>{
    closeModal(false, "Aceptar",true)

  }

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <View>
            <Image
              source={require("./mercadopago.png")}
              style={{ height: 55, width: wp("80%"), marginBottom: 10 }}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            ¡ATENCIÓN!
          </Text>
          <Text style={{ fontSize: 17, margin: 7 }}>
            Debes generar la clave de MercadoPago!
          </Text>
        </View>
        <View style={styles.containerBtn}>
          
          <TouchableOpacity
           onPress={() => closeModal(false, "Aceptar",false)}
           onPressIn={() => navigation.navigate("ScreenAccessToken")}
            style={styles.btnAceptar}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color:"white" }}>Ir ahora</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => closeModal(false, "Aceptar",false)}
            onPressIn={() => navigation.navigate("ProfileCarrier")}
            style={styles.btnAceptar}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color:"white" }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleModalMercado;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: HEIGTH_MODAL,
    width: WIDTH - 40,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 15,
  },

  textView: {
    alignItems: "center",
  },
  btnAceptar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009de2",
    borderColor: "#29BB89",
    height: 45,
    width: 120,
    borderRadius: 10,
  },
  containerBtn: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignContent: "center",
    alignItems: "center",
    margin: 10,
    
  },
});
