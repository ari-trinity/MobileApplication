// bring in the status bar & the page holder
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
// show the sign-up page for this check
import RegisterScreen from './screens/RegisterScreen';

// the app opens the sign-up page for now
export default function App() {
  return (
    // stretch the page to fill the screen
    <View style={{ flex: 1 }}>
      {/* place the sign-up page here */}
      <RegisterScreen />
      {/* show the phone status bar */}
      <StatusBar style="auto" />
    </View>
  );
}