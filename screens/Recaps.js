import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Recaps({ navigation, route}) {
    console.log(route.params.paramKey);
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