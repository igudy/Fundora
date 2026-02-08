import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FundoraLogoBig } from '@/components/icons';

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCreateAccount = () => {
    router.push('/(auth)/signup');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Logo positioned on the right, partially visible */}
      <View className="absolute -right-12 top-8">
        <FundoraLogoBig width={280} height={520} />
      </View>

      {/* Content at the bottom */}
      <View
        className="flex-1 justify-end px-6"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Text content */}
        <View className="mb-10">
          <Text className="text-white text-4xl font-sans-bold mb-3">
            Together, we grow.
          </Text>
          <Text className="text-white/70 text-base font-sans leading-6">
            Seamlessly save, donate, or pool funds with friends, family, or groups.
          </Text>
        </View>

        {/* Buttons */}
        <View className="gap-3">
          <Pressable
            onPress={handleCreateAccount}
            className="bg-accent py-4 rounded-full items-center active:opacity-90"
          >
            <Text className="text-primary font-sans-semibold text-base">
              Create an account
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            className="border-2 border-white py-4 rounded-full items-center active:opacity-90"
          >
            <Text className="text-white font-sans-semibold text-base">
              Log In
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
