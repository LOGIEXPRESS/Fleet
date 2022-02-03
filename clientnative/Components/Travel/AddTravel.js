import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Modal
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native";
import { Input } from "react-native-elements"
import { useSelector, useDispatch } from "react-redux";
// import { cotizarViaje, requestTravel } from "../actions/index.js"
import { LogBox } from 'react-native';
// import SimpleModal20 from "./AlertasTravel/SimpleModalorigin";
// import SimpleModal21 from "./AlertasTravel/SimpleModaldest";
// import SimpleModal22 from "./AlertasTravel/SimpleModalweight";
// import SimpleModal23 from "./AlertasTravel/SimpleModalprice";
import HeaderBar from "../Utils/HeaderBar";
import { APIKEY_GOOGLE } from "@env"





// funcion para calcular la distancia en km
// function getDistanciaMetros(origen, destino) {
//     var lat1 = origen.latitude;
//     var lon1 = origen.longitude;
//     var lat2 = destino.latitude;
//     var lon2 = destino.longitude;
//     rad = function (x) { return x * Math.PI / 180; }
//     var R = 6378.137; //Radio de la tierra en km 
//     var dLat = rad(lat2 - lat1);
//     var dLong = rad(lon2 - lon1);
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
//         Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     //aquí obtienes la distancia en metros por la conversion 1Km =1000m
//     var d = R * c * 1000;
//     return d / 1000;
// }




const AddTravel = (props) => {


    const socket = useSelector((store) => store.socket)


    ////--> HOOK PARA LA NAVEGACION <-- ////
    const navigation = useNavigation();
    const dispatch = useDispatch();
    /* const response = useSelector((store) => store.responseTravel) */
    const data = props.route.params

    // console.log("esto me llega ", data)


    //Estados para las validaciones:

    // validacion Origen

    // const [isModalVisible20, setisModalVisible20] = useState(false);
    // const [chooseData20, setchooseData20] = useState();

    // const changeModalVisible20 = (bool) => {
    //     setisModalVisible20(bool);
    // };

    // const setData20 = (data) => {
    //     setchooseData20(data);
    // };

    // // validacion modelo

    // const [isModalVisible21, setisModalVisible21] = useState(false);
    // const [chooseData21, setchooseData21] = useState();

    // const changeModalVisible21 = (bool) => {
    //     setisModalVisible21(bool);
    // };

    // const setData21 = (data) => {
    //     setchooseData21(data);
    // };
    // // validacion color

    // const [isModalVisible22, setisModalVisible22] = useState(false);
    // const [chooseData22, setchooseData22] = useState();

    // const changeModalVisible22 = (bool) => {
    //     setisModalVisible22(bool);
    // };

    // const setData22 = (data) => {
    //     setchooseData22(data);
    // };

    // // validacion capacidad

    // const [isModalVisible23, setisModalVisible23] = useState(false);
    // const [chooseData23, setchooseData23] = useState();

    // const changeModalVisible23 = (bool) => {
    //     setisModalVisible23(bool);
    // };

    // const setData23 = (data) => {
    //     setchooseData23(data);
    // };

    // const sendMessage = (props) => {

    //     socket.emit('message', props, (resp) => {
    //         console.log(resp.status); // ok
    //         setResponse(resp.status);
    //     });
    // }

    /* console.log("ESTO ES EL SOCKET", socket) */
    let [response, setResponse] = useState(null);

    console.log('ESTA ES LA RESPUESTAAAAAAA', response)
    /// --> ESTO ES PARA ELIMINAR EL WARNING QUE SALE EN LA PANTALLA <-- ///
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             console.log('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         /* console.log(location.coords); */
    //     })();
    //     if(response) {
    //         navigation.navigate('ScreenWaiting', response)
    //         } 
    // }, [response]);

    // console.log("ESTO ES LA RESPUESTA DEL PEDIDO", response)


    const [origen, setOrigen] = useState({
        latitude: 0,
        longitude: 0,
        name: null,
    })

    const [destino, setDestino] = useState({
        latitude: 0,
        longitude: 0,
        name: null,
    })

    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState({
        price: 0,
    })



    const handleQuote = () => {
        // en un objeto pongo lo que tengo en el estado inicial
        let distance = getDistanciaMetros(origen, destino)
        setPrice({
            price: Math.round(10 * (weight * distance))
        })
    };

    // const handleSubmit = () => {
    //     const travel = {
    //         orig: `${origen.latitude}/${origen.longitude}/${origen.name}`,
    //         destination: `${destino.latitude}/${destino.longitude}/${destino.name}`,
    //         weight: parseFloat(weight),
    //         price: price.price,
    //         description: description,
    //         id: data,
    //         finishedTravel: 'earring',
    //     };

    //     //VALIDACIONES

    //             if (travel.orig === `0/0/null`) {
    //                 changeModalVisible20(true)
    //                 return
    //             }
        
    //             if (travel.destination === `0/0/null`) {
    //                 changeModalVisible21(true)
    //                 return
    //             }
        
    //             if (!travel.weight) {
    //                 changeModalVisible22(true)
    //                 return
    //             }
    //             if (travel.price === 0) {
    //                 changeModalVisible23(true)
    //                 return
    //             }
         
    //     sendMessage(travel)

    //     console.log("Estoy enviando:", travel)
    // }

    // if (origen.latitude > 0 && destino.latitude > 0) {
    //     let distance = getDistanciaMetros(origen, destino)
    //     let price = Math.round(10 * (weight * distance))
    //     return price
    // }
    //// --> Inicio de componente <-- ////
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={{marginTop:hp("-5%"),marginLeft:wp("0%"),marginBottom:hp("-3%")}}>
        <HeaderBar  screen={'null'} style={{color:"white"}}/>
        </View>
                <View style={{ alignItems: "center", }}>
                
                    <View style={styles.title}>
                        <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 0, color:'white', marginTop:hp("0.9%"), height:hp("7%")}}>
                            Agregar Viaje
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.containerInputs} >
                            <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: -1, marginTop:-6, textAlign: "center" }}>
                                Origen
                            </Text>
                            <ScrollView keyboardShouldPersistTaps={'handled'} style={{ flex: 1 }}>
                                <GooglePlacesAutocomplete
                                    placeholder='Selecciona un punto de origen'
                                    style={{backgroundColor:'red'}}
                                    fetchDetails={true}
                                    GooglePlacesSearchQuery={{
                                        rankby: "distance"
                                    }}
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        console.log(details.formatted_address);
                                        setOrigen({
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                            name: details.formatted_address,
                                        })
                                    }}
                                    query={{
                                        key: `${APIKEY_GOOGLE}`,
                                        language: 'en',
                                        components: "country:arg",
                                        types: "geocode",
                                        radius: 30000,
                                        location: `${origen.latitude}, ${origen.longitude}`
                                    }}
                                    textInputProps={{
                                        InputComp: Input,
                                        leftIcon: { type: 'font-awesome', name: 'chevron-right', color:"#ff1c49",marginLeft:wp("1%") },
                                        errorStyle: { color: 'red' },
                                        marginBottom:hp("-0.5%")
                                    }}
                                />
                            </ScrollView>
                            <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: -1, textAlign: "center", marginTop:hp("-2.5%") }}>
                                Destino
                            </Text>
                            <ScrollView keyboardShouldPersistTaps={'handled'} style={{ flex: 1 }}>
                                <GooglePlacesAutocomplete
                                    placeholder='Selecciona un punto de destino'
                                    fetchDetails={true}
                                    GooglePlacesSearchQuery={{
                                        rankby: "distance"
                                    }}
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        console.log(details.geometry.location.lat, details.geometry.location.lng);
                                        setDestino({
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                            name: details.formatted_address,
                                        })
                                    }}
                                    query={{
                                        key: `${APIKEY_GOOGLE}`,
                                        language: 'en',
                                        components: "country:arg",
                                        types: "geocode",
                                        radius: 30000,
                                        location: `${origen.latitude}, ${origen.longitude}`
                                    }}
                                    textInputProps={{
                                        InputComp: Input,
                                        leftIcon: { type: 'font-awesome', name: 'chevron-right', color: "#ff1c49", marginLeft:wp("1%")},
                                        errorStyle: { color: 'red' },
                                        marginBottom:hp("-0.5%")
                                    }}


                                />
                            </ScrollView>
                            <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: hp("1%"), marginTop: hp("-2.5%"), textAlign: "center", }}>
                                Peso
                            </Text>
                            <View style={styles.viewsInputs}>
                                <Icon name="push-outline" size={26} style={{marginTop:hp("1%"), color:"#ff1c49"}} />
                                <TextInput
                                    style={styles.textPlaceholder}
                                    placeholder="Carga en toneladas"
                                    placeholderTextColor="#8a9096"
                                    name="weight"                                    
                                    onChangeText={(text) => setWeight(text)}
                                />
                            </View>
                            <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: hp("1%"), textAlign: "center",marginTop:hp("-1.5%") }}>
                                Precio
                            </Text>
                            <View style={styles.viewsInputs}>
                                <Icon name="cash-outline" size={26} style={{marginTop:hp("1%"), color:"#ff1c49"}}/>
                                <Text
                                placeholder="Presiona Cotizar"
                                    style={styles.textPlaceholder}
                                >${price.price}</Text>
                            </View>
                            <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: hp("1%"), textAlign: "center" }}>
                                Descripción
                            </Text>
                            <View style={styles.viewsInputs}>
                                <Icon name="reader-outline" size={26} style={{marginTop:hp("1%"), color:"#ff1c49"}}/>
                                <TextInput
                                    style={styles.textPlaceholder2}
                                    placeholder="Agregar descripción adicional"
                                    placeholderTextColor="#8a9096"
                                    onChangeText={(text) => setDescription(text)}
                                    name="description"
                                    
                                />
                            </View>
                            <View style={styles.btn2}>
                                <TouchableOpacity style={styles.btnEditar} onPress={handleQuote}>
                                    <Text style={styles.textBtn}>Cotizar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnEditar} onPress={() => navigation.navigate("PersonalDataCarrier")}>
                                    <Text style={styles.textBtn}>Agregar</Text>
                                    {/* validaciones */}
                                    {/* <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible20}
                                        nRequestClose={() => changeModalVisible20(false)}
                                    >
                                        <SimpleModal20
                                            changeModalVisible20={changeModalVisible20}
                                            setData20={setData20}
                                        />
                                    </Modal>
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible21}
                                        nRequestClose={() => changeModalVisible21(false)}
                                    >
                                        <SimpleModal21
                                            changeModalVisible21={changeModalVisible21}
                                            setData21={setData21}
                                        />
                                    </Modal>
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible22}
                                        nRequestClose={() => changeModalVisible22(false)}
                                    >
                                        <SimpleModal22
                                            changeModalVisible22={changeModalVisible22}
                                            setData22={setData22}
                                        />
                                    </Modal>
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible23}
                                        nRequestClose={() => changeModalVisible23(false)}
                                    >
                                        <SimpleModal23
                                            changeModalVisible23={changeModalVisible23}
                                            setData23={setData23}
                                        />
                                    </Modal> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    title: {
        marginTop: hp("1%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // padding: 8,
        backgroundColor:"#ff1c49",
        width:wp("100%"),
        
    },
    iconBar: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: "space-between",
        backgroundColor: "white",
    },

    containerInputs: {
        flex: 1,
        textAlign: "center",

    },

    imgPerfil: {
        width: 170,
        height: 170,
        borderRadius: 100,
        borderColor: "#FFC107",
        borderWidth: 5,
        marginTop: 40,
    },
    imgAdd: {
        width: 50,
        height: 50,
        marginLeft: 135,
        marginTop: -70,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 50,
    },
    form: {
        borderColor: '#8a9096',
        width: wp("107%"),
        // borderWidth: 2,
        padding: 10,
    },
    viewsInputs: {
        marginTop: 2,
        borderColor: "#000",
        borderWidth: 1,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 380,
        alignItems: "flex-start",
        marginBottom: 15,
        padding: 8,
    },
    textPlaceholder: {
        marginLeft: wp("3%"),
        fontSize: 15,
        marginTop: hp("1.7%"),

    },
    textPlaceholder2: {
        marginLeft: wp("3%"),
        fontSize: 15,
        marginTop: hp("1.5%"),

    },
    btnEditar: {
        backgroundColor: "#ff1c49",
        borderRadius: 10,
        width: hp("22%"),
        height: 50,
        alignSelf: "center",
        marginTop: hp("0.7%"),
        marginRight: wp("15%"),
        shadowOpacity: 80,
        elevation: 16,
        marginLeft:wp("-2.5%")
    },

    textBtn: {
        color: "white",
        fontSize: 19,
        fontWeight:'bold',
        alignSelf: "center",
        marginTop: hp("2%"),
    },
    gif: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    btn2: { flexDirection: "row", marginLeft: 30 }
});

export default AddTravel;
