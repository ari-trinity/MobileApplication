// bring in the type for inner words, text & styles
import { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

// this text can take normal text settings & the words inside
type ThemedTextProps = TextProps & {
  children: ReactNode; // the words to show
};

// a text block with one shared letter style
export default function ThemedText({ children, style, ...rest }: ThemedTextProps) {
  return (
    // show the words with our style plus any extra style
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
}

// look of the shared letters
const styles = StyleSheet.create({
  text: {
    fontSize: 24, // large letters
    color: '#1a1a1a', // dark gray letters
  },
});