import { Pressable, StyleSheet, Text } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  label: {
    color: '#ffffff',
    fontSize: 18,
  },
});