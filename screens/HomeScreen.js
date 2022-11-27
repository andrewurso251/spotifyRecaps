import React, {useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable } from "react-native";
import {ResponseType, useAuthRequest} from 'expo-auth-session';
import SpotifyWebAPI from 'spotify-web-api-js';


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
        redirectUri: "exp://10.127.235.72:19000",
    }, discovery);
    
    useEffect(() => {
        if(response?.type === "success") {
            const {access_token} = response.params;
            console.log('accessToken', access_token);

            getUserPlaylists(access_token);
            return () =>{access_token};
        }
    }, [response])

    const getUserPlaylists = async (accessToken) => {
        const sp = await getValidSPObj(accessToken);
        const {id: userId} = await sp.getMe();
        const {items: playlists} = await sp.getUserPlaylists(userId, {limit : 50});
        
        for (var i = 0; i < playlists.length; i++)
            console.log(playlists[1]);
        
    }
    
    const getValidSPObj = async (accessToken) => {
        
        
        var sp = new SpotifyWebAPI();
        await sp.setAccessToken(accessToken);
        return sp;
    }

    return (
        <View style = {styles.container}>
            
            <StatusBar style = "auto" />
      
            <TouchableOpacity style = {styles.loginButton} ><Text onPress={() => promptAsync()}style = {styles.text}>Play</Text></TouchableOpacity>
                
            
            <TouchableOpacity style = {styles.goButton} onPress={() => navigation.navigate("Recaps", {paramKey: promptAsync})}><Text style = {styles.text}>GO!</Text></TouchableOpacity>    
            
        
       
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#404040',
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
    text : {
        
        color : 'white',
        
    }
});