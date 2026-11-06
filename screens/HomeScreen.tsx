// bring in memory & the page holder
import { useState } from 'react';
import { View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in the button, the text block & the shared style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// this is the main page after a person logs in
export default function HomeScreen() {
  // get the tool that opens other pages
  const navigation = useNavigation<HomeNavigation>();
  // remember the sentence shown on the page
  const [message, setMessage] = useState('This is the home screen.');

  return (
    // use the shared light page style
    <View style={globalStyles.screen}>
      {/* show the current sentence */}
      <ThemedText>{message}</ThemedText>
      {/* button that changes the sentence */}
      <CustomButton
        title="Press me"
        onPress={() => setMessage('You pressed the button!')}
      />
      {/* button that opens the explore page */}
      <CustomButton title="Explore" onPress={() => navigation.navigate('Explore')} />
      {/* button that opens the manage page */}
      <CustomButton title="Manage profile" onPress={() => navigation.navigate('Manage')} />
    </View>
  );
}