import { MP_PUBLIC_KEY } from "@env"
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

import * as MercadoPagoService from './getPreferenceId';



export default function App() {
    const [paymentResult, setPaymentResult] = useState(null);
    console.log("ESTO SERIA PAYMENTRESULT", paymentResult)
    const startCheckout = async () => {
        try {
            const preferenceId = await MercadoPagoService.getPreferenceId('payer@email.com', {
                title: 'Dummy Item Title',
                description: 'Dummy Item Description',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 10.0,
            });
            console.log("ESTO SERIA PREFERENCEID", preferenceId)
     
            const payment = await MercadoPagoCheckout.createPayment({
                publicKey: "TEST-140b6e09-8762-4af5-bf52-366da36d6543",
                preferenceId 
            });
            setPaymentResult(payment);
        } catch (err) {
            Alert.alert('Something went wrong', err.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={startCheckout}>
                <Text style={styles.text}>Start Payment</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 60,
        marginTop: 300
    }
})