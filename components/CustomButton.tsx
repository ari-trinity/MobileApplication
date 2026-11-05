// bring in the pressable area, styles & text
import { Pressable, StyleSheet, Text } from 'react-native';

// the button needs a label & a job to do when pressed
type CustomButtonProps = {
  title: string; // words on the button
  onPress: () => void; // what happens on a press
};

// a blue button we can reuse on any page
export default function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    // the area a person can press
    <Pressable style={styles.button} onPress={onPress}>
      {/* the words on the button */}
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

// look of the button & its words
const styles = StyleSheet.create({
  button: {
    marginTop: 16, // gap above the button
    backgroundColor: '#2563eb', // blue fill
    paddingVertical: 12, // space above & below the words
    paddingHorizontal: 20, // space on the left & right
    borderRadius: 8, // round the corners
  },
  label: {
    color: '#ffffff', // white letters
    fontSize: 18, // letter size
  },
});