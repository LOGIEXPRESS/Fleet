import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { store } from "./store/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Home/Login";
import SingUp from "./Components/Home/SingUp";
import ProfileCarrier from "./Components/Profile/ProfileCarrier";
import ProfileAdmin from  "./Components/Profile/ProfileAdmin";
import CompleteProfileCarrier from  "./Components/Profile/CompleteProfileCarrier";
import AddTravel from  "./Components/Travel/AddTravel";
import PersonalDataCarrier from "./Components/Profile/PersonalData/PersonalDataCarrier";
import PersonalDataAdmin from "./Components/Profile/PersonalData/PersonalDataAdmin";
import QuotTravel from "./Components/Travel/QuotTravel";
import ChangePassword from "./Components/Profile/Edit/ChangePassword";
import EditProfileCarrier from './Components/Profile/Edit/EditProfileCarrier';
import EditVehicule from './Components/Profile/Edit/EditVehicule';
import Home from './Components/Home/Home';

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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};
export default App;