// bring in memory, text boxes & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in firebase login
import { signInWithEmailAndPassword } from 'firebase/auth';
// bring in the button, the text block, the shared style & the login box
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../services/firebase';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// this page checks a real firebase account
export default function LoginScreen() {
  // read the shared login box
  const { email, isLoggedIn, logIn } = useAuth();
  // get the tool that opens other pages
  const navigation = useNavigation<LoginNavigation>();
  // remember the email while the person types
  const [typedEmail, setTypedEmail] = useState('');
  // remember the password while the person types
  const [password, setPassword] = useState('');
  // remember a helper sentence before login
  const [message, setMessage] = useState('Log in');

  // ask firebase if this email & password match an account
  async function handleLogin() {
    if (!typedEmail || !password) {
      setMessage('Please fill in every box');
      return;
    }

    try {
      setMessage('Checking the account...');
      // ask firebase to sign this person in
      await signInWithEmailAndPassword(auth, typedEmail.trim(), password);
      // remember the email in the shared box
      logIn(typedEmail.trim());
      // open the home page
      navigation.navigate('Home');
    } catch (error) {
      // turn the firebase error into a short sentence
      const details = error instanceof Error ? error.message : '';

      if (details.includes('invalid-credential') || details.includes('wrong-password')) {
        setMessage('Wrong email or password');
        return;
      }

      if (details.includes('invalid-email')) {
        setMessage('Type a real email address');
        return;
      }

      setMessage('Could not log in');
    }
  }

  // show the saved email after login
  const title = isLoggedIn ? `Logged in as ${email}` : message;

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the title */}
      <ThemedText>{title}</ThemedText>
      {/* box for the email address */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={typedEmail}
        onChangeText={setTypedEmail}
        autoCapitalize="none"
      />
      {/* box for the secret password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* button that checks the firebase account */}
      <CustomButton title="Log in" onPress={handleLogin} />
      {/* button that opens the sign-up page */}
      <CustomButton
        title="Create an account"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

// look of the two typing boxes
const styles = StyleSheet.create({
  input: {
    width: 280, // make the box wide enough for an email
    marginTop: 12, // leave a gap above the box
    padding: 12, // leave space inside the box
    borderWidth: 1, // draw a thin edge
    borderColor: '#cccccc', // make the edge light gray
    borderRadius: 8, // round the corners
    backgroundColor: '#ffffff', // fill the box with white
    fontSize: 16, // set the letter size
  },
});