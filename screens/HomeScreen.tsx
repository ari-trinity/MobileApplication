// bring in the page holder
import { View } from 'react-native';
// bring in page switching
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// bring in firebase log out
import { signOut } from 'firebase/auth';
// bring in the redux hooks
import { useDispatch, useSelector } from 'react-redux';
// bring in the button, the text block, the shared style & the login box
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import { runLongTask } from '../services/apiService';
import { auth } from '../services/firebase';
import { RootState } from '../store/store';
import { setMessage, setProgress } from '../store/taskSlice';
import { globalStyles } from '../styles/globalStyles';

// the kind of page switcher this screen uses
type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// this is the main page after a person logs in
export default function HomeScreen() {
  // read the saved email & the log out action
  const { email, logOut } = useAuth();
  // get the tool that opens other pages
  const navigation = useNavigation<HomeNavigation>();
  // get the tool that writes in the redux notebook
  const dispatch = useDispatch();
  // read the sentence & progress from the notebook
  const message = useSelector((state: RootState) => state.task.message);
  const progress = useSelector((state: RootState) => state.task.progress);

  // sign out of firebase, clear the shared box & return to login
  async function handleLogOut() {
    await signOut(auth);
    logOut();
    navigation.reset({
      index: 0, // make login the only page in the stack
      routes: [{ name: 'Login' }], // open the login page
    });
  }

  // run the slow task & write each percent in the notebook
  async function handleLongTask() {
    dispatch(setProgress('Progress: starting'));
    const result = await runLongTask((percent) => {
      dispatch(setProgress(`Progress: ${percent}%`));
    });
    dispatch(setMessage(result));
  }

  return (
    // use the shared light page style
    <View style={globalStyles.screen}>
      {/* show the sentence from the notebook */}
      <ThemedText>{message}</ThemedText>
      {/* show who is logged in */}
      <ThemedText style={{ marginTop: 12 }}>
        {email ? `Logged in as ${email}` : 'Not logged in'}
      </ThemedText>
      {/* show the progress from the notebook */}
      <ThemedText style={{ marginTop: 12 }}>{progress}</ThemedText>
      {/* button that changes the sentence in the notebook */}
      <CustomButton
        title="Press me"
        onPress={() => dispatch(setMessage('You pressed the button!'))}
      />
      {/* button that starts the slow task */}
      <CustomButton title="Start long task" onPress={handleLongTask} />
      {/* button that opens the explore page */}
      <CustomButton title="Explore" onPress={() => navigation.navigate('Explore')} />
      {/* button that opens the manage page */}
      <CustomButton title="Manage profile" onPress={() => navigation.navigate('Manage')} />
      {/* button that logs out */}
      <CustomButton title="Log out" onPress={handleLogOut} />
    </View>
  );
}