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
    <TouchableOpacity className="flex-row items-center py-4" onPress={onPress} activeOpacity={0.7}>
      {/* Avatar */}
      <Avatar size={48} initials={initials} backgroundColor="#E9FFC9" textColor="#024E44" />

      {/* Title and Date */}
      <View className="ml-3 flex-1">
        <Text className="font-jakarta-medium text-base text-[#23262F]">{title}</Text>
        <Text className="font-jakarta text-sm text-gray-500">{date}</Text>
      </View>

      {/* Amount and Members */}
      <View className="items-end">
        <Text className="font-jakarta-medium text-base">₦{formatAmount(amount)}</Text>
        {members.length > 0 && (
          <View className="mt-1">
            <AvatarGroup avatars={members} maxDisplay={3} size={20} />
            jj
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
