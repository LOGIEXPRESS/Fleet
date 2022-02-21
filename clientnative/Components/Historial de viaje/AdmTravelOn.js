import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from "react-native-maps";
/* import { getTravelID } from '../../actions/index.js' */
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { APIKEY_GOOGLE } from "@env"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { alltravelstruck, desmount } from '../../Redux/actions'
import HeaderBar from '../Utils/HeaderBar.js'
import axios from 'axios';
import { API_URLS } from "@env"


export default function AdmTravelOn(props) {


    const id = props.route.params
    const navigation = useNavigation();
    const travelstruck = useSelector((store) => store.alltraveltruck)
    const [travel, setTravel] = useState(null)


    console.log("Esto es travel que llega al componente: ", travel)
    /*    const socket = useSelector((store) => store.socket)
       console.log("ESTO SON LAS PROPS", props.route.params.userId) */
    const dispatch = useDispatch();


    useEffect(() => {
        if (travelstruck) {
            if(travelstruck.travelfinished.length > 0 ) {
                setTravel(travelstruck.travelfinished[0])
            }
        }

        return () => {
            setTravel(null)
        }
    }, [travelstruck])


    useEffect(() => {
        dispatch(alltravelstruck(id))

        return () => {
            dispatch(desmount())
        }
    }, [dispatch])


    const [state, setState] = useState({
        origen: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        destino: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    })


    const { origen, destino } = state;

    useEffect(() => {
        if (travel) {
            const orig = travel.orig.split('/')
            const dest = travel.destination.split('/')
            setState({
                origen: {
                    latitude: Number(orig[0]),
                    longitude: Number(orig[1]),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                destino: {
                    latitude: Number(dest[0]),
                    longitude: Number(dest[1]),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            })

        };
    }, [travel]);


    /*    console.log('ESTAS SON LA COORRDENADAS', state) */

    const _map = useRef();
    return (
        <View style={styles.container}>


            <HeaderBar screen={'null'} />

            <View style={styles.container}>
                {
                    travel !== null ?

                        <MapView
                            ref={_map}
                            style={StyleSheet.absoluteFill}
                            initialRegion={origen}
                        >

                            <Marker
                                coordinate={origen}
                            />
                            <Marker
                                coordinate={destino}
                            />
                            <MapViewDirections
                                origin={origen}
                                destination={destino}
                                apikey={APIKEY_GOOGLE}
                                strokeWidth={3}
                                strokeColor='hotpink'
                                optimizeWaypoints={true}
                                onReady={result => {
                                    _map.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: 30,
                                            bottom: 300,
                                            left: 30,
                                            top: 100,
                                        }
                                    })
                                }}
                            />

                        </MapView> : <ActivityIndicator size="large" color="#0000ff" />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn2: {
        flex: 1,
        marginBottom: wp("20%"),
        padding: wp("5.5%"),
        marginTop: hp("70%")
    },
    btnText2: {
        backgroundColor: "#7952B3",
        width: wp("88%"),
        height: hp("7%"),
        padding: wp('2.5%'),
        borderRadius: wp('3%'),
        shadowOpacity: 80,
        elevation: 16,
        marginTop: wp("7%"),
        borderColor: "#E1E8EB",
        borderWidth: 1.75,
        alignContent: "center",
    },
    btnText: {
        backgroundColor: "#FFC107",
        width: wp("88%"),
        height: hp("7%"),
        padding: wp('2.5%'),
        borderRadius: wp('3%'),
        shadowOpacity: 80,
        elevation: 16,
        marginTop: wp("7%"),
        borderColor: "#E1E8EB",
        borderWidth: 1.75,
        alignContent: "center",
    },
    userBtnTxt: {
        marginTop: wp('1%'),
        color: "white",
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: hp('2.5%'),
        marginTop: wp('0.9%'),
    },
    container: {
        flex: 1,
    },


});
