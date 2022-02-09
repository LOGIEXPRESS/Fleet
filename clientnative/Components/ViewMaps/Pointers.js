import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';

import { MapView,Marker} from "react-native-maps";


export default function Pointers({}){
    return(
        <MapView.Marker
        coordinate={{
          latitude: lat,
          longitude: lon,
        }}
        onPress={(e) => onMarkerPress(e)}>
            Pointer
        </MapView.Marker>
    )
}