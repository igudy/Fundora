import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BigLogo } from '../components/BigLogo';
import { Button } from '../components/Button';

interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onLogin?: () => void;
}

export function WelcomeScreen({ onCreateAccount, onLogin }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-primary-dark flex-1">
      {/* Background Logo */}
      <View className="absolute -right-20 top-16">
        <BigLogo width={280} height={380} />
      </View>

      {/* Content */}
      <View className="flex-1 justify-end px-6 pb-8" style={{ paddingBottom: insets.bottom + 32 }}>
        {/* Text Content */}
        <View className="mb-12">
          <Text className="font-jakarta-bold mb-3 text-4xl text-white">
            Together, we grow.
          </Text>
          <Text className="font-jakarta text-base leading-relaxed text-white/70">
            Seamlessly save, donate, or pool funds with friends, family, or groups.
          </Text>
        </View>

        {/* Buttons */}
        <View className="gap-4">
          <Button title="Create an account" variant="primary" onPress={onCreateAccount} />
          <Button title="Log In" variant="secondary" onPress={onLogin} />
        </View>
      </View>
    </View>
  );
}
