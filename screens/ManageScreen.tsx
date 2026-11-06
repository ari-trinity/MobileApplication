// bring in memory, a text box & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in the button, the text block & the shared style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { globalStyles } from '../styles/globalStyles';

// this page lets a person update a name
export default function ManageScreen() {
  // remember the name while the person types
  const [name, setName] = useState('');
  // remember the title shown at the top of the page
  const [message, setMessage] = useState('Manage your profile');

  // save the name or ask for one
  function handleSave() {
    if (!name) {
      setMessage('Please type a name');
      return;
    }

    setMessage(`Profile saved for ${name}`);
  }

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the title */}
      <ThemedText>{message}</ThemedText>
      {/* box for the name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {/* button that saves the name */}
      <CustomButton title="Save profile" onPress={handleSave} />
    </View>
  );
}

// look of the name box
const styles = StyleSheet.create({
  input: {
    width: 280, // make the box wide enough for a name
    marginTop: 12, // leave a gap above the box
    padding: 12, // leave space inside the box
    borderWidth: 1, // draw a thin edge
    borderColor: '#cccccc', // make the edge light gray
    borderRadius: 8, // round the corners
    backgroundColor: '#ffffff', // fill the box with white
    fontSize: 16, // set the letter size
  },
});