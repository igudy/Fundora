import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '../components/icons';
import { SmsIcon } from '../components/icons/SmsIcon';
import { OtpInput } from '../components/OtpInput';

interface ConfirmDetailsScreenProps {
  phoneNumber: string;
  onBack?: () => void;
  onContinue?: (code: string) => void;
}

export function ConfirmDetailsScreen({
  phoneNumber,
  onBack,
  onContinue,
}: ConfirmDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);

  const isComplete = otp.length === 4;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleContinue = () => {
    if (isComplete) {
      onContinue?.(otp);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={onBack} className="mr-4 p-2">
          <ArrowLeftIcon size={24} color="#024E44" />
        </TouchableOpacity>
        <Text className="font-jakarta-bold text-xl text-gray-900">Confirm your details</Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* SMS Icon */}
        <View className="mb-8 items-center">
          <SmsIcon size={80} />
        </View>

        {/* Instructions */}
        <View className="mb-8 items-center">
          <Text className="font-jakarta text-center text-base text-gray-600">
            Enter the 6-digit code sent to
          </Text>
          <Text className="font-jakarta-bold text-center text-base text-gray-900">
            {phoneNumber}
          </Text>
          <Text className="font-jakarta text-center text-base text-gray-600">via SMS below</Text>
        </View>

        {/* OTP Input */}
        <View className="mb-8">
          <OtpInput length={4} value={otp} onChange={setOtp} />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className={`items-center justify-center rounded-2xl py-4 ${
            isComplete ? 'bg-primary-dark' : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!isComplete}>
          <Text
            className={`font-jakarta-semibold text-lg ${
              isComplete ? 'text-white' : 'text-gray-500'
            }`}>
            Continue
          </Text>
        </TouchableOpacity>

        {/* Timer */}
        <View className="mt-6 items-center">
          <Text className="font-jakarta text-center text-base text-gray-600">
            A message to {phoneNumber} should{'\n'}arrive in{' '}
            <Text className="font-jakarta-bold text-gray-900">{countdown} seconds</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
