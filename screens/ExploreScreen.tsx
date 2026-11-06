// bring in memory, the page holder & a watcher that stops on exit
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in the live database tools
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
// bring in the button, the text block, the shared style & the internet helper
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { RootStackParamList } from '../navigation/types';
import { fetchSampleUpdate } from '../services/apiService';
import { auth, db } from '../services/firebase';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type ExploreNavigation = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

// this page shows live messages & can ask the internet for a sample
export default function ExploreScreen() {
  // get the tool that opens other pages
  const navigation = useNavigation<ExploreNavigation>();
  // remember the sample update sentence
  const [note, setNote] = useState('Nothing new yet.');
  // remember the message being typed
  const [draft, setDraft] = useState('');
  // remember the live messages
  const [messages, setMessages] = useState<string[]>([]);

  // watch the messages collection for changes
  useEffect(() => {
    // newest messages first
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    // update the list whenever firestore changes
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const nextMessages = snapshot.docs.map((item) => {
        const data = item.data() as { text?: string };
        return data.text ?? '';
      });

      setMessages(nextMessages);
    });

    // stop watching when the page closes
    return unsubscribe;
  }, []);

  // ask the internet helper for a sample title
  async function handleCheck() {
    setNote('Looking...');

    try {
      const title = await fetchSampleUpdate();
      setNote(title);
    } catch {
      setNote('Could not reach the internet');
    }
  }

  // save a new message in firestore
  async function handleSend() {
    if (!draft.trim()) {
      return;
    }

    // store the text, the email & the time
    await addDoc(collection(db, 'messages'), {
      text: draft.trim(),
      email: auth.currentUser?.email ?? 'guest',
      createdAt: serverTimestamp(),
    });

    setDraft('');
  }

  return (
    // use the shared style so this page matches the others
    <View style={globalStyles.screen}>
      {/* show the page name */}
      <ThemedText>Explore</ThemedText>
      {/* show the sample update */}
      <ThemedText style={{ marginTop: 12 }}>{note}</ThemedText>
      {/* show each live message */}
      {messages.length === 0 ? (
        <ThemedText style={{ marginTop: 12 }}>No messages yet.</ThemedText>
      ) : (
        messages.map((item, index) => (
          <ThemedText key={`${item}-${index}`} style={{ marginTop: 8 }}>
            {item}
          </ThemedText>
        ))
      )}
      {/* box for a new message */}
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={draft}
        onChangeText={setDraft}
      />
      {/* button that saves the message */}
      <CustomButton title="Send" onPress={handleSend} />
      {/* button that calls the internet helper */}
      <CustomButton title="Check for updates" onPress={handleCheck} />
      {/* button that goes back home */}
      <CustomButton title="Back to home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// look of the message box
const styles = StyleSheet.create({
  input: {
    width: 280, // make the box wide enough for a message
    marginTop: 12, // leave a gap above the box
    padding: 12, // leave space inside the box
    borderWidth: 1, // draw a thin edge
    borderColor: '#cccccc', // make the edge light gray
    borderRadius: 8, // round the corners
    backgroundColor: '#ffffff', // fill the box with white
    fontSize: 16, // set the letter size
  },
});