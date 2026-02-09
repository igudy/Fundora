import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export type TabName = 'home' | 'group' | 'transaction' | 'profile';

interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

function TabHomeIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.25 18C11.25 18.1989 11.329 18.3897 11.4697 18.5303C11.6103 18.671 11.8011 18.75 12 18.75C12.1989 18.75 12.3897 18.671 12.5303 18.5303C12.671 18.3897 12.75 18.1989 12.75 18V15C12.75 14.8011 12.671 14.6103 12.5303 14.4697C12.3897 14.329 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.329 11.4697 14.4697C11.329 14.6103 11.25 14.8011 11.25 15V18Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C11.292 1.25 10.649 1.453 9.95 1.792C9.276 2.12 8.496 2.604 7.523 3.208L5.456 4.491C4.536 5.063 3.797 5.521 3.229 5.956C2.64 6.406 2.188 6.866 1.861 7.463C1.535 8.058 1.389 8.692 1.318 9.441C1.25 10.166 1.25 11.054 1.25 12.167V13.78C1.25 15.684 1.25 17.187 1.403 18.362C1.559 19.567 1.889 20.54 2.633 21.309C3.38 22.082 4.33 22.428 5.508 22.591C6.648 22.75 8.106 22.75 9.942 22.75H14.058C15.894 22.75 17.352 22.75 18.492 22.591C19.669 22.428 20.62 22.082 21.368 21.309C22.111 20.54 22.441 19.567 22.598 18.362C22.75 17.187 22.75 15.684 22.75 13.78V12.167C22.75 11.054 22.75 10.167 22.682 9.441C22.612 8.691 22.465 8.058 22.139 7.463C21.812 6.866 21.359 6.407 20.771 5.956C20.203 5.52 19.465 5.063 18.544 4.491L16.477 3.208C15.504 2.604 14.724 2.12 14.049 1.792C13.352 1.452 12.709 1.25 12 1.25ZM8.28 4.504C9.295 3.874 10.01 3.432 10.607 3.141C11.188 2.858 11.6 2.75 12 2.75C12.4 2.75 12.812 2.858 13.393 3.141C13.991 3.431 14.705 3.874 15.72 4.504L17.72 5.745C18.681 6.342 19.356 6.761 19.86 7.147C20.349 7.522 20.63 7.831 20.823 8.183C21.016 8.536 21.129 8.949 21.188 9.581C21.249 10.229 21.25 11.046 21.25 12.204V13.725C21.25 15.695 21.248 17.101 21.11 18.168C20.974 19.216 20.717 19.824 20.29 20.267C19.865 20.706 19.287 20.967 18.286 21.106C17.26 21.248 15.907 21.25 14 21.25H10C8.092 21.25 6.74 21.248 5.714 21.106C4.713 20.966 4.135 20.706 3.711 20.266C3.283 19.824 3.026 19.216 2.891 18.168C2.751 17.101 2.75 15.696 2.75 13.725V12.204C2.75 11.046 2.75 10.229 2.812 9.581C2.871 8.949 2.984 8.536 3.177 8.183C3.37 7.831 3.651 7.522 4.141 7.147C4.644 6.761 5.319 6.342 6.28 5.745L8.28 4.504Z"
        fill={color}
      />
    </Svg>
  );
}

function TabGroupIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 19" fill="none">
      <Path
        d="M0.75 17.75V16.75C0.75 14.8935 1.4875 13.113 2.80025 11.8003C4.11301 10.4875 5.89348 9.75 7.75 9.75C9.60652 9.75 11.387 10.4875 12.6997 11.8003C14.0125 13.113 14.75 14.8935 14.75 16.75V17.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M12.75 11.75C12.75 10.4239 13.2768 9.15215 14.2145 8.21447C15.1521 7.27678 16.4239 6.75 17.75 6.75C18.4066 6.75 19.0568 6.87933 19.6634 7.1306C20.27 7.38188 20.8212 7.75017 21.2855 8.21447C21.7498 8.67876 22.1181 9.22996 22.3694 9.83658C22.6207 10.4432 22.75 11.0934 22.75 11.75V12.25"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M7.75 9.75C8.81087 9.75 9.82828 9.32857 10.5784 8.57843C11.3286 7.82828 11.75 6.81087 11.75 5.75C11.75 4.68913 11.3286 3.67172 10.5784 2.92157C9.82828 2.17143 8.81087 1.75 7.75 1.75C6.68913 1.75 5.67172 2.17143 4.92157 2.92157C4.17143 3.67172 3.75 4.68913 3.75 5.75C3.75 6.81087 4.17143 7.82828 4.92157 8.57843C5.67172 9.32857 6.68913 9.75 7.75 9.75ZM17.75 6.75C18.5456 6.75 19.3087 6.43393 19.8713 5.87132C20.4339 5.30871 20.75 4.54565 20.75 3.75C20.75 2.95435 20.4339 2.19129 19.8713 1.62868C19.3087 1.06607 18.5456 0.75 17.75 0.75C16.9544 0.75 16.1913 1.06607 15.6287 1.62868C15.0661 2.19129 14.75 2.95435 14.75 3.75C14.75 4.54565 15.0661 5.30871 15.6287 5.87132C16.1913 6.43393 16.9544 6.75 17.75 6.75Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TabTransactionIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 6C16 4.114 16 3.172 15.414 2.586C14.828 2 13.886 2 12 2C10.114 2 9.172 2 8.586 2.586C8 3.172 8 4.114 8 6M2 14C2 10.229 2 8.343 3.172 7.172C4.344 6.001 6.229 6 10 6H14C17.771 6 19.657 6 20.828 7.172C21.999 8.344 22 10.229 22 14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M12 17.333C13.105 17.333 14 16.587 14 15.667C14 14.747 13.105 14 12 14C10.895 14 10 13.254 10 12.333C10 11.413 10.895 10.667 12 10.667M12 17.333C10.895 17.333 10 16.587 10 15.667M12 17.333V18M12 10.667V10M12 10.667C13.105 10.667 14 11.413 14 12.333"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function TabProfileIcon({ active }: { active: boolean }) {
  const color = active ? '#90C841' : '#FFFFFF';
  return (
    <Svg width={24} height={24} viewBox="0 0 18 18" fill="none">
      <Path
        d="M0.75 14.75C0.75 13.6891 1.17143 12.6717 1.92157 11.9216C2.67172 11.1714 3.68913 10.75 4.75 10.75H12.75C13.8109 10.75 14.8283 11.1714 15.5784 11.9216C16.3286 12.6717 16.75 13.6891 16.75 14.75C16.75 15.2804 16.5393 15.7891 16.1642 16.1642C15.7891 16.5393 15.2804 16.75 14.75 16.75H2.75C2.21957 16.75 1.71086 16.5393 1.33579 16.1642C0.960714 15.7891 0.75 15.2804 0.75 14.75Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 6.75C10.4069 6.75 11.75 5.40685 11.75 3.75C11.75 2.09315 10.4069 0.75 8.75 0.75C7.09315 0.75 5.75 2.09315 5.75 3.75C5.75 5.40685 7.09315 6.75 8.75 6.75Z"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
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
            <Pressable
              key={tab.name}
              className="items-center justify-center"
              style={{ minWidth: 64 }}
              onPress={() => onTabPress(tab.name)}>
              {tab.icon(isActive)}
              <Text
                className={`font-jakarta-medium text-xs ${
                  isActive ? 'text-primary-main' : 'text-white'
                }`}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
