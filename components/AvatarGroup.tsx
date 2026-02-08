import { View, Text, Image } from 'react-native';

interface AvatarGroupProps {
  avatars: { imageUrl?: string; initials?: string }[];
  maxDisplay?: number;
  size?: number;
}

export function AvatarGroup({ avatars, maxDisplay = 3, size = 24 }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, maxDisplay);
  const remaining = avatars.length - maxDisplay;

  return (
    <View className="flex-row items-center">
      {displayAvatars.map((avatar, index) => (
        <View
          key={index}
          style={{
            marginLeft: index === 0 ? 0 : -8,
            zIndex: maxDisplay - index,
          }}>
          {avatar.imageUrl ? (
            <Image
              source={{ uri: avatar.imageUrl }}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}
            />
          ) : (
            <View
              className="items-center justify-center bg-gray-300"
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}>
              <Text className="font-jakarta-bold text-xs text-gray-600">
                {avatar.initials}
              </Text>
            </View>
          )}
        </View>
      ))}
      {remaining > 0 && (
        <View
          className="items-center justify-center rounded-full bg-primary-main"
          style={{
            width: size,
            height: size,
            marginLeft: -8,
          }}>
          <Text className="font-jakarta-bold text-xs text-primary-dark">+{remaining}</Text>
        </View>
      )}
    </View>
  );
}
