import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Ionicons";
// prueba para las screens responsive
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const HeaderBar = (props) => {

    const navigation = useNavigation();
    const screen = props.screen
   // console.log("Esto es donde tengo que volver", props.screen)
    return (
        <View style={{ paddingHorizontal:  wp('3%'), flexDirection: "row",  paddingBottom: wp('4%'), marginTop: wp('10%')}}>
            <View style={{flex: 1, alignItems: "flex-start"}}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
                onPress={ screen === 'null' ? () => navigation.goBack() : () => navigation.navigate(`${screen}`)  }
                >
                <Icon name="arrow-back" size={27} style={{color:"#ff1c49"}}/>
                {/* <Text style={{marginLeft: 5, fontSize: 19, fontWeight: 'bold', marginBottom: 3}}>Volver</Text> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})
