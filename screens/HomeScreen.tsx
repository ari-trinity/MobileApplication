import { useState } from 'react';
import { View } from 'react-native';
import CustomButton from '../components/CustomButton';
import ThemedText from '../components/ThemedText';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
  const [message, setMessage] = useState('This is the home screen.');

  return (
    <View style={globalStyles.screen}>
      <ThemedText>{message}</ThemedText>
      <CustomButton
        title="Press me"
        onPress={() => setMessage('You pressed the button!')}
      />
    </View>
  );
}