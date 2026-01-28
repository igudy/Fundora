import Svg, { Path } from 'react-native-svg';

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
}

export function ArrowLeftIcon({ size = 24, color = '#1A1A1A' }: ArrowLeftIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19L5 12L12 5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
