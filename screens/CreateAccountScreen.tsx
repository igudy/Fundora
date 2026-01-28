import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon, GoogleIcon, MailIcon, PhoneIcon } from '../components/icons';

interface CreateAccountScreenProps {
  onBack?: () => void;
  onCreateAccount?: (email: string, phone: string) => void;
  onGoogleSignUp?: () => void;
  onSignIn?: () => void;
}

export function CreateAccountScreen({
  onBack,
  onCreateAccount,
  onGoogleSignUp,
  onSignIn,
}: CreateAccountScreenProps) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [countryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCreateAccount = () => {
    onCreateAccount?.(email, `${countryCode}${phoneNumber}`);
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

      {/* Form */}
      <View className="flex-1 px-6 pt-6">
        {/* Email Input */}
        <View className="mb-4 flex-row items-center rounded-2xl bg-gray-100 px-4 py-4">
          <MailIcon size={24} color="#024E44" />
          <TextInput
            className="font-jakarta ml-3 flex-1 text-base text-gray-900"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Phone Input */}
        <View className="mb-6 flex-row gap-3">
          {/* Country Code */}
          <View className="flex-row items-center rounded-2xl bg-gray-100 px-4 py-4">
            <PhoneIcon size={24} color="#024E44" />
            <Text className="font-jakarta ml-2 text-base text-gray-900">{countryCode}</Text>
          </View>

          {/* Phone Number */}
          <View className="flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4 py-4">
            <TextInput
              className="font-jakarta flex-1 text-base text-gray-900"
              placeholder="Phone Number"
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
          className="items-center justify-center rounded-2xl bg-primary-dark py-4"
          onPress={handleCreateAccount}
          activeOpacity={0.8}>
          <Text className="font-jakarta-semibold text-lg text-white">Create an account</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View className="my-6 items-center">
          <Text className="font-jakarta text-base text-gray-500">OR</Text>
        </View>

        {/* Google Sign Up */}
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-2xl border border-gray-200 bg-white py-4"
          onPress={onGoogleSignUp}
          activeOpacity={0.8}>
          <GoogleIcon size={24} />
          <Text className="font-jakarta-medium ml-3 text-base text-gray-900">
            Sign up with Google
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="mt-6 flex-row items-center justify-center">
          <Text className="font-jakarta text-base text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={onSignIn}>
            <Text className="font-jakarta-semibold text-base text-gray-900 underline">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
