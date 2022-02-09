import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';

// import StarRating from './StarRating';
const { width, height } = Dimensions.get("window");
const CARD_HEIGTH = 380;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Card = ({orig,destination,price,description,weight,business,photo}) => {
  return (
<View style={styles.card} >
                <View style={{ alignItems: "center", flexDirection: "column" }}>
                  <Image
                    source={photo?{
                      uri:photo
                      
                    }:require('../Utils/logo.png')}
                    style={styles.cardImage}
                  />
                  {/* <StarRating ratings={rating} reviews={rating} /> */}
                  <Text>Empresa: {business}</Text>
                </View>
                <View style={styles.textContent}>
                  <Text>ID: </Text>
                  <Text>DESCRIPCION: {description} </Text>
                  <Text>ORIGEN: {orig.split("/")[2]}</Text>
                  <Text>DESTINO: {destination.split("/")[2]}</Text>
                  <Text>PESO: {weight}ton</Text>
                  <Text>PAGO: ${price}</Text>
                  <View style={styles.btn2}>
                    <TouchableOpacity
                      style={styles.btnEditar}
                      
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
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
    },
    marker: {
      width: 30,
      height: 30,
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    btnEditar: {
      backgroundColor: "#FFC107",
      borderRadius: 10,
      width: 150,
      height: 50,
      marginTop: 20,
      alignSelf: "center",
      marginBottom: 20,
      marginRight: 30,
    },
    textBtn: {
      color: "white",
      fontSize: 17,
      alignSelf: "center",
      marginTop: 12,
    },
    scrollView: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },
    cardImage: {
      height: 150,
      width: 150,
      borderRadius: 100,
    },
    cardtitle: {
      fontSize: 12,
      // marginTop: 5,
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 12,
      color: "#444",
    },
    textContent: {
      flex: 2,
      padding: 10,
    },
    card: {
      // padding: 10,
      elevation: 2,
      backgroundColor: "#FFF",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGTH,
      width: CARD_WIDTH,
      overflow: "hidden",
    },
    header: {
      marginTop: 20,
    },
  });