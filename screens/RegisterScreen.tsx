// bring in memory, text boxes & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in firebase sign-up
import { createUserWithEmailAndPassword } from 'firebase/auth';
// bring in the button, the text block, the shared style & the login box
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../services/firebase';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type RegisterNavigation = NativeStackNavigationProp<RootStackParamList, 'Register'>;

// this page creates a real firebase account
export default function RegisterScreen() {
  // read the shared login box
  const { logIn } = useAuth();
  // get the tool that opens other pages
  const navigation = useNavigation<RegisterNavigation>();
  // remember the name while the person types
  const [name, setName] = useState('');
  // remember the email while the person types
  const [email, setEmail] = useState('');
  // remember the password while the person types
  const [password, setPassword] = useState('');
  // remember the title shown at the top of the page
  const [message, setMessage] = useState('Create an account');

  // check the boxes, then create the firebase account
  async function handleRegister() {
    if (!name || !email || !password) {
      setMessage('Please fill in every box');
      return;
    }

    // firebase needs a password of at least 6 characters
    if (password.length < 6) {
      setMessage('Use at least 6 characters in the password');
      return;
    }

    try {
      setMessage('Creating the account...');
      // ask firebase to save this email & password
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // remember the email in the shared box
      logIn(email.trim());
      // open the home page
      navigation.navigate('Home');
    } catch (error) {
      // turn the firebase error into a short sentence
      const details = error instanceof Error ? error.message : '';

      if (details.includes('email-already-in-use')) {
        setMessage('That email is already used');
        return;
      }

      if (details.includes('invalid-email')) {
        setMessage('Type a real email address');
        return;
      }

      setMessage('Could not create the account');
    }
  }

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the title */}
      <ThemedText>{message}</ThemedText>
      {/* box for the person name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {/* box for the email address */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
      {/* button that creates the firebase account */}
      <CustomButton title="Create account" onPress={handleRegister} />
      {/* button that goes back to login */}
      <CustomButton title="Back to login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

// look of the typing boxes
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