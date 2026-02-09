import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';

import { ArrowLeftIcon } from '../components/icons';

function BankBuildingIcon({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"
        stroke="#D1E76F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CopyIcon({ size = 16, color = '#D1E76F' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={9}
        y={9}
        width={13}
        height={13}
        rx={2}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ShareIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={9}
        y={9}
        width={13}
        height={13}
        rx={2}
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BulletPoint({ text }: { text: string }) {
  return (
    <View className="flex-row" style={{ marginBottom: 12 }}>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#D1E76F',
          marginTop: 5,
          marginRight: 12,
        }}
      />
      <Text className="flex-1 font-jakarta text-sm leading-5 text-gray-600">{text}</Text>
    </View>
  );
}

interface BankTransferScreenProps {
  onBack: () => void;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export function BankTransferScreen({
  onBack,
  bankName = 'Sterling Bank',
  accountNumber = '0123456789',
  accountName = 'Olamide Contribution Wallet',
}: BankTransferScreenProps) {
  const insets = useSafeAreaInsets();

  const copyToClipboard = async (text: string) => {
    try {
      const Clipboard = require('expo-clipboard');
      await Clipboard.setStringAsync(text);
    } catch {
      Alert.alert('Copied', text);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* Header */}
        <View className="px-5 pt-4">
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            style={{ width: 40, height: 40, justifyContent: 'center' }}>
            <ArrowLeftIcon size={24} color="#23262F" />
          </TouchableOpacity>

          <Text className="mt-5 font-jakarta-bold text-3xl text-[#23262F]">Bank Transfer</Text>
          <Text className="mt-1 font-jakarta text-sm text-gray-400">Transfer to this account</Text>
        </View>

        {/* Green Card */}
        <View className="mx-5 mt-7">
          <View
            style={{
              backgroundColor: '#024E44',
              borderRadius: 24,
              padding: 20,
              overflow: 'hidden',
            }}>
            {/* Virtual Account Header */}
            <View className="flex-row items-center" style={{ marginBottom: 24 }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: 'rgba(209, 231, 111, 0.15)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BankBuildingIcon size={26} />
              </View>
              <View className="ml-3">
                <Text className="font-jakarta-bold text-lg text-white">Virtual Account</Text>
                <Text className="font-jakarta-medium text-sm" style={{ color: '#D1E76F' }}>
                  Instant funding
                </Text>
              </View>
            </View>

            {/* Bank Name */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
              }}>
              <Text
                className="font-jakarta text-xs"
                style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                Bank Name
              </Text>
              <Text className="font-jakarta-semibold text-xl text-white">{bankName}</Text>
            </View>

            {/* Account Number */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
              }}>
              <View className="flex-row items-center justify-between" style={{ marginBottom: 8 }}>
                <Text
                  className="font-jakarta text-xs"
                  style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Account Number
                </Text>
                <TouchableOpacity
                  className="flex-row items-center"
                  activeOpacity={0.7}
                  onPress={() => copyToClipboard(accountNumber)}
                  style={{ gap: 4 }}>
                  <CopyIcon size={14} />
                  <Text className="font-jakarta-medium text-xs" style={{ color: '#D1E76F' }}>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                className="font-jakarta-bold text-white"
                style={{ fontSize: 28, letterSpacing: 3 }}>
                {accountNumber}
              </Text>
            </View>

            {/* Account Name */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 16,
              }}>
              <View className="flex-row items-center justify-between" style={{ marginBottom: 8 }}>
                <Text
                  className="font-jakarta text-xs"
                  style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Account Name
                </Text>
                <TouchableOpacity
                  className="flex-row items-center"
                  activeOpacity={0.7}
                  onPress={() => copyToClipboard(accountName)}
                  style={{ gap: 4 }}>
                  <CopyIcon size={14} />
                  <Text className="font-jakarta-medium text-xs" style={{ color: '#D1E76F' }}>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="font-jakarta-semibold text-xl text-white">{accountName}</Text>
            </View>
          </View>
        </View>

        {/* Important Information */}
        <View className="mx-5 mt-7">
          <Text className="mb-4 font-jakarta-bold text-lg text-[#23262F]">
            Important Information
          </Text>
          <BulletPoint text="Your wallet will be credited instantly after transfer" />
          <BulletPoint text="This account is unique to you and can be reused" />
        </View>
      </ScrollView>

      {/* Share Button */}
      <View className="px-5" style={{ paddingBottom: insets.bottom + 16, paddingTop: 12 }}>
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-2xl bg-primary-dark py-4"
          activeOpacity={0.8}
          style={{ gap: 10 }}>
          <ShareIcon size={20} />
          <Text className="font-jakarta-semibold text-base text-white">Share Account Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
