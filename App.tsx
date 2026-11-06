// bring in the status bar & the page holder
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
// bring in the shared login box & the explore page
import { AuthProvider } from './context/AuthContext';
import ExploreScreen from './screens/ExploreScreen';

// the app opens the explore page for this check
export default function App() {
  return (
    // keep the shared login box turned on
    <AuthProvider>
      {/* stretch the page to fill the screen */}
      <View style={{ flex: 1 }}>
        {/* place the explore page here */}
        <ExploreScreen />
        {/* show the phone status bar */}
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}