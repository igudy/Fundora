import { View, Text, Image } from 'react-native';

interface AvatarProps {
  size?: number;
  imageUrl?: string;
  initials?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function Avatar({
  size = 48,
  imageUrl,
  initials,
  backgroundColor = '#90C841',
  textColor = '#FFFFFF',
}: AvatarProps) {
  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  return (
    <View
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
      }}>
      <Text
        className="font-jakarta-bold"
        style={{ fontSize: size * 0.4, color: textColor }}>
        {initials}
      </Text>
    </View>
  );
}
