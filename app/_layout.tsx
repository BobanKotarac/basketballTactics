import { Stack } from "expo-router";
import { PlayersProvider } from "../context/PlayersContext";

export default function RootLayout() {
  return (
    <PlayersProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Welcome Screen */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> {/* Home Hub */}
        <Stack.Screen name="add-players" options={{ title: "Add Players" }} />
        <Stack.Screen name="tactics-board" options={{ title: "Tactics Board" }} />
      </Stack>
    </PlayersProvider>
  );
}