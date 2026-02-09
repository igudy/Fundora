import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CardPaymentScreen } from './screens/CardPaymentScreen';
import { ConfirmDetailsScreen } from './screens/ConfirmDetailsScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MyGroupsScreen } from './screens/MyGroupsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { BankTransferScreen } from './screens/BankTransferScreen';
import { SplashScreen as AppSplashScreen } from './screens/SplashScreen';
import { TransactionScreen } from './screens/TransactionScreen';
import { UpcomingDuesScreen } from './screens/UpcomingDuesScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';

import './global.css';

SplashScreen.preventAutoHideAsync();

type Screen =
  | 'welcome'
  | 'createAccount'
  | 'confirmDetails'
  | 'profileSetup'
  | 'home'
  | 'login'
  | 'cardPayment'
  | 'upcomingDues'
  | 'bankTransfer'
  | 'myGroups'
  | 'profile'
  | 'transactions';

export default function App() {
  // TODO: Change back to 'welcome' when done working on home screen
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fontsLoaded, fontError] = useFonts({
    'PlusJakartaSans-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-SemiBold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'PlusJakartaSans-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakartaSans-ExtraBold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
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
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen('home')}
            onTabPress={(tab) => {
              if (tab === 'home') setCurrentScreen('home');
              else if (tab === 'group') setCurrentScreen('myGroups');
              else if (tab === 'transaction') setCurrentScreen('transactions');
            }}
          />
        );
      case 'transactions':
        return (
          <TransactionScreen
            onBack={() => setCurrentScreen('home')}
            onTabPress={(tab) => {
              if (tab === 'home') setCurrentScreen('home');
              else if (tab === 'group') setCurrentScreen('myGroups');
              else if (tab === 'profile') setCurrentScreen('profile');
            }}
          />
        );
      case 'myGroups':
        return <MyGroupsScreen onBack={() => setCurrentScreen('home')} />;
      case 'bankTransfer':
        return <BankTransferScreen onBack={() => setCurrentScreen('home')} />;
      case 'upcomingDues':
        return <UpcomingDuesScreen onBack={() => setCurrentScreen('home')} />;
      case 'cardPayment':
        return <CardPaymentScreen onBack={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onNavigate={(screen: Screen) => setCurrentScreen(screen)} />;
      case 'profileSetup':
        return (
          <ProfileSetupScreen
            onBack={() => setCurrentScreen('confirmDetails')}
            onContinue={() => setCurrentScreen('home')}
          />
        );
      case 'confirmDetails':
        return (
          <ConfirmDetailsScreen
            phoneNumber={phoneNumber}
            onBack={() => setCurrentScreen('createAccount')}
            onContinue={() => setCurrentScreen('profileSetup')}
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
            onGoogleSignUp={() => setCurrentScreen('home')}
            onSignIn={() => setCurrentScreen('login')}
          />
        );
      case 'welcome':
      default:
        return (
          <WelcomeScreen
            onCreateAccount={() => setCurrentScreen('createAccount')}
            onLogin={() => setCurrentScreen('home')}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        {renderScreen()}
        <StatusBar
          style={currentScreen === 'welcome' || currentScreen === 'home' || currentScreen === 'profile' ? 'light' : 'dark'}
        />
      </View>
    </SafeAreaProvider>
  );
}
