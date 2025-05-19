import WelcomeScreen from '@/components/WelcomeScreen';


 export default function HomeScreen() {

  return (
    <WelcomeScreen onPressStart={() => {
      // e.g. navigate to your “main app” route or tabs
      // If using expo-router, maybe: router.push('/some/route')
    }} />
  );
}

