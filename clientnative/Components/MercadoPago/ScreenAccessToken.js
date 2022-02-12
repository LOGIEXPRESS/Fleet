import React, { useState, useEffect, useReducer } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Alert,
    TextInput,
    TouchableOpacity,
    Modal
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
// HOOK PARA LA NAVEGACION
import { useNavigation } from "@react-navigation/core";
import HeaderBar from "../Utils/HeaderBar.js";
// prueba para las screens responsive
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { updateAccesToken, reset, requestCarrier } from "../../Redux/actions/index.js";
import ModalUpdate from "../MercadoPago/ModalUpdate.js";

const ScreenAccessToken = () => {
    ////--> HOOK PARA LA NAVEGACION <-- ////
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const carrier = useSelector((store) => store.userCarrier)
    const datosCarrier = useSelector((store) => store.responseLog)
    const resp = useSelector((store) => store.respUpdateAccessToken)
    const [accesToken, setAccessToken] = useState();
    const [modalAlert, setModalAlert] = useState(false);
    const [pass, setPass] = useState(true)




    useEffect(() => {
        const id = datosCarrier.id
        dispatch(requestCarrier(id))
    }, [dispatch])


    useEffect(() => {
        if (resp) {
            if (resp.msg === 'Token actualizado') {
                setModalAlert(true)
            }
        }
        return () => {
            dispatch(reset());
        }
    }, [resp])




    function handleSubmit() {
        const data = {
            id: datosCarrier.id,
            acesstoken: accesToken
        }
        dispatch(updateAccesToken(data))
    }

    console.log('ESTA SERIA LA RESPUESTA', resp)

    console.log("ESTOS SON LOS DATOS DEL CARRIER", carrier)

    console.log("Esto es accessKey", accesToken)

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginTop: hp("-1%"), marginLeft: wp("-2%"), }}>
                    <HeaderBar screen={'null'} />
                </View>
                <Text style={styles.textEditar}>Configura tu Mercadopago</Text>
                <View style={styles.containerInputs}>
                    <Text style={styles.textSubtitle}>Para poder recibir pagos en la aplicacion, sera necesario que nos brindes tu "Acces Token" de MercadoPago. </Text>
                    <Text style={styles.textSubtitle}>Ingresa tus credenciales aca:</Text>
                    <View style={styles.viewsInputs}>
                        <Icon name="key-outline" style={styles.icons} />
                        <TextInput
                            value={accesToken}
                            name="Access_token"
                            defaultValue={carrier ? carrier.carrier.acesstoken : accesToken}
                            style={styles.textPlaceholder}
                            onChangeText={(e) => setAccessToken(e)}
                            secureTextEntry={pass}
                        />
                        <TouchableOpacity onPress={() => setPass(!pass)}>
                            <Icon name="eye" style={styles.icons} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.btnEditar}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.textBtn}>Guardar</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.textSubtitle}>Aca tienes un pequeño tutorial de como conseguirla!</Text>
                        <Text style={styles.textTutorial}>1- Ingresar en el navegador https://www.mercadopago.com.ar</Text>
                        <Text style={styles.textTutorial}>2- Una vez allí, ir a la solapa superior donde está el nombre de usuario, y en desplegable ir a Mi Cuenta.</Text>
                        <Text style={styles.textTutorial}>3- Cuando ingresamos, ir hacia la izquierda y en la parte del medio buscar {">"} Tu negocio, desplegar e ir a Configuración y hacer click (Foto) </Text>
                        <Image source={require('../Utils/mercadopago-1.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>4- Luego de ingresar a Configuración deslizar hacia abajo hasta el pié hasta encontrar CREDENCIALES (foto) y dar click en {">"} Acceder.</Text>
                        <Image source={require('../Utils/mercadopago-2.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>5- Verificar la cuenta por cualquiera de los 3 medios.</Text>
                        <Image source={require('../Utils/mercadopago-3.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>6- Una vez listo, ingresas a Mis Credenciales.</Text>
                        <Text style={styles.textTutorial}>7- Hay dos tipos de Credenciales, Las de Prueba, que son para simular y testear las plataformas. y La de Producción que ahí tenemos que ir a ACTIVAR CREDENCIALES.</Text>
                        <Image source={require('../Utils/mercadopago-4.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>8- Una Vez allí dentro, completar la informacion que nos indica, seleccionar el tipo de categoría de negocio, autorizar terminos y condiciones y tildar el CAPTCHA.</Text>
                        <Image source={require('../Utils/mercadopago-5.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>9- Puedes decidir Completar ahora o mas tarde.</Text>
                        <Text style={styles.textTutorial}>10- Luego te piden verificar tu identidad mediante un código que envían a tu celular asociado a mercadopago.</Text>
                        <Image source={require('../Utils/mercadopago-6.jpg')} style={styles.img2} />
                        <Image source={require('../Utils/mercadopago-7.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>11- Ingresas el código enviado por SMS</Text>
                        <Image source={require('../Utils/mercadopago-8.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>12- Te aparece la pantalla verde clásica de mercadopago con el mensaje de Listo! Le das Click en Finalizar.</Text>
                        <Image source={require('../Utils/mercadopago-9.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial}>13- Vuelves a la pantalla de MIS CREDENCIALES, pero esta vez ya no está naranja las credenciales de producción y haciendo click allí podras ver las mismas.</Text>
                        <Image source={require('../Utils/mercadopago-10.jpg')} style={styles.img2} />
                        <Text style={styles.textTutorial2}>Listo copia y pega tu ACCESS KEY y pegala arriba para poder empezar a recibir pagos!</Text>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent
                    visible={modalAlert}
                >
                    <ModalUpdate
                        text={'Acces Token registrado exitosamente'}
                        setModal={setModalAlert}
                    />
                </Modal>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        marginLeft: hp('8%'),
        width: wp('50%'),
        height: hp('40%'),
    },
    img2: {
        width: null,
        resizeMode: 'contain',
        height: hp('30%')
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white',
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
    },
    textEditar: {
        fontSize: hp("4%"),
        fontWeight: "bold",
        // paddingHorizontal: wp("3%"),
        alignSelf: 'center',
        marginTop: hp("2%"),
    },
    textSubtitle: {
        fontSize: hp("2.5%"),
        fontWeight: "600",
        // paddingHorizontal: wp("3%"),
        alignSelf: 'flex-start',
        marginBottom: hp('2%')
    },
    textTutorial: {
        fontSize: hp("2.3%"),
        // paddingHorizontal: wp("3%"),
        alignSelf: 'flex-start',
    },
    textTutorial2: {
        fontSize: hp("2.3%"),
        // paddingHorizontal: wp("3%"),
        alignSelf: 'flex-start',
        marginBottom: hp('4%')
    },
    containerInputs: {
        marginTop: hp('8%'),
        alignContent: 'center',
        alignItems: 'center',
    },
    viewsInputs: {
        padding: wp('2.7%'),
        backgroundColor: "#E8EAE6",
        borderRadius: wp('3%'),
        flexDirection: "row",
        width: wp('92%'),
        marginBottom: wp('4.8%'),
    },
    textPlaceholder: {
        flex: 1,
        marginLeft: 20,
        fontSize: hp('2.2%'),
        marginBottom: wp('0.25%'),
    },
    icons: {
        fontSize: hp('3.3%'),
        color: "#ff1c49",
        marginRight: hp('1%')
    },
    btnEditar: {
        backgroundColor: "#ff1c49",
        borderRadius: wp('3%'),
        width: wp('30%'),
        height: hp('5%'),
        marginBottom: hp('2%'),
    },
    textBtn: {
        color: "white",
        fontSize: hp('2%'),
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: wp('2%')
    },
    btn2: {
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: hp('8%'),
        width: wp('90%'),
        marginBottom: hp('10%')
    },
});

export default ScreenAccessToken;
