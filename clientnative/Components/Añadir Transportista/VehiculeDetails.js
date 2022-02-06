import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"; import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import HeaderBar from "../Utils/HeaderBar.js";
import Icon from "react-native-vector-icons/Ionicons";



const DetallesVehicule = (props) => {

    const data = props.route.params;
    console.log("esto seria el vehiculo", data)

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <HeaderBar screen={'null'} />
                <Text style={styles.textDetalle}>Detalle del vehículo</Text>


                <Image source={require("../Utils/JOP.gif")} style={styles.img} />

                <View style={styles.viewAnterior}>
                    <Text style={styles.textAnterior}>VEHICULO REGISTRADO</Text>
                </View>
                <View style={styles.containerCards}>
                    <View style={styles.cards}>
                        {data === 'No tiene vehiculo registrado' ?
                            <View style={styles.loading}>
                                <Text style={styles.textLoading}>No tiene vehiculo registrado</Text>
                                <ActivityIndicator size={hp('8%')} color="#0000ff"  />
                            </View>

                            :
                            <View style={styles.insideCard}>
                                <View style={styles.viewUsers}>
                                    <Text>Marca: {data.brand}</Text>
                                    <Text>Modelo: {data.model}</Text>
                                    <Text>Patente: {data.patent}</Text>
                                    <Text>Capacidad: {data.capacity}</Text>
                                    <Text>Id del Vehiculo: {data.id.slice(25)}</Text>
                                </View>
                            </View>}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetallesVehicule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    loading:{
        padding: hp('7%'), 
        alignContent:'center', 
        alignSelf:'center' 
    },  
    textDetalle: {
        marginLeft: wp("4%"),
        fontSize: hp("2.5%"),
        fontWeight: "bold",
    },
    textLoading: {
        fontSize: hp("2.5%"),
        fontWeight: "bold",
        marginBottom: hp("4%")
    },
    btnEditar: {
        backgroundColor: "#511281",
        borderRadius: 10,
        width: wp("88%"),
        height: hp("7%"),
        marginTop: wp("10%"),
        alignSelf: "center",
        marginBottom: 20,
    },
    textBtn: {
        color: "white",
        fontSize: hp("2.25%"),
        alignSelf: "center",
        marginTop: 12,
        fontWeight: "bold",
    },
    img: {
        width: wp("100%"),
        height: hp("30%"),
        alignItems: 'center',
        marginTop: wp("8%"),
        padding: wp("3%"),
        borderRadius: hp('2%')
    },
    /*     viewDetail: {
            alignContent: 'center',
            alignItems: 'center',
            padding: wp("3%"),
            marginTop: wp("8%"),
            marginLeft: hp('5%'),
            backgroundColor: "#E8EAE6",
            height: hp('33%'),
            width: wp('65%'),
            borderRadius: hp('2%')
        }, */
    viewText: {
        flexDirection: "column",
        marginLeft: wp("5%"),
    },
    patent: {
        padding: wp("1%"),
        borderColor: "#9D9D9D",
        borderWidth: wp('0.75%'),
        borderRadius: wp("5%"),
        marginTop: wp("7%"),
    },
    textBrand: {
        fontWeight: "bold",
        fontSize: hp("2.40%"),
    },
    textPatent: {
        fontSize: hp("2%"),
        textAlign: "center",
        fontWeight: "bold",
    },
    viewAnterior: {
        padding: wp("2%"),
        backgroundColor: "#DDDDDD", //"#FFC107",
        width: wp("50%"),
        marginLeft: wp("25%"),
        marginTop: wp("1%"),
        marginBottom: wp("2.5%"),
        borderColor: "#ff1c49",
        borderWidth: wp('0.32%'),
        alignContent: 'center',
        alignItems: 'center'
    },
    textAnterior: {
        fontSize: hp("1.60%"),
        fontWeight: "bold",
    },
    containerCards: {
        flex: 1,
        width: wp("95%"),
        marginHorizontal: wp("2.5%"),
        marginTop: wp("1%"),
        paddingBottom: wp("2.75%"),
    },
    cards: {
        backgroundColor: "#F6F6F6",
        borderRadius: wp("3%"),
        shadowOpacity: 80,
        elevation: hp('0.3%'),

    },
    insideCard: {
        width: wp("91%"),
        padding: wp("4%"),

    },
    viewUsers: {
        padding: wp("2%"),
        backgroundColor: "#DDDDDD", //"#FFC107",
        marginTop: wp("1%"),
        marginBottom: wp("2.5"),
        borderColor: "#DDDDDD",
        width: wp('87%'),
        borderBottomWidth: wp("0.55%"),
        borderTopWidth: wp("0.55%"),
        alignContent: 'center',
        alignItems: 'center'
    },
});
