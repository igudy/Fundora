import { View, Text, Modal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { BankTransferIcon, CardIcon } from './icons';

interface AddMoneyModalProps {
  visible: boolean;
  onClose: () => void;
}

function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke="#23262F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AddMoneyModal({ visible, onClose }: AddMoneyModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <Pressable className="flex-1" onPress={onClose} />

        <View
          className="bg-white px-5 pt-4"
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: insets.bottom + 32,
          }}>
          {/* Drag Handle */}
          <View className="mb-2 items-center">
            <View className="h-1 w-10 rounded-full bg-gray-300" />
          </View>

          {/* Close Button */}
          <View className="mb-6 items-end">
            <Pressable
              onPress={onClose}
              className="items-center justify-center rounded-full bg-gray-100"
              style={{ width: 36, height: 36 }}>
              <CloseIcon size={18} />
            </Pressable>
          </View>

          {/* Title */}
          <Text className="font-jakarta-bold text-2xl text-[#23262F]">Add Money</Text>
          <Text className="mt-1 font-jakarta text-sm text-gray-500">
            Choose a method to fund account.
          </Text>

          {/* Card Option */}
          <Pressable
            className="mt-8 items-center rounded-2xl bg-gray-50 py-8"
            onPress={() => {}}>
            <CardIcon size={61} />
            <Text className="mt-4 font-jakarta-semibold text-base text-[#23262F]">Card</Text>
            <Text className="mt-1 font-jakarta text-sm text-gray-500">
              Fund your wallet with an ATM card.
            </Text>
          </Pressable>

          {/* Bank Transfer Option */}
          <Pressable
            className="mt-4 items-center rounded-2xl bg-gray-50 py-8"
            onPress={() => {}}>
            <BankTransferIcon size={61} />
            <Text className="mt-4 font-jakarta-semibold text-base text-[#23262F]">
              Bank Transfer
            </Text>
            <Text className="mt-1 font-jakarta text-sm text-gray-500">
              Fund your wallet through transfer
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
