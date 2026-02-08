import Svg, { Path, Rect } from 'react-native-svg';

interface AddMoneyIconProps {
  size?: number;
  color?: string;
}

export function AddMoneyIcon({ size = 20, color = '#024E44' }: AddMoneyIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 9V15" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M9 12H15" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
