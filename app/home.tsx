// app/home.tsx
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What would you like to do?</Text>
      <Link href="/add-players" style={styles.link}>
        <Text>Add/Manage Players</Text>
      </Link>
      <Link href="/tactics-board" style={styles.link}>
        <Text>Open Tactics Board</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  link: {
    padding: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
});