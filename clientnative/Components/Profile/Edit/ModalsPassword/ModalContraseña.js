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
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../Redux/actions/index";
import * as SecureStore from "expo-secure-store";

const WIDTH = Dimensions.get("window").width;
const HEIGTH_MODAL = 240;

const SimpleModalCarrier = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    props.setData(data);
  };

  const handleSubmit = async () => {
    const pass = {
      newPassword: props.contraseña,
      id: props.id,
    };
    dispatch(changePassword(pass));
    console.log("Estoy enviando:", pass);
    await SecureStore.deleteItemAsync("token");
  };

  return (
    <View disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <View>
            <Image
              source={require("./warning.png")}
              style={{ height: 100, width: 100, marginTop: -5 }}
            />
          </View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            ¿ESTÁS SEGURO?
          </Text>
          <Text style={{ fontSize: 16, margin: 3 }}>
            ¡Tu contraseña será cambiada!
          </Text>
        </View>
        {/* BOTONES DE CANCELAR Y ACEPTAR */}
        <View style={styles.viewBotones}>
          <View style={styles.containerBtn}>
            <TouchableOpacity
              onPress={() => closeModal(false, "Aceptar")}
              onPressIn={handleSubmit}
              style={styles.btnAceptar}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerBtn}>
            <TouchableOpacity
              onPress={() => closeModal(false, "Cancelar")}
              style={styles.btnAceptar}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                Cancelar
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
    backgroundColor: "rgba(0,0,0,0.7)",
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
    backgroundColor: "black",
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
