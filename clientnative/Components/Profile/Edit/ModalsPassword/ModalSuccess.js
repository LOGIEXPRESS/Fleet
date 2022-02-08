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

const WIDTH = Dimensions.get("window").width;
const HEIGTH_MODAL = 240;

const SimpleModalCarrier = (props) => {
  const navigation = useNavigation();

  let closeModal = (bool, data) => {
    props.changeModalVisible2(bool);
    props.setData2(data);
  };

  return (
    <View disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <View>
            <Image
              source={require("./entrada-de-contrasena.png")}
              style={{ height: 100, width: 100, marginTop: -5 }}
            />
          </View>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
            ¡INCREIBLE!
          </Text>
          <Text style={{ fontSize: 16, margin: 2 }}>
            ¡Contraseña cambiada con exito!
          </Text>
        </View>
        <View style={styles.viewBotones}>
          <View style={styles.containerBtn}>
            <TouchableOpacity
              onPress={() => closeModal(false, "Continuar")}
              onPressIn={() => navigation.navigate('Login')}
              style={styles.btnAceptar}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SimpleModalCarrier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: HEIGTH_MODAL,
    width: WIDTH - 40,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 15,
  },
  viewBotones: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textView: {
    alignItems: "center",
  },
  btnAceptar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1EAE98",
    height: 45,
    width: 120,
    borderRadius: 11,
    flexDirection: "row",
  },
  containerBtn: {
    alignContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
