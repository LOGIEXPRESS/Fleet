import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../Utils/HeaderBar";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { addCarrier } from '../../Redux/actions/index.js'
import { useSelector, useDispatch } from "react-redux";
import { set } from "react-native-reanimated";



const NewCarrier = () => {


    const respAddCarrier = useSelector((store) => store.respAddCarrier)
    function checkEmail(eMail) {
        var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        var check = expReg.test(eMail)
        return check;
    }
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [eMail, setEMail] = useState('')


    useEffect(() => {
        if(respAddCarrier){
            if(respAddCarrier.mensaje === 'eMail usado'){
                alert('EMAIL YA REGISTRADO EN LA APP');
                setName('');
                setLastname('');
                setEMail('');
            }
        }
        
    
    }, [respAddCarrier]);
    
    
    

    const handleSubmit = () => {
        const data = {
            name: name,
            lastName: lastname,
            eMail: eMail,
        }
       const check = checkEmail(data.eMail)
        if(check) {
            dispatch(addCarrier(data))
            console.log(data)
        } else {
            alert('EL E-MAIL INGRESADO NO ES VALIDO')
        }
    }   
    

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderBar screen='null' />
                <View style={styles.containerHeaders}>
                    <Text style={{ fontSize: 20 }}>AÑADE TRANSPORSTISTAS A TU FLOTA</Text>
                    <Icon name="bus-outline" style={styles.icons} />
                </View>
                <View style={styles.viewAnterior}>
                    <Text style={styles.textAnterior}>TUS TRANSPORSTISTAS</Text>
                </View>
                <View style={styles.containerCards}>
                    <View style={styles.cards}>
                        <View style={styles.insideCard}>
                            <View style={styles.viewUsers}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={styles.textUsers}>Juan Carlos</Text>
                                        <Text style={styles.textUsers}>Juan_carlos@gmail.com</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon name="close-outline" style={styles.iconX} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.viewUsers}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={styles.textUsers}>Juan Carlos</Text>
                                        <Text style={styles.textUsers}>Juan_carlos@gmail.com</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon name="close-outline" style={styles.iconX} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.viewUsers}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={styles.textUsers}>Juan Carlos</Text>
                                        <Text style={styles.textUsers}>Juan_carlos@gmail.com</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon name="close-outline" style={styles.iconX} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.viewAnterior}>
                    <Text style={styles.textAnterior}>AÑADE UN NUEVO TRANSPORSTISTA</Text>
                </View>
                <View style={styles.containerCards}>
                    <View style={styles.cards} >
                        <View style={styles.insideCard}>
                            <View style={styles.viewsInputs}>
                                <Icon name="enter-outline" style={styles.icon_email} />
                                <TextInput
                                    name='name'
                                    placeholder="Nombre"
                                    style={styles.textPlaceholder}
                                    onChangeText={(e) => setName(e)}
                                />
                            </View>
                            <View style={styles.viewsInputs}>
                                <Icon name="enter-outline" style={styles.icon_email} />
                                <TextInput
                                    name='lastname'
                                    placeholder="Apellido"
                                    style={styles.textPlaceholder}
                                    onChangeText={(e) => setLastname(e)}
                                />
                            </View>
                            <View style={styles.viewsInputs}>
                                <Icon name="mail-outline" style={styles.icon_email} />
                                <TextInput
                                    name='e-mail'
                                    placeholder="Ingrese e-mail del transportista"
                                    style={styles.textPlaceholder}
                                    onChangeText={(e) => setEMail(e)}
                                />
                            </View>
                            <View>
                                <TouchableOpacity style={styles.Button} onPress={() => handleSubmit()}>
                                    <Text style={styles.btnText} >
                                        Agregar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


export default NewCarrier

const styles = StyleSheet.create({
    containerHeaders: {
        flex: 1,
        marginLeft: wp("5%"),
        paddingBottom: wp("2%"),
        flexDirection: 'row',
        marginTop: wp("5%")
    },
    icons: {
        fontSize: hp("3.5}%"),
        color: "#ff1a00",
        marginLeft: hp("1%"),
        marginTop: hp('-0.5%')
    },
    icon_email: {
        fontSize: hp("3%"),
        color: "#000",
        padding: hp('1%'),
        marginLeft: hp("1%"),
        marginTop: hp('-0.5%')
    },
    viewAnterior: {
        padding: wp("2%"),
        backgroundColor: "#DDDDDD", //"#FFC107",
        width: wp("95%"),
        marginLeft: wp("2%"),
        marginTop: wp("1%"),
        marginBottom: wp("2.5%"),
        borderColor: "#ff1c49",
        borderWidth: wp('0.32%')
    },
    textAnterior: {
        fontSize: hp("1.60%"),
        marginLeft: wp("2%"),
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
    textFinished: {
        color: "red",
        fontWeight: "bold",
    },
    price: {
        textAlign: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: hp("2%"),
    },
    viewUsers: {
        padding: wp("2%"),
        backgroundColor: "#DDDDDD", //"#FFC107",
        marginTop: wp("1%"),
        marginBottom: wp("2.5%"),
        borderColor: "#DDDDDD",
        width: wp('87%'),
        borderBottomWidth: wp("0.55%"),
        borderTopWidth: wp("0.55%"),
    },
    textUsers: {
        fontSize: hp("1.6%"),
        marginLeft: wp("2%"),
    },
    iconX: {
        fontSize: hp("4%"),
        color: "#000",
        marginLeft: hp("20%"),
        marginTop: hp('-0.1%')
    },
    viewsInputs: {
        flexDirection: 'row',
        padding: wp("2%"),
        backgroundColor: "#DDDDDD", //"#FFC107",
        marginTop: wp("1%"),
        marginBottom: wp("2.5%"),
        borderColor: "#DDDDDD",
        width: wp('87%'),
        height: hp('6.7%'),
        borderBottomWidth: wp("0.55%"),
        borderTopWidth: wp("0.55%"),
    },
    textPlaceholder: {
        fontSize: hp("1.8%"),
        marginLeft: wp("2%"),
    },
    Button: {
        width: wp('50%'),
        color: "black",
        height: hp('6%'),
        backgroundColor: "#ff1c49",
        borderRadius: hp('1%'),
        marginTop: hp("1%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 80,
        elevation: 15,
        marginLeft: hp('8%')
    },
    btnText: {
        fontSize: hp("2%"),
        marginLeft: wp("2%"),
        color: '#ffff'
    }
})