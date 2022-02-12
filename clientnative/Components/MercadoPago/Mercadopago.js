import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
 import { WebView } from 'react-native-webview'
 import { useNavigation } from "@react-navigation/core";
const FORM_ID = 'payment-form';

import { API_URLS } from "@env"

export default function Mercadopago() {
  const [link, setLink] = useState();
  const [render, setRender] = useState(null);
  const navigation = useNavigation();

  
    
  const handleReset = () => {
    setLink("");
    setRender("");
    navigation.navigate('ViewFleet')
  };

  const handlePago = () => {
    console.log("##### line 25 #######");
    axios
      .post(`${API_URLS}/api/mercadopago`, {
        title: "MercadoPago Fleet",
        unit_price: 2000,
        quantity: 1,
      })
      .then((res) => {
        console.log(res.data);
        setLink(res.data.init_points);
        // setId(res.data.response);
      });
  };

  useEffect(() => {
    handlePago()
}, [])

  return (
    <View style={styles.container}>
      
      {link ? (
          
        <View style={{ flex: 1 }}>
            <Text>MercadoPago Fleet </Text>
          {/*
        {  render
        ?<WebView source={{uri: link}}   style={{width:400, height:500}}/>
        :"Estamos procesando su pago..."
      } */}
          <WebView source={{ uri: link }} style={{ width: 350, height: 350 }} />
          {/* {"\n"} */}
          <Button
            title="salir"
            onPress={handleReset}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});