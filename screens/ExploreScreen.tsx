// bring in memory & the page holder
import { useState } from 'react';
import { View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in the button, the text block, the shared style & the internet helper
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { RootStackParamList } from '../navigation/types';
import { fetchSampleUpdate } from '../services/apiService';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type ExploreNavigation = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

// this page asks the internet for an update
export default function ExploreScreen() {
  // get the tool that opens other pages
  const navigation = useNavigation<ExploreNavigation>();
  // remember the update sentence
  const [note, setNote] = useState('Nothing new yet.');

  // ask the internet helper for a sample title
  async function handleCheck() {
    setNote('Looking...');

    try {
      const title = await fetchSampleUpdate();
      setNote(title);
    } catch {
      setNote('Could not reach the internet');
    }
  }

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the page name */}
      <ThemedText>Explore</ThemedText>
      {/* show the current update */}
      <ThemedText style={{ marginTop: 12 }}>{note}</ThemedText>
      {/* button that calls the internet helper */}
      <CustomButton title="Check for updates" onPress={handleCheck} />
      {/* button that goes back home */}
      <CustomButton title="Back to home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}