import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';

import { MapView,Marker} from "react-native-maps";


export default function Pointers({onMarkerPress,orig}){

    let lat=Number(orig.split("/")[0])
    let lon=Number(orig.split("/")[1])


    return(
        <MapView.Marker
        coordinate={{
          latitude: lat,
          longitude: lon,
        }}
        onPress={(e) => onMarkerPress(e)}>
            
        </MapView.Marker>
    )
}