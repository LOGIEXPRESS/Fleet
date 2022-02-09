import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
 import { WebView } from 'react-native-webview'
const FORM_ID = 'payment-form';

import { API_URLS } from "@env"

export default function Mercadopago() {
  const [link, setLink] = useState();
  const [render, setRender] = useState(null);

  const handleReset = () => {
    setLink("");
    setRender("");
  };
  const handlePago = () => {
    console.log("##### line 25 #######");
    axios
      .post(`${API_URLS}/api/mercadopago`, {
        title: "Viaje 2",
        unit_price: 2000,
        quantity: 1,
      })
      .then((res) => {
        console.log(res.data);
        setLink(res.data.init_points);
        setId(res.data.response);
      });
  };

  return (
    <View style={styles.container}>
      <Text>MercadoPago Fleet </Text>

      {link ? (
        <Text>
          {/*
        {  render
        ?<WebView source={{uri: link}}   style={{width:400, height:500}}/>
        :"Estamos procesando su pago..."
      } */}
          <WebView source={{ uri: link }} style={{ width: 400, height: 500 }} />
          {"\n"}
          <Button
            title="salir"
            onPress={handleReset}
            style={{ marginLeft: 300 }}
          />
        </Text>
      ) : (
        <Button title="Pagar" onPress={handlePago} />
      )}

      <Text
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          width: 400,
        }}
      />
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