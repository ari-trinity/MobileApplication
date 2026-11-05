import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ThemedText from './components/ThemedText';

export default function App() {
  return (
    <View style={styles.container}>
      <ThemedText>Hello! My app is working.</ThemedText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});