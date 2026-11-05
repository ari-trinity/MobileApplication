// bring in the status bar & the page holder
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
// show the login page first
import LoginScreen from './screens/LoginScreen';

// the app starts by opening the login page
export default function App() {
  return (
    // stretch the page to fill the screen
    <View style={{ flex: 1 }}>
      {/* place the login page here */}
      <LoginScreen />
      {/* show the phone status bar */}
      <StatusBar style="auto" />
    </View>
  );
}