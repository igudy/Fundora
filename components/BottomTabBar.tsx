import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export type TabName = 'home' | 'group' | 'transaction' | 'profile';

interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

function TabHomeIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <View
      className={`items-center justify-center rounded-xl p-2 ${active ? 'bg-white/20' : ''}`}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 22V12H15V22"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function TabGroupIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <View
      className={`items-center justify-center rounded-xl p-2 ${active ? 'bg-white/20' : ''}`}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={2} />
        <Path
          d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function TabTransactionIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <View
      className={`items-center justify-center rounded-xl p-2 ${active ? 'bg-white/20' : ''}`}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="2"
          stroke={color}
          strokeWidth={2}
        />
        <Path d="M2 10H22" stroke={color} strokeWidth={2} />
        <Circle cx="7" cy="15" r="1.5" fill={color} />
      </Svg>
    </View>
  );
}

function TabProfileIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <View
      className={`items-center justify-center rounded-xl p-2 ${active ? 'bg-white/20' : ''}`}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
      </Svg>
    </View>
  );
}

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabs: { name: TabName; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      name: 'home',
      label: 'Home',
      icon: (active) => <TabHomeIcon active={active} />,
    },
    {
      name: 'group',
      label: 'Group',
      icon: (active) => <TabGroupIcon active={active} />,
    },
    {
      name: 'transaction',
      label: 'Transaction',
      icon: (active) => <TabTransactionIcon active={active} />,
    },
    {
      name: 'profile',
      label: 'Profile',
      icon: (active) => <TabProfileIcon active={active} />,
    },
  ];

  return (
    <View style={{ paddingBottom: insets.bottom + 16, paddingHorizontal: 16 }}>
      <View className="flex-row items-center justify-around rounded-full bg-primary-dark px-4 py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              className="items-center justify-center"
              onPress={() => onTabPress(tab.name)}
              activeOpacity={0.7}>
              {tab.icon(isActive)}
              <Text
                className={`mt-1 text-xs ${
                  isActive ? 'font-jakarta-semibold text-primary-main' : 'font-jakarta text-white'
                }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
