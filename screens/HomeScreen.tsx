// bring in memory & the page holder
import { useState } from 'react';
import { View } from 'react-native';
// bring in the button, the text block & the shared style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { globalStyles } from '../styles/globalStyles';

// this is the main page after a person opens the app
export default function HomeScreen() {
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
    </View>
  );
}