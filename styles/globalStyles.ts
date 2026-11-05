import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f4f7fb',
  text: '#1a1a1a',
  button: '#2563eb',
  buttonText: '#ffffff',
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});