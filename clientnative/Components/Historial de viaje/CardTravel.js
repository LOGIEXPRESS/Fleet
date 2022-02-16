import { View, Text , StyleSheet , Image , TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import { capitalize } from "lodash";
import { Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";






export default function CardTravel(props) {

  const navigation = useNavigation()

  const{travel , info} = props
  console.log("Esto es Travel:", travel)
  console.log("Esto es Info:", info)
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <View style={styles.spacing}>
             <Text style={styles.number}>{info}</Text>
          <View style={styles.container}>
            <Text style={styles.name}>
              Origen: {travel.orig.split("/")[2]}
            </Text>
            <Text style={styles.name}>
              Destino: {travel.destination.split("/")[2]}
            </Text>
            <Text style={styles.name}>
              Carga: {capitalize(travel.description)}
            </Text>
            <Text style={styles.name}>
              Peso: {capitalize(travel.weight)}
            </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate('TravelOn', travel) }
            >
              <Text style={styles.btn}>
                Ver Viaje Actual
              </Text>
            </TouchableOpacity>
            <Button title={"Finalizar viaje"}>
                
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "green",
    flex: 1,
    height: hp('25%'),
    borderRadius: 9,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
  name: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
    paddingTop: 3
  },
  number: {
    position: "absolute",
    right: 10,
    top: 0,
    color: "#fff",
    fontSize: 11,
  },
  container: {
      marginTop: 5
  }, 
  btn: {
    color: '#ffff'
  },
});
