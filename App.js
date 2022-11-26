import HomeScreen from "./screens/HomeScreen.js";
import Login from "./screens/Login";
import Recaps from "./screens/Recaps";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "home" component = {HomeScreen} headerStyle = {{backgroundColor : "#404040"}} options = {{headerShown : false}}/>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Recaps" component = {Recaps}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}