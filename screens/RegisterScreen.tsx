// bring in memory, text boxes & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in the button, the text block & the shared page style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { globalStyles } from '../styles/globalStyles';

// this page lets a new person create an account
export default function RegisterScreen() {
  // remember the name while the person types
  const [name, setName] = useState('');
  // remember the email while the person types
  const [email, setEmail] = useState('');
  // remember the password while the person types
  const [password, setPassword] = useState('');
  // remember the title shown at the top of the page
  const [message, setMessage] = useState('Create an account');

  // check the boxes, then greet the new person
  function handleRegister() {
    if (!name || !email || !password) {
      setMessage('Please fill in every box');
      return;
    }

    setMessage(`Account started for ${name}`);
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
      {/* button that starts the account */}
      <CustomButton title="Create account" onPress={handleRegister} />
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