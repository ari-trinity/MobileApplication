// bring in the status bar & the page holder
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
// show the manage page for this check
import ManageScreen from './screens/ManageScreen';

// the app opens the manage page for now
export default function App() {
  return (
    // stretch the page to fill the screen
    <View style={{ flex: 1 }}>
      {/* place the manage page here */}
      <ManageScreen />
      {/* show the phone status bar */}
      <StatusBar style="auto" />
    </View>
  );
}