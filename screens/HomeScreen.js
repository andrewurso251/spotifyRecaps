import React, {useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable } from "react-native";
import {ResponseType, useAuthRequest} from 'expo-auth-session';
import SpotifyWebAPI from 'spotify-web-api-js';
import axios from 'axios';

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
            value = access_token;
            getRecentlyPlayed();
            getTopTracks();
            getTopArtists();
            console.log("ready");
        }
    }, [response])
    let value = "";
    
    

    let topArtists = [];
    let topArtistsPopularity = [];
    let topArtistsGenre = [];
    let topTracks = [];
    let topTracksAlbum = [];
    let topTracksPopularity = [];
    let recentlyPlayed = [];
    let recentlyPlayedAlbum = [];
    let recentlyPlayedPopularity = [];


    const getTopArtists = async () => {
        
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                Authorization: `Bearer ${value}`
            }
            

        })
        for (var i = 0; i < 10; i++)
        {
            topArtistsGenre[i] = data.items[i].genres;
            topArtistsPopularity[i] = data.items[0].popularity;
            topArtists[i] = data.items[0].name;
        }
        
        
    }

    const getTopTracks = async () => {
        
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
            headers: {
                Authorization: `Bearer ${value}`
            }
            


        })
        
        for (var i = 0; i < 10; i++)
        {
            topTracks[i] = data.items[i].name;
            topTracksAlbum[i] = data.items[1].album.name;
            topTracksPopularity[i] = data.items[1].popularity;
        }


        
        //data.items[1].name data.items[1].album.name data.items[1].popularity
    }

    const getRecentlyPlayed = async () => {
        
        const {data} = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
            headers: {
                Authorization: `Bearer ${value}`
            }
            

        })
        for (var i = 0; i < 50; i++)
        {
            recentlyPlayedPopularity[i] = data.items[i].track.popularity;
            recentlyPlayed[i] = data.items[i].track.name;
            recentlyPlayedAlbum[i] = data.items[i].track.album.name;

        }
        
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
                
            
            <TouchableOpacity style = {styles.goButton} onPress={() => navigation.navigate("Recaps", {top_tracks: topTracks, top_tracks_album: topTracksAlbum, top_tracks_popularity : topArtistsPopularity, top_artists : topArtists, top_artists_genre : topArtistsGenre, top_artists_popularity : topArtistsPopularity, recently_played : recentlyPlayed, recently_played_album : recentlyPlayedAlbum, recently_played_popularity : recentlyPlayedPopularity})}><Text style = {styles.text}>GO!</Text></TouchableOpacity>    
            
        
       
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