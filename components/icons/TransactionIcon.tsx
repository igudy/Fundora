import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { View } from 'react-native';

interface TransactionIconProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function TransactionIcon({
  size = 24,
  color = '#FFFFFF',
  backgroundColor = '#024E44',
}: TransactionIconProps) {
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size + 20, height: size + 20, backgroundColor }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="3"
          width="20"
          height="18"
          rx="2"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M2 9H22" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Circle cx="7" cy="15" r="1.5" fill={color} />
      </Svg>
    </View>
  );
}
