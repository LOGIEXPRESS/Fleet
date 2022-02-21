import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import StarRating from './StarRating';
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
import { useNavigation } from "@react-navigation/core";

const Card = ({ orig, destination, price, description, weight, business, photo, id }) => {

  const props = {
    origen: orig,
    destination: destination,
    price: price,
    description: description,
    weight: weight,
    id

  }
  const navigation = useNavigation()
  return (
    <View style={styles.card} >
      <View style={styles.bannerTop}>
        <Text style={styles.textTop}>{business}</Text>
      </View>
      <View style={styles.textContent}>
        <View style={styles.textBanner}>
        <Text style={styles.text1 }>ORIGEN:</Text>
        <Text style={styles.text2}>{orig.split("/")[2]}</Text>
        </View>
        <View style={styles.textBanner}>
        <Text style={styles.text1 }>DESTINO:</Text>
        <Text style={styles.text2}>{destination.split("/")[2]}</Text>
        </View>
        <View style={styles.textBanner}>
        <Text style={styles.text1 }>DESCRIPCION:</Text>
        <Text style={styles.text2}>{description}</Text>
        </View>
        <View style={styles.textBanner}>
        <Text style={styles.text1 }>PESO:</Text>
        <Text style={styles.text2}>{weight} toneladas</Text>
        </View>
        <View style={styles.textBanner}>
        <Text style={styles.text1 }>PRECIO:</Text>
        <Text style={styles.text2}>${price}</Text>
        </View>
        <View style={styles.btn2}>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => navigation.navigate("StartCarrier", props)}
          >
            <Text style={styles.textBtn}>Comenzar Viaje</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
  text1:{
    fontWeight: 'bold',
    fontSize: hp('2%')
  },  
  text2:{
    color: '#fff',
    fontSize: hp('2%'),
    marginLeft: wp('2%'),
    marginRight: hp('5%')
  },
  textBanner: {
    flexDirection: 'row',
  },
  textTop: {
    padding: hp('1%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#fff',
    marginRight: hp('1%')
  },
  bannerTop: {
    backgroundColor: '#ff1c49',
    height: hp('4.5%'),
    alignContent: 'flex-end',
    alignItems: 'flex-end',
   
  },
  btnEditar: {
    backgroundColor: "#ff1c49",
    borderRadius: wp('3%'),
    shadowOpacity: 80,
    elevation: 16,
    width: wp('35%'),
    height: hp('6%'),
    borderColor: "#fff",
    borderWidth: hp('0.1%'),
    marginTop: hp("0.7%"),
    alignSelf: "center",
  },
  textBtn: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    marginTop: hp("1.7%"),
  },
  textContent: {
    padding: hp('3%'),
    marginTop: hp('2%')
  },
  card: {
    // padding: 10,
    elevation: hp('2%'),
    backgroundColor: 'rgba(255, 0, 4, 0.7)',
    borderRadius: hp('2%'),
    marginHorizontal: hp('1.3%'),
    height: hp('35%'),
    width: CARD_WIDTH,
    overflow: "hidden",
    borderWidth: 0.4,
    borderColor: "black",
    marginBottom: hp('5%')
  },
  header: {
    marginTop: 20,
  },
});