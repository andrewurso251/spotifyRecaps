import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, {useEffect, useState} from 'react';
import * as Font from 'expo-font';


export default function Recaps({ navigation, route}) {
    let topTracks = route.params.top_tracks.topTracks;
    let topTracksPopularity = route.params.top_tracks_popularity.topTracksPopularity;
    let topTracksAlbum = route.params.top_tracks_album.topTracksAlbum;
    let topArtists = route.params.top_artists.topArtists;
    let topArtistsPopularity = route.params.top_artists_popularity.topArtistsPopularity;
    let topArtistsGenre = route.params.top_artists_genre.topArtistsGenre;
    let recentlyPlayed = route.params.recently_played.recentlyPlayed;
    let recentlyPlayedAlbum = route.params.recently_played_album.recentlyPlayedAlbum;
    let recentlyPlayedPopularity = route.params.recently_played_popularity.recentlyPlayedPopularity.recentlyPlayedPopularity;
    
    
    // variables holding the facts that will be displayed
    const [factOne, setFactOne] = useState("Loading!");
    const [factTwo, setFactTwo] = useState("Loading!");
    const [factThree, setFactThree] = useState("Loading!");
    const [factFour, setFactFour] = useState("Loading!");
    const [factFive, setFactFive] = useState("Loading!");
   
    
    
    // gets five random facts using the data passed through from the previous screen
    const getFacts = () => {// 15 choose five 3003 unique combos!
        var used = [];
        for (var i = 0; i < 5; i++)
        {
            var choice = Math.floor(Math.random() * 16);
            var message = "";
            

            if (choice == 0 && used.includes(0) == false)
            {
                message = message + "Your #1 song is: ";
                message = message + route.params.top_tracks.topTracks[0];
                message = message + " !";
                used.push(choice);
            }
            else if (choice == 1 && used.includes(1) == false)
            {
                message = message +  "Your least favorite top song is: "
                message = message +  route.params.top_tracks.topTracks[9];
                message = message +  " !";
                used.push(choice);
            }  
            else if (choice == 2 && used.includes(2) == false)
            {
                message = message +  "Pretty average... \nYour fifth favorite song is: "
                message = message +  route.params.top_tracks.topTracks[4];
                message = message +  " .";
                used.push(choice);
            }
            else if (choice == 3 && used.includes(3) == false)
            {
                message = message +  "Runner up! Your #2 favorite song is: "
                message = message +  route.params.top_tracks.topTracks[2];
                message = message +  " !";
                used.push(choice);
            }
            else if (choice == 4 && used.includes(4) == false)
            {
                var kanye = "";
                var rKelly = "";
                var theSmiths = "";
                var numFlags = 0;

                for (var j = 0; j < 9; j++)
                {

                    if (route.params.top_artists.topArtists[j] == "Kanye West")
                    {
                        kanye = "Kanye West";
                        numFlags++;
                    }
                    
                    if (route.params.top_artists.topArtists[j] == "The Smiths")
                    {
                        theSmiths = "The Smiths";
                        numFlags++;
                    }
                    if (route.params.top_artists.topArtists[j] == "R. Kelly")
                    {    
                        rKelly = "R. Kelly";
                        numFlags++;
                    }
                    
                }
                if (numFlags == 0)
                {
                    message = message +  "Vibe check passed! None of your favorite artists are red flags!";
                    message = message + "";
                    message = message +  "";
                }
                if (numFlags == 1)
                {
                    message = message + "Red flag! You've been caught listening to ";
                    message = message +  kanye;
                    message = message +  "! \nYou should really think about this...";
                }
                if (numFlags == 2)
                {
                    message = message + "Red flag! You've been caught listening to ";
                    message = message +  " and " + rKelly + theSmiths;
                    message = message +  "! \nYou should really think about this...";
                }
                if (numFlags == 3)
                {
                    message = message +  "Red flag! You've been caught listening to ";
                    message = message +  kanye + ", " + rKelly + ", and " + theSmiths;
                    message = message +  "! \nYou should really think about this...";
                }
                used.push(choice);
            }
            else if (choice == 5 && used.includes(5) == false)
            {
                message = message +  "Deep Cut! Your least popular favorite song is: ";
                
                var max = 101;
                var minIndex = 0;
                var nums = [];

                for (var j = 0; j < 9; j++)
                {
                    nums[j] = parseInt(route.params.top_tracks_popularity.topTracksPopularity[j], 10);
                    if (nums[j] < max)
                    {
                        minIndex = j;
                        max = nums[j];
                    }
                }


                message = message +  route.params.top_tracks.topTracks[minIndex];
                message = message +  "!";
                used.push(choice);
            }
            else if (choice == 6 && used.includes(6) == false)
            {
                message = message +  "Your most popular favorite played song is: ";
                
                var min = -1;
                var maxIndex = 0;
                var nums = [];

                for (var j = 0; j < 49; j++)
                {
                    nums[j] = route.params.recently_played_popularity.recentlyPlayedPopularity[j];
                    if (nums[j] > min)
                    {
                        maxIndex = j;
                        min = nums[j];
                    }
                }


                message = message +  route.params.top_tracks.topTracks[maxIndex];
                message = message + "!";
                used.push(choice);
            }
            else if (choice == 7 && used.includes(7) == false)
            {
                message = message +  "Your most popular recently played song is: ";
                
                var min = -1;
                var maxIndex = 0;
                var nums = [];

                for (var j = 0; j < 9; j++)
                {
                    nums[j] = parseInt(route.params.recently_played_popularity.recentlyPlayedPopularity[j], 10);
                    if (nums[j] > min)
                    {
                        maxIndex = j;
                        min = nums[j];
                    }
                }


                message = message +  route.params.recently_played.recentlyPlayed[maxIndex];
                message = message +  "!";
                used.push(choice);
            }
            else if (choice == 8 && used.includes(8) == false)
            {
                message = message + "Deep Cut! Your least popular recently played song is: ";
                
                var max = 101;
                var minIndex = 0;
                var nums = [];

                for (var j = 0; j < 49; j++)
                {
                    nums[j] = parseInt(route.params.recently_played_popularity.recentlyPlayedPopularity[j], 10);
                    if (nums[j] < max)
                    {
                        minIndex = j;
                        max = nums[j];
                    }
                }


                message = message +  route.params.recently_played.recentlyPlayed[minIndex];
                message = message +  "!";
                used.push(choice);
            }
            else if (choice == 9 && used.includes(9) == false)
            {
                message = message + "Just made the cut! Your 3rd most listened to song is: ";
                message = message + route.params.top_tracks.topTracks[2];
                message = message + "!";
                used.push(choice);
                
                
            }
            else if (choice == 10 && used.includes(10) == false)
            {
                message = message + "#1 Fan! Your favorite artist is: ";
                message = message + route.params.top_artists.topArtists[0];
                message = message + "!";
                used.push(choice);
                
            }
            else if (choice == 11 && used.includes(11) == false)
            {
                message = message + "2nd Place! ";
                message = message + route.params.top_artists.topArtists[1];
                message = message + "  is your second most listened to artist";
                
                used.push(choice);
            }
            else if (choice == 12 && used.includes(12) == false)
            {
                message = message + "Runner up! "
                message = message + route.params.top_artists.topArtists[2];
                message = message + "is your third most listened to artist ";
                used.push(choice);
                
            }
            
            else if (choice == 13 && used.includes(13) == false)
            {
                message = message + "You were just listening to: "
                message = message + route.params.recently_played.recentlyPlayed[0];
                message = message + "!";
                used.push(choice);
            }
            else if (choice == 14 && used.includes(14) == false)
            {
                message = message + "Some albums you may be listening to: "
                message = message + route.params.top_tracks_album.topTracksAlbum[0] + ", " + route.params.top_tracks_album.topTracksAlbum[3] + ", and " + route.params.top_tracks_album.topTracksAlbum[6];
                message = message + "!";
                used.push(choice);
            }
            else if (choice == 15 && used.includes(15) == false)
            {
                message = message + "Earlier you were listening to: "
                message = message + route.params.recently_played.recentlyPlayed[33] + ", " + route.params.recently_played.recentlyPlayed[12] + ", and " + route.params.recently_played.recentlyPlayed[20];
                message = message + "!";
                used.push(choice);
            }

            if (message == "")
            {
                i--;
                continue;
            }
            if (i == 0)
                setFactOne(message);
            else if (i == 1)
                setFactTwo(message);
            else if (i == 2)
                setFactThree(message);
            else if (i == 3)
            {
                setFactFour(message);
                console.log(message);
            }
            else if (i == 4)
                setFactFive(message);
                
            message = "";
            
        }
        
        
        
    }
    useEffect(() => {
        // gets facts on screen load
        getFacts();
        console.log(factOne, factTwo, factThree, factFour, factFive);
        console.log(factFour);
    }, [])

    return (
        <View style={styles.container}>
      <ScrollView>
    

      <View style={styles.banner}>
        
        <Text style={styles.bannerText}>Here's Your Recap!</Text>
      </View>
      <View style={styles.one}>
        
        <Text style={styles.text}>{factOne}</Text>
      </View>
      <View style={styles.space}>
        
      </View>
      <View style={styles.two}>
        
        <Text style={styles.text}>{factTwo}</Text>
      </View>
      <View style={styles.space}>
        
        </View>
      <View style={styles.three}>
        
        <Text style={styles.text}>{factThree}</Text>
      </View>
      <View style={styles.space}>
        
        </View>
      <View style={styles.four}>
        
        <Text style={styles.text2}>{factFour}</Text>
      </View>
      <View style={styles.space}>
        
        </View>
      <View style={styles.five}>
        
        <Text style={styles.text2}>{factFive}</Text>
      </View>
      
      </ScrollView>
      <StatusBar style="auto" />
      
    </View>
    
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    banner:{
        flex:1,
        marginTop:30,
        backgroundColor: '#000000',
        paddingTop : 10,
        paddingBottom : 10,
        borderRadius : 40,

    },
    bannerText : {
      fontSize : 30,
      color:'white',
      textAlign : 'center',
      textShadowColor:'white',
      
      
    },
    text: {
      fontSize : 20,
      color:'white',
      textAlign : 'center',
      textShadowColor:'white',
      
      
    },
    text2: {
      color:'white',
      
      textShadowColor:'grey',
      fontSize: 20,
      textAlign: 'center'
    },
    header: {
      position: 'relative',
      backgroundColor: 'red',
      padding:20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     // minHeight: 400,
     // padding:100,
  
    },
    one: {
      backgroundColor: '#4ac776',
      position: 'relative',
      padding:20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:5,
      borderColor:'grey',
      marginTop:30,
      paddingBottom : 30,
    },
    two: {
      backgroundColor: '#33c065',
      position: 'relative',
      padding:20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:5,
      borderColor:'grey',
      marginTop : 20,
      paddingBottom : 30,
    },
    three: {
      backgroundColor: '#1db954',
      position: 'relative',
      padding:20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:5,
      borderColor:'grey',
      marginTop : 20,
      paddingBottom : 30,
    },
    four: {
      backgroundColor: '#1aa64b',
      position: 'relative',
      padding:20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:5,
      borderColor:'grey',
      marginTop : 20,
      paddingBottom : 30,
    },
    five: {
      backgroundColor: '#338333',
      position: 'relative',
      padding:20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:5,
      borderColor:'grey',
      marginTop : 20,
      paddingBottom : 30,
    },
    space:{
      padding:5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background : {
      width: '100%',
      height: '100%'
    },  
  });