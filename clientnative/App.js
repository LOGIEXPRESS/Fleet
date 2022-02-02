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
const Stack = createStackNavigator();

const App = () => {
  
  return (
    <StripeProvider publishableKey="pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
       
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};
export default App;