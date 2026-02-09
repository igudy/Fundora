import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { Card3DView } from '../components/Card3DView';
import { ArrowLeftIcon } from '../components/icons';

interface CardPaymentScreenProps {
  onBack: () => void;
}

function CardChipIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Circle cx={20} cy={20} r={20} fill="#1A6B5C" />
      <Circle cx={20} cy={20} r={13} fill="#2A8B7A" opacity={0.6} />
    </Svg>
  );
}

function CardDots() {
  const dotSize = 8;
  const groups = [4, 4, 4, 4];

  return (
    <View className="flex-row items-center" style={{ gap: 16 }}>
      {groups.map((count, groupIdx) => (
        <View key={groupIdx} className="flex-row" style={{ gap: 4 }}>
          {Array.from({ length: count }).map((_, dotIdx) => (
            <View
              key={dotIdx}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: '#FFFFFF',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function ThreeDots() {
  return (
    <View className="flex-row" style={{ gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
          }}
        />
      ))}
    </View>
  );
}

type CardView = 'normal' | '3d';

function CardFace() {
  return (
    <View
      className="overflow-hidden p-5"
      style={{
        backgroundColor: '#024E44',
        borderRadius: 20,
      }}>
      <View className="flex-row items-start justify-between">
        <Text className="font-jakarta text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Card Number
        </Text>
        <CardChipIcon />
      </View>

      <View className="mt-3">
        <CardDots />
      </View>

      <View className="mt-6 flex-row justify-between">
        <View>
          <Text className="font-jakarta text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Expiry Date
          </Text>
          <Text className="mt-1 font-jakarta-medium text-base text-white">MM/YY</Text>
        </View>
        <View className="items-end">
          <Text className="font-jakarta text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            CVV
          </Text>
          <View className="mt-2">
            <ThreeDots />
          </View>
        </View>
      </View>
    </View>
  );
}


export function CardPaymentScreen({ onBack }: CardPaymentScreenProps) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardView, setCardView] = useState<CardView>('normal');

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View className="px-5 pb-2 pt-4">
            <TouchableOpacity
              onPress={onBack}
              activeOpacity={0.7}
              style={{ width: 40, height: 40, justifyContent: 'center' }}>
              <ArrowLeftIcon size={24} color="#024E44" />
            </TouchableOpacity>

            <Text className="mt-4 font-jakarta-bold text-2xl text-[#23262F]">Card Payment</Text>
            <Text className="mt-1 font-jakarta text-sm text-gray-500">
              Enter your card details
            </Text>
          </View>

          {/* View Toggle */}
          <View className="mx-5 mt-5 flex-row rounded-xl bg-gray-100 p-1">
            <Pressable
              className="flex-1 items-center rounded-lg py-2.5"
              style={cardView === 'normal' ? { backgroundColor: '#FFFFFF' } : undefined}
              onPress={() => setCardView('normal')}>
              <Text
                className={`font-jakarta-medium text-sm ${
                  cardView === 'normal' ? 'text-[#024E44]' : 'text-gray-400'
                }`}>
                Normal
              </Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center rounded-lg py-2.5"
              style={cardView === '3d' ? { backgroundColor: '#FFFFFF' } : undefined}
              onPress={() => setCardView('3d')}>
              <Text
                className={`font-jakarta-medium text-sm ${
                  cardView === '3d' ? 'text-[#024E44]' : 'text-gray-400'
                }`}>
                3D View
              </Text>
            </Pressable>
          </View>

          {/* Card Preview */}
          <View className="px-5 pt-5">
            {cardView === 'normal' ? <CardFace /> : <Card3DView />}
          </View>

          {/* Form */}
          <View className="px-5 pt-8">
            {/* Amount */}
            <Text className="font-jakarta-semibold text-sm text-[#23262F]">Amount</Text>
            <View
              className="mt-2 flex-row items-center rounded-xl border border-gray-200 px-4"
              style={{ height: 52 }}>
              <Text className="font-jakarta-medium text-base text-gray-400">₦</Text>
              <TextInput
                className="ml-1 flex-1 font-jakarta-medium text-base text-[#23262F]"
                placeholder="0.00"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                style={{ height: 52, fontFamily: 'PlusJakartaSans-Medium' }}
              />
            </View>

            {/* Card Number */}
            <Text className="mt-5 font-jakarta-semibold text-sm text-[#23262F]">Card Number</Text>
            <View
              className="mt-2 rounded-xl border border-gray-200 px-4"
              style={{ height: 52, justifyContent: 'center' }}>
              <TextInput
                className="font-jakarta-medium text-base text-[#23262F]"
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={19}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                style={{ height: 52, fontFamily: 'PlusJakartaSans-Medium' }}
              />
            </View>

            {/* Expiry Date + CVV */}
            <View className="mt-5 flex-row" style={{ gap: 16 }}>
              <View className="flex-1">
                <Text className="font-jakarta-semibold text-sm text-[#23262F]">Expiry Date</Text>
                <View
                  className="mt-2 rounded-xl border border-gray-200 px-4"
                  style={{ height: 52, justifyContent: 'center' }}>
                  <TextInput
                    className="font-jakarta-medium text-base text-[#23262F]"
                    placeholder="MM/YY"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    maxLength={5}
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiry(text))}
                    style={{ height: 52, fontFamily: 'PlusJakartaSans-Medium' }}
                  />
                </View>
              </View>

              <View className="flex-1">
                <Text className="font-jakarta-semibold text-sm text-[#23262F]">CVV</Text>
                <View
                  className="mt-2 rounded-xl border border-gray-200 px-4"
                  style={{ height: 52, justifyContent: 'center' }}>
                  <TextInput
                    className="font-jakarta-medium text-base text-[#23262F]"
                    placeholder="123"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                    value={cvv}
                    onChangeText={setCvv}
                    style={{ height: 52, fontFamily: 'PlusJakartaSans-Medium' }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Pay Now Button */}
        <View className="px-5" style={{ paddingBottom: insets.bottom + 16, paddingTop: 12 }}>
          <TouchableOpacity
            className="items-center justify-center rounded-2xl bg-primary-dark py-4"
            activeOpacity={0.8}>
            <Text className="font-jakarta-semibold text-base text-white">Pay Now</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
