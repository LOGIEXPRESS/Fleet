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
const HEIGTH_MODAL = 220;

const SimpleModalok = (props) => {
  const navigation = useNavigation();

  let closeModal = (bool, data) => {
    props.changeModalVisible1(bool);
    props.setData1(data);
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <View>
            <Image
              source={require("./sucess.png")}
              style={{ height: 55, width: 55, marginBottom: 15 }}
            />
          </View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            ¡FELICITACIONES!
          </Text>
          <Text style={{ fontSize: 16, margin: 7 }}>
            ¡Te has registrado exitosamente!
          </Text>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity
            onPress={() => closeModal(false, "Aceptar")}
            onPressIn={() => navigation.navigate("CompleteProfileUser")}
            style={styles.btnAceptar}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleModalok;

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
    backgroundColor: "#29BB89",
    borderColor: "#29BB89",
    height: 45,
    width: 120,
    borderRadius: 10,
  },
  containerBtn: {
    alignContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
