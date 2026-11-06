// bring in memory & the page holder
import { useState } from 'react';
import { View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in firebase log out
import { signOut } from 'firebase/auth';
// bring in the button, the text block, the shared style & the login box
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../services/firebase';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// this is the main page after a person logs in
export default function HomeScreen() {
  // read the saved email & the log out action
  const { email, logOut } = useAuth();
  // get the tool that opens other pages
  const navigation = useNavigation<HomeNavigation>();
  // remember the sentence shown on the page
  const [message, setMessage] = useState('This is the home screen.');

  // sign out of firebase, clear the shared box & return to login
  async function handleLogOut() {
    await signOut(auth);
    logOut();
    navigation.reset({
      index: 0, // make login the only page in the stack
      routes: [{ name: 'Login' }], // open the login page
    });
  }

  return (
    // use the shared light page style
    <View style={globalStyles.screen}>
      {/* show the current sentence */}
      <ThemedText>{message}</ThemedText>
      {/* show who is logged in */}
      <ThemedText style={{ marginTop: 12 }}>{email ? `Logged in as ${email}` : 'Not logged in'}</ThemedText>
      {/* button that changes the sentence */}
      <CustomButton
        title="Press me"
        onPress={() => setMessage('You pressed the button!')}
      />
      {/* button that opens the explore page */}
      <CustomButton title="Explore" onPress={() => navigation.navigate('Explore')} />
      {/* button that opens the manage page */}
      <CustomButton title="Manage profile" onPress={() => navigation.navigate('Manage')} />
      {/* button that logs out */}
      <CustomButton title="Log out" onPress={handleLogOut} />
    </View>
  );
}