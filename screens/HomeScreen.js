import React, {useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable, Image, ImageBackground } from "react-native";
import {ResponseType, useAuthRequest} from 'expo-auth-session';
import logoIMG from '../assets/text.png';
import backgroundIMG from "../assets/bg.png";


export default function HomeScreen({navigation}) {
    const discovery = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint : "https://accounts.spotify.com/api/token",
    };
    
    const [request, response, promptAsync] = useAuthRequest({
        responseType : ResponseType.Token,
        clientId: "6502e57166614919aa7201a212331444",
        clientSecret : "7cf20c220dfb4476b2132a0a2fdaa683",
        scopes: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "streaming",
            "user-read-email",
            "user-read-private",
        ],
        usePKCE: false,
        redirectUri: "exp://192.168.0.37:19000",
    }, discovery);
    
    useEffect(() => {
        if(response?.type === "success") {
            const {access_token} = response.params;
            console.log('accessToken', access_token);
        }
    }, [response])
    
    return (
        <ImageBackground source = {backgroundIMG} style = {styles.background}>
        <View style = {styles.container}>

            
            <StatusBar style = "auto" />

            <Image source = {logoIMG}  style = {styles.logo} alt = "spotifyRecap"/>
      
            <TouchableOpacity style = {styles.loginButton} ><Text onPress={() => promptAsync()}style = {styles.text}>Play</Text></TouchableOpacity>
                
            
            <TouchableOpacity style = {styles.goButton} onPress={() => navigation.navigate("Recaps")}><Text style = {styles.text}>GO!</Text></TouchableOpacity>    
            
        

        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        //backgroundColor: '#404040',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    loginButton : {
        alignItems: 'center',
        backgroundColor: "#1DB954",
        width : 100,
        paddingTop : 5,
        paddingBottom : 5,
        borderRadius : 20        
    },
    goButton : {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: "black",
        width : 100,
        paddingTop : 5,
        paddingBottom : 5,
        borderRadius : 20 
        
    },

    logo : {
        alignItems: 'center',
        marginLeft: 20,
        height: 500,
        width: 500,
        marginTop : -200,
    },
    background : {
        width: '100%',
        height: '100%'
    },
    text : {
        
        color : 'white',
        
    }
});