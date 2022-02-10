import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';

const { width, height } = Dimensions.get("window");
const CARD_HEIGTH = 200;
const CARD_WIDTH = width * 0.8;

export default function CardWaiting(){
    return(
        <View style={styles.card} >
             
                <View style={styles.textContent}>
                  <Text>No se encontraron viajes vuelva mas tarde</Text>
              

                </View>
        </View>

    )
}


const styles = StyleSheet.create({
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
    textContent: {
        flex: 2,
        padding: 10,
      },

})
