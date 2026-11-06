// bring in the page switcher & the stack of pages
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// bring in the redux notebook provider
import { Provider } from 'react-redux';
// bring in the shared login box, firebase & every page
import { AuthProvider } from './context/AuthContext';
import { RootStackParamList } from './navigation/types';
import ExploreScreen from './screens/ExploreScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ManageScreen from './screens/ManageScreen';
import RegisterScreen from './screens/RegisterScreen';
import { auth } from './services/firebase';
import { store } from './store/store';

// the stack that holds the pages
const Stack = createNativeStackNavigator<RootStackParamList>();

// write the project id so we can see that firebase loaded
console.log('Firebase ready:', auth.app.options.projectId);

// the app starts on the login page & can move to the others
export default function App() {
  return (
    // turn on the redux notebook for every page
    <Provider store={store}>
      {/* keep the shared login box turned on */}
      <AuthProvider>
        {/* turn on page switching */}
        <NavigationContainer>
          {/* list the pages, with login first */}
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="Manage" component={ManageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}