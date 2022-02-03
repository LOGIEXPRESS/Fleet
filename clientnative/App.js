import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { store } from "./Redux/store/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Home/Login";
import SingUp from "./Components/Home/SingUp";
import ProfileCarrier from "./Components/Profile/ProfileCarrier";
<<<<<<< HEAD
import ProfileAdmin from "./Components/Profile/ProfileAdmin";
import ViewFleet from "./Components/Historial de viaje/ViewFleet"
import NewCarrier from "./Components/Añadir Transportista/NewCarrier.js";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

=======
import ProfileAdmin from  "./Components/Profile/ProfileAdmin";
import CompleteProfileCarrier from  "./Components/Profile/CompleteProfileCarrier";
import AddTravel from  "./Components/Travel/AddTravel";
import PersonalDataCarrier from "./Components/Profile/PersonalData/PersonalDataCarrier";
import PersonalDataAdmin from "./Components/Profile/PersonalData/PersonalDataAdmin";
>>>>>>> 978034adde94d639e602c5e950d50494d615f312


const Stack = createStackNavigator();




const App = () => {

  return (
    <StripeProvider publishableKey="pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>

        {/*     <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SingUp"
              component={SingUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileAdmin"
              component={ProfileAdmin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileCarrier"
              component={ProfileCarrier}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="ViewFleet"
              component={ViewFleet}
              options={{ headerShown: false }}
            />
        {/*       <Stack.Screen
              name="NewCarrier"
              component={NewCarrier}
              options={{ headerShown: false }}
            /> */}
      {/*       <Stack.Screen
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
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};
export default App;