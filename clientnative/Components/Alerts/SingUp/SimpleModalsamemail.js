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

const SimpleModalsamemail = (props) => {
  const navigation = useNavigation();

  let closeModal = (bool, data) => {
    props.changeModalVisible40(bool);
    props.setData40(data);
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <View>
            <Image
              source={require("./wrong.png")}
              style={{ height: 55, width: 55, marginBottom: 15 }}
            />
          </View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            ¡ERROR!
          </Text>
          <Text style={{ fontSize: 16, margin: 7 }}>
            ¡El mail ingresado ya se encuentra en uso!
          </Text>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity
            onPress={() => closeModal(false, "Aceptar")}
            // onPressIn={() => navigation.navigate("CompleteProfileCarrier")}
            style={styles.btnAceptar}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color:"white" }}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleModalsamemail;

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
    backgroundColor: "#e64a3a",
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
