import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const OPTIONS = ['◉ Usuario', '◉ Transportista']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const ModalPicker = (props) =>{

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);
    }

    const option = OPTIONS.map((item, index) =>{    
        return(
            <TouchableOpacity
            style={styles.option}
            key={index}
            onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}

                </Text>
            </TouchableOpacity>
        )
    })
    return (
        <TouchableOpacity
        onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
            >
                <View style={[styles.modal, {width:WIDTH -20, height: HEIGHT/5}]}>
                    <ScrollView>
                        {option}
                    </ScrollView>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
container:{
    flex:1,
    alignSelf:'center',
    justifyContent:'center'
},
modal:{
    marginTop:150,
    backgroundColor:  "black",
    borderRadius: 10,
    borderWidth:3,
},
option:{
    alignItems: 'center',
    justifyContent:'center'


},
text:{
    margin:10,
    fontSize: 25,
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
    color: "#ff1c49",
    // textDecorationStyle: 'unset'
}
})

export {ModalPicker}