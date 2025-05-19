import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏀 Basketball Tactics</Text>
      <Link href="/(tabs)" style={styles.button}>
        <Text>Get Started</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
});