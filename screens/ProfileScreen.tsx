import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

import { BottomTabBar, TabName } from '../components/BottomTabBar';

function PersonIcon({ size = 22, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function LockIcon({ size = 22, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={11}
        width={18}
        height={11}
        rx={2}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7a5 5 0 0110 0v4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PaymentIcon({ size = 22, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={1}
        y={4}
        width={22}
        height={16}
        rx={2}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M1 10h22" stroke={color} strokeWidth={1.8} />
      <Path d="M5 16h4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function BellIcon({ size = 22, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function HelpIcon({ size = 22, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.8} />
      <Path
        d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={17} r={0.5} fill={color} stroke={color} strokeWidth={0.5} />
    </Svg>
  );
}

function InfoIcon({ size = 22, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.8} />
      <Path
        d="M12 16v-4M12 8h.01"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronRightIcon({ size = 20, color = '#9CA3AF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const menuItems = [
  { id: 'personal', label: 'Personal Information', icon: PersonIcon },
  { id: 'security', label: 'Security & Privacy', icon: LockIcon },
  { id: 'payment', label: 'Payment Methods', icon: PaymentIcon },
  { id: 'notifications', label: 'Notification Settings', icon: BellIcon },
  { id: 'help', label: 'Help & Support', icon: HelpIcon },
  { id: 'about', label: 'About', icon: InfoIcon },
];

interface ProfileScreenProps {
  onBack: () => void;
  onTabPress?: (tab: TabName) => void;
  userName?: string;
  email?: string;
}

export function ProfileScreen({
  onBack,
  onTabPress,
  userName = 'Olamide',
  email = 'olamide@email.com',
}: ProfileScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      {/* Green status bar background */}
      <View
        className="absolute left-0 right-0 top-0 bg-primary-dark"
        style={{ height: insets.top }}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Green Header */}
        <View
          className="items-center overflow-hidden bg-primary-dark"
          style={{
            paddingTop: insets.top + 24,
            paddingBottom: 36,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}>
          {/* Avatar */}
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              borderWidth: 3,
              borderColor: '#D1E76F',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/200?img=68' }}
              style={{ width: 104, height: 104, borderRadius: 52 }}
            />
          </View>

          <Text className="mt-4 font-jakarta-bold text-2xl text-white">{userName}</Text>
          <Text className="mt-1 font-jakarta text-sm" style={{ color: '#D1E76F' }}>
            {email}
          </Text>
        </View>

        {/* Menu Items */}
        <View className="px-5" style={{ paddingTop: 24, paddingBottom: insets.bottom + 100 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                className="flex-row items-center rounded-2xl"
                style={{
                  backgroundColor: '#F5F5F5',
                  paddingVertical: 18,
                  paddingHorizontal: 16,
                  marginBottom: 12,
                }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#D1E76F',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon size={22} color="#024E44" />
                </View>
                <Text className="ml-4 flex-1 font-jakarta-medium text-base text-[#23262F]">
                  {item.label}
                </Text>
                <ChevronRightIcon size={20} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}

          {/* Logout Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-2 items-center rounded-2xl"
            style={{
              backgroundColor: '#FEE2E2',
              paddingVertical: 18,
            }}>
            <Text className="font-jakarta-semibold text-base" style={{ color: '#EF4444' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <BottomTabBar
          activeTab="profile"
          onTabPress={(tab) => {
            if (tab !== 'profile') {
              onTabPress?.(tab);
            }
          }}
        />
      </View>
    </View>
  );
}
