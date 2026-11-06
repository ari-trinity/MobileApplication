// bring in memory, text boxes & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in the button, the text block, the shared style & the login box
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { globalStyles } from '../styles/globalStyles';

// this page lets a person type an email & a password
export default function LoginScreen() {
  // read the shared login box
  const { email, isLoggedIn, logIn } = useAuth();
  // remember the email while the person types
  const [typedEmail, setTypedEmail] = useState('');
  // remember the password while the person types
  const [password, setPassword] = useState('');
  // remember a helper sentence before login
  const [message, setMessage] = useState('Log in');

  // save the email in the shared box, or ask for both boxes
  function handleLogin() {
    if (!typedEmail || !password) {
      setMessage('Please fill in every box');
      return;
    }

    logIn(typedEmail);
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
      {/* button that saves the email in the shared box */}
      <CustomButton title="Log in" onPress={handleLogin} />
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