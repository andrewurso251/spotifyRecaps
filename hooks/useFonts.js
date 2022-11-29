import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    openSans: require('../assets/fonts/openSans.ttf')
   
  });