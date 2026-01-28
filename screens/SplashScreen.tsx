import { View, Text } from 'react-native';

import { Logo } from '../components/Logo';

export function SplashScreen() {
  return (
    <View className="bg-primary-dark flex-1 items-center justify-center">
      <View className="flex-row items-center">
        <Logo width={50} height={55} color="#98B80B" />
        <Text
          className="ml-3 text-3xl font-semibold text-white"
          style={{ fontFamily: 'System' }}>
          Fundora
        </Text>
      </View>
    </View>
  );
}
