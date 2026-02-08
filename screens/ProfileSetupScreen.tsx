import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon, FaceScanIcon } from '../components/icons';

interface ProfileSetupScreenProps {
  onBack?: () => void;
  onContinue?: (firstName: string, lastName: string) => void;
}

export function ProfileSetupScreen({ onBack, onContinue }: ProfileSetupScreenProps) {
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isComplete = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleContinue = () => {
    if (isComplete) {
      onContinue?.(firstName, lastName);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={onBack} className="mr-4 p-2">
          <ArrowLeftIcon size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-jakarta-bold text-xl text-gray-900">Create your account</Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Face Scan Icon */}
        <View className="mb-10 items-center">
          <FaceScanIcon size={100} />
        </View>

        {/* First Name Input */}
        <View className="mb-4 rounded-2xl bg-gray-100 px-4 py-4">
          <TextInput
            className="font-jakarta text-base text-gray-900"
            placeholder="Enter first name"
            placeholderTextColor="#9CA3AF"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
        </View>

        {/* Last Name Input */}
        <View className="mb-6 rounded-2xl bg-gray-100 px-4 py-4">
          <TextInput
            className="font-jakarta text-base text-gray-900"
            placeholder="Enter last name"
            placeholderTextColor="#9CA3AF"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className={`items-center justify-center rounded-2xl py-4 ${
            isComplete ? 'bg-primary-dark' : 'bg-primary-dark'
          }`}
          onPress={handleContinue}
          activeOpacity={0.8}>
          <Text className="font-jakarta-semibold text-lg text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
