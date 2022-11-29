import HomeScreen from "./screens/HomeScreen.js";
import Login from "./screens/Login";
import Recaps from "./screens/Recaps";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useFonts from './hooks/useFonts';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
const Stack = createNativeStackNavigator();


export default function App() {
  
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "home" component = {HomeScreen} headerStyle = {{backgroundColor : "#404040"}} options = {{headerShown : false}}/>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Recaps" component = {Recaps} options = {{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}