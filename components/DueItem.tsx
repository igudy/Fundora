import { View, Text, TouchableOpacity } from 'react-native';

import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

interface DueItemProps {
  initials: string;
  title: string;
  date: string;
  amount: number;
  members?: { imageUrl?: string; initials?: string }[];
  onPress?: () => void;
}

export function DueItem({ initials, title, date, amount, members = [], onPress }: DueItemProps) {
  const formatAmount = (value: number) => {
    return value.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <TouchableOpacity
      className="flex-row items-center py-4"
      onPress={onPress}
      activeOpacity={0.7}>
      {/* Avatar */}
      <Avatar size={48} initials={initials} backgroundColor="#90C841" textColor="#024E44" />

      {/* Title and Date */}
      <View className="ml-3 flex-1">
        <Text className="font-jakarta-semibold text-base text-gray-900">{title}</Text>
        <Text className="font-jakarta text-sm text-gray-500">{date}</Text>
      </View>

      {/* Amount and Members */}
      <View className="items-end">
        <Text className="font-jakarta-bold text-base text-gray-900">₦{formatAmount(amount)}</Text>
        {members.length > 0 && (
          <View className="mt-1">
            <AvatarGroup avatars={members} maxDisplay={3} size={20} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
