// the style helper
import { StyleSheet } from 'react-native';

// colors used across the app
export const colors = {
  background: '#f4f7fb',
  text: '#1a1a1a',
  button: '#2563eb',
  buttonText: '#ffffff', // white letters on the button
};

// one layout every full page can share
export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1, // fill the whole page
    backgroundColor: colors.background, // use the shared page color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24, // leave space around the edges
  },
});