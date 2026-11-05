import { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = TextProps & {
  children: ReactNode;
};

export default function ThemedText({ children, style, ...rest }: ThemedTextProps) {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#1a1a1a',
  },
});