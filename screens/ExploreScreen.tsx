// bring in memory & the page holder
import { useState } from 'react';
import { View } from 'react-native';
// bring in the button, the text block & the shared style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { globalStyles } from '../styles/globalStyles';

// this page is where a person looks for updates
export default function ExploreScreen() {
  // remember the update sentence
  const [note, setNote] = useState('Nothing new yet.');

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the page name */}
      <ThemedText>Explore</ThemedText>
      {/* show the current update */}
      <ThemedText style={{ marginTop: 12 }}>{note}</ThemedText>
      {/* button that finds a pretend update */}
      <CustomButton
        title="Check for updates"
        onPress={() => setNote('You found a new update!')}
      />
    </View>
  );
}