import React, {useEffect, useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable, Image, ImageBackground } from "react-native";
import {ResponseType, useAuthRequest} from 'expo-auth-session';
import SpotifyWebAPI from 'spotify-web-api-js';
import axios from 'axios';
import logoIMG from '../assets/text.png';
//import backgroundIMG from "../assets/bg.png";


export default function HomeScreen({navigation}) {
    const [myLoginText, setMyLoginText] = useState("Log in!");
    const [goButtonState, setGoButtonState] = useState(true);
    const [loginButtonState, setLoginButtonState] = useState(false);
    const [myGoText, setMyGoText] = useState("Please log in first!");
    const [topArtists, setTopArtists] = useState([]);
    const [topArtistsPopularity, setTopArtistsPopularity] = useState([]);
    const [topArtistsGenre, setTopArtistsGenre] = useState([]);
    const [recentlyPlayedPopularity, setRecentlyPlayedPopularity] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [recentlyPlayedAlbum, setRecentlyPlayedAlbum] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topTracksAlbum, setTopTracksAlbum] = useState([]);
    const [topTracksPopularity, setTopTracksPopularity] = useState([]);

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
            
            
            
            
            
        }
    }, [response])
    let value = "";
    var loginDisable = true;
    
    var loginText = "Login!";
    var goText = "Please login first!"
    

    
    
    
    
    
   


    const getTopArtists = async () => {
        
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                Authorization: `Bearer ${value}`
            }
            

        })
        for (var i = 0; i < 10; i++)
        {
            
            setTopArtists((topA) => [...topA, data.items[i].name]);
            setTopArtistsPopularity((topArtistsPop) => [...topArtistsPop, data.items[i].popularity]);
            setTopArtistsGenre((topArtistsG) => [...topArtistsG, data.items[i].genres]);
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
            setTopTracks((topT) => [...topT, data.items[i].name]);
            setTopTracksPopularity((topTracksPop) => [...topTracksPop, data.items[i].popularity]);
            setTopTracksAlbum((topTracksA) => [...topTracksA, data.items[i].album.name]);
            //topTracks.push(data.items[i].name);
            //topTracksAlbum.push(data.items[i].album.name);
            //topTracksPopularity.push(data.items[i].popularity);
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
            setRecentlyPlayedPopularity((recentlyPlayedPop) => [...recentlyPlayedPop, data.items[i].track.popularity]);
            setRecentlyPlayed((recentlyP) => [...recentlyP, data.items[i].track.name]);
            setRecentlyPlayedAlbum((recentlyPlayedA) => [...recentlyPlayedA, data.items[i].track.album.name]);
            //recentlyPlayed.push(data.items[i].track.name);
            //recentlyPlayedAlbum.push(data.items[i].track.album.name);
            
        }
        
        
    }
    
    
    const getValidSPObj = async (accessToken) => {
        
        
        var sp = new SpotifyWebAPI();
        await sp.setAccessToken(accessToken);
        return sp;
    }
    const go = () => {

        promptAsync();
        setMyLoginText("Logged in!");
        setGoButtonState(false);
        setMyGoText("Generate my Recap!");
        setLoginButtonState(true);
    }
    return (
        <View style = {styles.container}>
            
            <StatusBar style = "auto" />
            <Image source = {logoIMG}  style = {styles.logo} alt = "spotifyRecap"/>
            <TouchableOpacity  disabled = {loginButtonState}  style = {styles.loginButton}  onPress={() => go()}><Text style = {styles.text}>{myLoginText}</Text></TouchableOpacity>
                
            
                    <TouchableOpacity disabled = {goButtonState} style = {styles.goButton} onPress={() => navigation.navigate("Recaps", {top_tracks: {topTracks}, top_tracks_album: {topTracksAlbum}, top_tracks_popularity : {topTracksPopularity}, top_artists : {topArtists}, top_artists_genre : {topArtistsGenre}, top_artists_popularity : {topArtistsPopularity}, recently_played : {recentlyPlayed}, recently_played_album : {recentlyPlayedAlbum}, recently_played_popularity : {recentlyPlayedPopularity}})}><Text style = {styles.text}>{myGoText}</Text></TouchableOpacity>    
            
        
       
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
        width : 200,
        paddingTop : 20,
        paddingBottom : 20,
        borderRadius : 30        
    },
    logo : {
        alignItems: 'center',
        marginLeft: 20,
        height: 500,
        width: 500,
        marginTop : -200,
    },
    goButton : {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: "black",
        width : 200,
        paddingTop : 20,
        paddingBottom : 20,
        borderRadius : 30     
        
    },
    text : {
        
        color : 'white',
        
        fontSize: 18,
    }
});