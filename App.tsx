import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ConfirmDetailsScreen } from './screens/ConfirmDetailsScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { SplashScreen as AppSplashScreen } from './screens/SplashScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';

import './global.css';

SplashScreen.preventAutoHideAsync();

type Screen = 'welcome' | 'createAccount' | 'confirmDetails' | 'login';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <AppSplashScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'confirmDetails':
        return (
          <ConfirmDetailsScreen
            phoneNumber={phoneNumber}
            onBack={() => setCurrentScreen('createAccount')}
            onContinue={(code) => console.log('OTP code:', code)}
          />
        );
      case 'createAccount':
        return (
          <CreateAccountScreen
            onBack={() => setCurrentScreen('welcome')}
            onCreateAccount={(email, phone) => {
              setPhoneNumber(phone);
              setCurrentScreen('confirmDetails');
            }}
            onGoogleSignUp={() => console.log('Google sign up')}
            onSignIn={() => setCurrentScreen('login')}
          />
        );
      case 'welcome':
      default:
        return (
          <WelcomeScreen
            onCreateAccount={() => setCurrentScreen('createAccount')}
            onLogin={() => setCurrentScreen('login')}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        {renderScreen()}
        <StatusBar style={currentScreen === 'welcome' ? 'light' : 'dark'} />
      </View>
    </SafeAreaProvider>
  );
}
