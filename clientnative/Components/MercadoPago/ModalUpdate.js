import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";

const ModalUpdate = (props) => {
    

    const navigation = useNavigation();
    const closeModal = () => {
        props.setModal(false);
        navigation.navigate('Login')
    };

    return (

        <View style={styles.containerModal}>
            <View style={styles.alertModal}>
                <View style={styles.textModal}>
                    <Icon name="checkmark-circle" style={styles.icon_modal} />
                    <Text style={styles.text}>{props.text}</Text>
                    <TouchableOpacity style={styles.btnModal} >
                        <Text style={styles.btnText} onPress={() => closeModal()}  >
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>



    );
};

export default ModalUpdate;

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'

    },
    viewModal: {
        height: hp('30%'),
        width: wp('70%'),
        backgroundColor: '#fff'
    },
    alertModal: {
        height: hp('22%'),
        width: wp('70%'),
        backgroundColor: '#fff'
    },
    textModal: {
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: hp('4%')
    },
    icon_modal: {
        fontSize: hp("5%"),
        color: "#1DD135",
    },
    btnModal: {
        width: wp('20%'),
        color: "black",
        margin: hp('1%'),
        height: hp('4%'),
        backgroundColor: "#ff1c49",
        borderRadius: hp('1%'),
        marginTop: hp("3%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 50,
        elevation: 10,
    },
    btnText: {
        fontSize: hp("2%"),
        color: '#ffff'
    },
    text: {
        fontSize: hp("2%"), 
    }
});
