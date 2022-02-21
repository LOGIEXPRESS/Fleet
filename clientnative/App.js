import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { store } from "./Redux/store/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Home/Login";
import SingUp from "./Components/Home/SingUp";
import ProfileCarrier from "./Components/Profile/ProfileCarrier";
import ProfileAdmin from "./Components/Profile/ProfileAdmin";
import ViewFleet from "./Components/Historial de viaje/ViewFleet"
import NewCarrier from "./Components/Añadir Transportista/NewCarrier.js";
import { LogBox } from 'react-native';
import CompleteProfileCarrier from "./Components/Profile/CompleteProfileCarrier";
import AddTravel from "./Components/Travel/AddTravel";
import PersonalDataCarrier from "./Components/Profile/PersonalData/PersonalDataCarrier";
import PersonalDataAdmin from "./Components/Profile/PersonalData/PersonalDataAdmin";
import QuotTravel from "./Components/Travel/QuotTravel";
import ChangePassword from "./Components/Profile/Edit/ChangePassword";
import EditProfileCarrier from './Components/Profile/Edit/EditProfileCarrier';
import EditVehicule from './Components/Profile/Edit/EditVehicule';
import Home from './Components/Home/Home';
import startCheckout from './Components/MercadoPago/startCheckout.js'
import VehiculeDetails from './Components/Añadir Transportista/VehiculeDetails.js'
import RecoverPassword from './Components/Home/RecoverPassword'
import ScreenMap from "./Components/ViewMaps/ScreenMap";
import Mercadopago from "./Components/MercadoPago/Mercadopago";
import StartCarrier from './Components/Travel/StartCarrier';
import ScreenAccessToken from './Components/MercadoPago/ScreenAccessToken.js'
import HistoryCarrier from "./Components/Historial de viaje/HistoryCarrier"
import Chat from "./Components/Chat/Chat"
import MapTravel from './Components/ViewMaps/MapTravel'
import AdmTravelOn from './Components/Historial de viaje/AdmTravelOn.js'
import TravelOn from "./Components/Historial de viaje/TravelOn.js"
import AdmHistoryCarrier from "./Components/Historial de viaje/AdmHistoryCarrier.js"

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

const App = () => {

  return (
    <StripeProvider publishableKey="pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="SingUp"
              component={SingUp}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="ProfileAdmin"
              component={ProfileAdmin}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="ProfileCarrier"
              component={ProfileCarrier}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="ScreenMap"
              component={ScreenMap}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="MapTravel"
              component={MapTravel}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="startCheckout"
              component={startCheckout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewFleet"
              component={ViewFleet}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewCarrier"
              component={NewCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CompleteProfileCarrier"
              component={CompleteProfileCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTravel"
              component={AddTravel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PersonalDataCarrier"
              component={PersonalDataCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PersonalDataAdmin"
              component={PersonalDataAdmin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuotTravel"
              component={QuotTravel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditVehicule"
              component={EditVehicule}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfileCarrier"
              component={EditProfileCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VehiculeDetails"
              component={VehiculeDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StartCarrier"
              component={StartCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecoverPassword"
              component={RecoverPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ScreenAccessToken"
              component={ScreenAccessToken}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Mercadopago"
              component={Mercadopago}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistoryCarrier"
              component={HistoryCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TravelOn"
              component={TravelOn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdmTravelOn"
              component={AdmTravelOn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdmHistoryCarrier"
              component={AdmHistoryCarrier}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};
export default App;