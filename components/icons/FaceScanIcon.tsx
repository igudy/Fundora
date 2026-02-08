import Svg, { Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

interface FaceScanIconProps {
  size?: number;
}

export function FaceScanIcon({ size = 80 }: FaceScanIconProps) {
  return (
    <View
      className="items-center justify-center rounded-full bg-primary-dark"
      style={{ width: size, height: size }}>
      <Svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        {/* Corner brackets */}
        <Path
          d="M7 3H5C3.89543 3 3 3.89543 3 5V7"
          stroke="#98B80B"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M17 3H19C20.1046 3 21 3.89543 21 5V7"
          stroke="#98B80B"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M7 21H5C3.89543 21 3 20.1046 3 19V17"
          stroke="#98B80B"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M17 21H19C20.1046 21 21 20.1046 21 19V17"
          stroke="#98B80B"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Face outline */}
        <Path
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          stroke="#98B80B"
          strokeWidth={1.5}
        />
        {/* Smile */}
        <Path
          d="M10 13C10.5 13.5 11.2 14 12 14C12.8 14 13.5 13.5 14 13"
          stroke="#98B80B"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        {/* Eyes */}
        <Path d="M10 11H10.01" stroke="#98B80B" strokeWidth={2} strokeLinecap="round" />
        <Path d="M14 11H14.01" stroke="#98B80B" strokeWidth={2} strokeLinecap="round" />
      </Svg>
    </View>
  );
}
