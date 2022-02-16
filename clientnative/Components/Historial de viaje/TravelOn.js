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
import HeaderBar from '../Utils/HeaderBar.js'




export default function TravelOn(props) {

    const navigation = useNavigation();
    const travel = props.route.params

    /*    const socket = useSelector((store) => store.socket)
       console.log("ESTO SON LAS PROPS", props.route.params.userId) */
    const dispatch = useDispatch();

    /* 
        const sendConfirmation = (props) => {
            // alert('me estoy precionando')
            console.log("ESTAS SON LAS PROPS QUE ENVIO", props)
            const id = props
            socket.emit('confirm_destination', id, (resp) => {
                console.log(resp.status); // ok
                setResponse(resp.status);
            });
            navigation.navigate("ReviewCarrier")
    
        }
    
        const sendFinishedTravel = (props) => {
            // alert('me estoy precionando')
            console.log("ESTAS SON LAS PROPS QUE ENVIO", props)
            const id = props
            socket.emit('finished_travel', id, (resp) => {
                console.log(resp.status); // ok
                setResponse2(resp.status);
            });
            navigation.navigate("ReviewUser", data.id)
        }
     */
    /* let [response, setResponse] = useState(null);
    let [response2, setResponse2] = useState(null);

    console.log("esta es la respuesta", response)
    const data = props.route.params
 */
    /* const id = {
        id: props.route.params.id
    }
    const travel = useSelector((store) => store.travel)
    console.log("ESTA ES LA ID", travel)
    useEffect(() => {
        dispatch(getTravelID(id))
    }, [dispatch, response]);

 */
    /*    const [usersIds, setUsersIds] = useState({
           userId: null,
           carrierId: null,
       })
    */

    /* useEffect(() => {
        if (data) {
            if (data.userId) {
                setUsersIds({
                    userId: data.userId,
                    carrierId: null,
                })
            } else {
                setUsersIds({
                    userId: null,
                    carrierId: data.carrierId,
                })
            }
        }

        return () => {
            setUsersIds({
                userId: null,
                carrierId: null,
            })
        };
    }, []); */


    /* 
        console.log("ESTAS SON LAS IDS PARA EL CONDICIONAL", usersIds) */

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
{/* 
            <View style={{ position: 'absolute', marginTop: '10%' }}>
                <HeaderBar screen={'null'} />
            </View> */}
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
      {/*       {
                usersIds.userId ?
                    <View style={styles.btn2}>
                        <TouchableOpacity
                            style={styles.btnText}
                            onPress={() => sendFinishedTravel(data.id)}
                        >
                            <Text style={styles.userBtnTxt}>CONFIRMAR SOLICITUD</Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={styles.btn2}>
                        <TouchableOpacity
                            style={styles.btnText2}
                            onPress={() => sendConfirmation(data.id)}
                        >
                            <Text style={styles.userBtnTxt}>LLEGUE A DESTINO</Text>
                        </TouchableOpacity>
                    </View>
            } */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn2: {
        flex: 1,
        marginBottom: wp("20%"),
        padding: wp("5.5%"),
        marginTop: wp("90%")
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
        fontSize: hp('2.2%'),
        marginTop: wp('0.9%'),
    },


});
