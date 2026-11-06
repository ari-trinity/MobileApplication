// bring in memory, a text box & the page layout
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in the database save tools
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// bring in the button, the text block & the shared style
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { RootStackParamList } from '../navigation/types';
import { auth, db } from '../services/firebase';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type ManageNavigation = NativeStackNavigationProp<RootStackParamList, 'Manage'>;

// this page saves a name in firestore
export default function ManageScreen() {
  // get the tool that opens other pages
  const navigation = useNavigation<ManageNavigation>();
  // remember the name while the person types
  const [name, setName] = useState('');
  // remember the title shown at the top of the page
  const [message, setMessage] = useState('Manage your profile');

  // save the name in the users collection
  async function handleSave() {
    if (!name) {
      setMessage('Please type a name');
      return;
    }

    // the signed-in person from firebase
    const user = auth.currentUser;

    if (!user) {
      setMessage('Log in before saving');
      return;
    }

    try {
      setMessage('Saving...');
      // store the name & email under this person's id
      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: name.trim(), // the typed name
          email: user.email ?? '', // the account email
          updatedAt: serverTimestamp(), // the save time
        },
        { merge: true }, // keep older fields when updating
      );
      setMessage(`Profile saved for ${name.trim()}`);
    } catch {
      setMessage('Could not save the profile');
    }
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
      {/* button that saves the name online */}
      <CustomButton title="Save profile" onPress={handleSave} />
      {/* button that goes back home */}
      <CustomButton title="Back to home" onPress={() => navigation.navigate('Home')} />
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