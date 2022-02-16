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

const SimpleModalCarrier = (props) => {
  const navigation = useNavigation();

  let closeModal = (bool, data) => {
    props.changeModalVisible300(bool);
    props.setData300(data);
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <View>
            <Image
              source={require("./sucess_camion.png")}
              style={{ height: 130, width: 130, marginTop: -15 }}
            />
          </View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          ¡Felicitaciones!
          </Text>
          <Text style={{ fontSize: 16, margin: 3 }}>
          ¡Tu viaje acaba de comenzar!
          </Text>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity
            onPress={() => closeModal(false, "Aceptar")}
            onPressIn={() => navigation.push('ProfileCarrier')}
            style={styles.btnAceptar}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold", color: 'white' }}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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

  textView: {
    alignItems: "center",
  },
  btnAceptar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#81B214",
    borderColor: "#29BB89",
    height: 45,
    width: 120,
    borderRadius: 11,
  },
  containerBtn: {
    alignContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
