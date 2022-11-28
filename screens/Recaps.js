import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Recaps({ navigation, route}) {
    let topTracks = route.params.top_tracks;
    let topTracksPopularity = route.params.top_tracks_popularity;
    let topTracksAlbum = route.params.top_tracks_album;
    let topArtists = route.params.top_artists;
    let topArtistsPopularity = route.params.top_artists_popularity;
    let topArtistsGenre = route.params.top_artists_genre;
    let recentlyPlayed = route.params.recently_played;
    let recentlyPlayedAlbum = route.params.recently_played_album;
    let recentlyPlayedPopularity = route.params.recently_played_popularity;
    
    let factBeginningText = [];
    let factData = [];
    let factEndingText = [];

    const getFacts = () => {// 20 choose five 15,504 unique combos!
        for (var i = 0; i < 5; i++)
        {
            var choice = 0;

            if (choice == 0)
            {
                factBeginningText[i] = "Your #1 song is "
                factData[i] = topTracks[0];
                factEndingText[i] = " !";
            }
            else if (choice == 1)
            {
                factBeginningText[i] = "Your least favorite top song is "
                factData[i] = topTracks[9];
                factEndingText[i] = " !";
            }  
            else if (choice == 2)
            {
                factBeginningText[i] = "Pretty average... \nYour fifth favorite song is "
                factData[i] = topTracks[4];
                factEndingText[i] = " .";
            }
            else if (choice == 3)
            {
                factBeginningText[i] = "Pretty average... \nYour fifth favorite song is "
                factData[i] = topTracks[4];
                factEndingText[i] = " .";
            }
            else if (choice == 4)
            {
                var kanye = "";
                var rKelly = "";
                var theSmiths = "";
                factData[i] = "";
                var numFlags = 0;

                for (var j = 0; j < 9; j++)
                {

                    if (topArtists[j] == "Kanye West")
                    {
                        kanye = "Kanye West";
                        numFlags++;
                    }
                    
                    if (topArtists[j] == "The Smiths")
                    {
                        theSmiths = "The Smiths";
                        numFlags++;
                    }
                    if (topArtists[j] == "R. Kelly")
                    {    
                        rKelly = "R. Kelly";
                        numFlags++;
                    }
                }
                if (numFlags == 0)
                {
                    factBeginningText[i] = "Vibe check passed! None of your favorite artists are red flags!";
                    factData[i] = "";
                    factEndingText = "";
                }
                if (numFlags == 1)
                {
                    factBeginningText[i] = "Red flag! You've been caught listening to ";
                    factData[i] = kanye;
                    factEndingText[i] = "! \nYou should really think about this...";
                }
                if (numFlags == 2)
                {
                    factBeginningText[i] = "Red flag! You've been caught listening to ";
                    factData[i] = kanye + " and " + rKelly + theSmiths;
                    factEndingText[i] = "! \nYou should really think about this...";
                }
                if (numFlags == 3)
                {
                    factBeginningText[i] = "Red flag! You've been caught listening to ";
                    factData[i] = kanye + ", " + rKelly + ", and " + theSmiths;
                    factEndingText[i] = "! \nYou should really think about this...";
                }

            }
            else if (choice == 5)
            {
                factBeginningText[i] = "Deep Cut! Your least popular favorite song is: ";
                
                var max = 101;
                var minIndex = 0;
                var nums = [];

                for (var j = 0; j < 9; j++)
                {
                    nums[j] = parseInt(topTracksPopularity[j], 10);
                    if (nums[j] < max)
                    {
                        minIndex = j;
                        max = nums[j];
                    }
                }


                factData[i] = topTracks[j];
                factEndingText[i] = "!";
            }
            else if (choice == 6)
            {
                factBeginningText[i] = "Your most popular favorite played song is: ";
                
                var min = -1;
                var maxIndex = 0;
                var nums = [];

                for (var j = 0; j < 49; j++)
                {
                    nums[j] = parseInt(recentlyPlayedPopularity[j], 10);
                    if (nums[j] > min)
                    {
                        maxIndex = j;
                        min = nums[j];
                    }
                }


                factData[i] = topTracks[j];
                factEndingText[i] = "!";
            }
            else if (choice == 7)
            {
                factBeginningText[i] = "Your most popular recently played song is: ";
                
                var min = -1;
                var maxIndex = 0;
                var nums = [];

                for (var j = 0; j < 9; j++)
                {
                    nums[j] = parseInt(recentlyPlayedPopularity[j], 10);
                    if (nums[j] > min)
                    {
                        maxIndex = j;
                        min = nums[j];
                    }
                }


                factData[i] = recentlyPlayed[j];
                factEndingText[i] = "!";
            }
            else if (choice == 8)
            {
                factBeginningText[i] = "Deep Cut! Your least popular recently played song is: ";
                
                var max = 101;
                var minIndex = 0;
                var nums = [];

                for (var j = 0; j < 49; j++)
                {
                    nums[j] = parseInt(recentlyPlayedPopularity[j], 10);
                    if (nums[j] < max)
                    {
                        minIndex = j;
                        max = nums[j];
                    }
                }


                factData[i] = recentlyPlayedTracks[j];
                factEndingText[i] = "!";
            }
            
        }
        
        
        
    }


    return (
        <View style = {styles.container}>
            <Text>Go Screen</Text>
            <StatusBar style = "auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});