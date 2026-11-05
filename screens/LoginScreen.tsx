// bring in memory, text boxes & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in the button, the text block & the shared page style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { globalStyles } from '../styles/globalStyles';

// this page lets a person type an email & a password
export default function LoginScreen() {
  // remember the email while the person types
  const [email, setEmail] = useState('');
  // remember the password while the person types
  const [password, setPassword] = useState('');
  // remember the title shown at the top of the page
  const [message, setMessage] = useState('Log in');

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the title */}
      <ThemedText>{message}</ThemedText>
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
      {/* button that greets the email or asks for one */}
      <CustomButton
        title="Log in"
        onPress={() => setMessage(email ? `Hello, ${email}` : 'Please type an email')}
      />
    </View>
  );
}

// look of the two typing boxes
const styles = StyleSheet.create({
  input: {
    width: 280, // make the box wide enough for an email
    marginTop: 12, // gap above the box
    padding: 12, // leave space inside the box
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8, // round the corners
    backgroundColor: '#ffffff', // fill the box with white
    fontSize: 16,
  },
});