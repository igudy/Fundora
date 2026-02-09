import { View, Image } from 'react-native';

interface AvatarImageProps {
  size?: number;
}

export function AvatarImage({ size = 48 }: AvatarImageProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: '#D1E76F',
        overflow: 'hidden',
      }}>
      <Image
        source={require('../assets/images/avatar-photo.png')}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
}
