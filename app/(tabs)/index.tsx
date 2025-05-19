// app/(tabs)/index.tsx

import { Tabs } from "expo-router";
import React, { useState } from "react";
import WelcomeScreen from "../../components/WelcomeScreen";

export default function RootLayout() {
  // Start by showing the welcome screen
  const [showWelcome, setShowWelcome] = useState(true);

  // If we haven’t dismissed yet, render <WelcomeScreen />:
  if (showWelcome) {
    // Pass setShowWelcome(false) as the onDismiss callback
    return <WelcomeScreen onDismiss={() => setShowWelcome(false)} />;
  }

  // Otherwise render your normal tab navigator
  return <Tabs />;
}
