const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, 'screens', 'HomeScreen.tsx');
const BACKUP = TARGET + '.bak';
const DELAY = 4000; // 4s between stages

const DUES_DATA = `
  const upcomingDues = [
    { id: '1', initials: 'W', title: 'Wagmi', date: '3 Jun, 6:22 PM', amount: 45333.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=1' }, { imageUrl: 'https://i.pravatar.cc/100?img=2' }, { imageUrl: 'https://i.pravatar.cc/100?img=3' }, { initials: 'A' }, { initials: 'B' }, { initials: 'C' }, { initials: 'D' }] },
    { id: '2', initials: 'JT', title: 'Japan Trip', date: '3 Jun, 6:22 PM', amount: 30333.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=4' }, { imageUrl: 'https://i.pravatar.cc/100?img=5' }, { imageUrl: 'https://i.pravatar.cc/100?img=6' }, { initials: 'X' }, { initials: 'Y' }] },
    { id: '3', initials: 'RB', title: 'Rent & Bills', date: '10 Jun, 12:00 PM', amount: 150000.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=7' }, { imageUrl: 'https://i.pravatar.cc/100?img=8' }, { initials: 'K' }] },
    { id: '4', initials: 'GN', title: 'Game Night Fund', date: '12 Jun, 7:00 PM', amount: 5000.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=9' }, { imageUrl: 'https://i.pravatar.cc/100?img=10' }, { imageUrl: 'https://i.pravatar.cc/100?img=11' }, { initials: 'T' }, { initials: 'U' }] },
    { id: '5', initials: 'WD', title: 'Wedding Gift', date: '15 Jun, 2:00 PM', amount: 25000.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=12' }, { imageUrl: 'https://i.pravatar.cc/100?img=13' }, { imageUrl: 'https://i.pravatar.cc/100?img=14' }, { initials: 'F' }, { initials: 'G' }, { initials: 'H' }] },
    { id: '6', initials: 'GY', title: 'Gym Membership', date: '18 Jun, 9:00 AM', amount: 12500.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=15' }, { initials: 'L' }] },
    { id: '7', initials: 'BC', title: 'Book Club', date: '20 Jun, 5:00 PM', amount: 3500.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=16' }, { imageUrl: 'https://i.pravatar.cc/100?img=17' }, { imageUrl: 'https://i.pravatar.cc/100?img=18' }, { initials: 'R' }] },
    { id: '8', initials: 'HP', title: 'House Party', date: '22 Jun, 8:00 PM', amount: 18000.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=19' }, { imageUrl: 'https://i.pravatar.cc/100?img=20' }, { imageUrl: 'https://i.pravatar.cc/100?img=21' }, { initials: 'N' }, { initials: 'O' }, { initials: 'P' }, { initials: 'Q' }] },
    { id: '9', initials: 'VS', title: 'Vacation Savings', date: '25 Jun, 10:00 AM', amount: 75000.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=22' }, { imageUrl: 'https://i.pravatar.cc/100?img=23' }, { initials: 'S' }, { initials: 'V' }] },
    { id: '10', initials: 'EF', title: 'Emergency Fund', date: '28 Jun, 12:00 PM', amount: 50000.0, members: [{ imageUrl: 'https://i.pravatar.cc/100?img=24' }, { initials: 'M' }] },
  ];`;

// ═══════════════════════════════════════════
// Stage 1: Empty shell
// ═══════════════════════════════════════════
const s1 = `import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 2: Just avatar
// ═══════════════════════════════════════════
const s2 = `import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-4">
        <AvatarImage size={48} />
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 3: Avatar + greeting
// ═══════════════════════════════════════════
const s3 = `import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-5 py-4">
        <AvatarImage size={48} />
        <View className="ml-3">
          <Text className="text-sm">{getGreeting()},</Text>
        </View>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 4: Avatar + greeting + name
// ═══════════════════════════════════════════
const s4 = `import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-5 py-4">
        <AvatarImage size={48} />
        <View className="ml-3">
          <Text className="text-sm">{getGreeting()},</Text>
          <Text className="text-lg font-bold">{userName}</Text>
        </View>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 5: + notification bell
// ═══════════════════════════════════════════
const s5 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 6: + "Available Balance" label
// ═══════════════════════════════════════════
const s6 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pt-6">
        <Text className="text-sm">Available Balance</Text>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 7: + balance amount (WRONG SIZE - text-lg, intentionally small)
// ═══════════════════════════════════════════
const s7 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-lg font-bold">\u20A6{formatBalance(balance)}</Text>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 8: FIX balance size → text-4xl (better but still iterating)
// ═══════════════════════════════════════════
const s8 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pb-8 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-4xl font-bold">\u20A6{formatBalance(balance)}</Text>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 9: + "Add money" button (just text, no style)
// ═══════════════════════════════════════════
const s9 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pb-8 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-4xl font-bold">\u20A6{formatBalance(balance)}</Text>

        <View className="mt-6">
          <TouchableOpacity className="px-5 py-3">
            <Text className="text-sm">Add money</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 10: + "Send money" + borders on both
// ═══════════════════════════════════════════
const s10 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pb-8 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-4xl font-bold">\u20A6{formatBalance(balance)}</Text>

        <View className="mt-6 flex-row" style={{ gap: 16 }}>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Add money</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Send money</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 11: + "Upcoming Dues" header + "View all"
// ═══════════════════════════════════════════
const s11 = `import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pb-8 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-4xl font-bold">\u20A6{formatBalance(balance)}</Text>

        <View className="mt-6 flex-row" style={{ gap: 16 }}>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Add money</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Send money</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
          <Text className="text-lg font-semibold">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="text-sm">View all &gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 12: + dues list items
// ═══════════════════════════════════════════
const s12 = `import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { DueItem } from '../components/DueItem';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };
${DUES_DATA}

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pb-8 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-4xl font-bold">\u20A6{formatBalance(balance)}</Text>

        <View className="mt-6 flex-row" style={{ gap: 16 }}>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Add money</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Send money</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
          <Text className="text-lg font-semibold">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="text-sm">View all &gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {upcomingDues.map((due) => (
            <DueItem
              key={due.id}
              initials={due.initials}
              title={due.title}
              date={due.date}
              amount={due.amount}
              members={due.members}
              onPress={() => console.log('Due pressed:', due.title)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 13: + bottom tab bar
// ═══════════════════════════════════════════
const s13 = `import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { BottomTabBar, TabName } from '../components/BottomTabBar';
import { DueItem } from '../components/DueItem';
import { NotifBellIcon } from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };
${DUES_DATA}

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center">
          <AvatarImage size={48} />
          <View className="ml-3">
            <Text className="text-sm">{getGreeting()},</Text>
            <Text className="text-lg font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotifBellIcon size={40} />
        </TouchableOpacity>
      </View>

      <View className="items-center px-5 pb-8 pt-6">
        <Text className="mb-2 text-sm">Available Balance</Text>
        <Text className="text-4xl font-bold">\u20A6{formatBalance(balance)}</Text>

        <View className="mt-6 flex-row" style={{ gap: 16 }}>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Add money</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md border border-gray-300 px-5 py-3">
            <Text className="text-sm font-semibold">Send money</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
          <Text className="text-lg font-semibold">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="text-sm">View all &gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {upcomingDues.map((due) => (
            <DueItem
              key={due.id}
              initials={due.initials}
              title={due.title}
              date={due.date}
              amount={due.amount}
              members={due.members}
              onPress={() => console.log('Due pressed:', due.title)}
            />
          ))}
        </ScrollView>

        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            if (tab === 'group') onNavigate?.('myGroups');
            else if (tab === 'transaction') onNavigate?.('transactions');
            else if (tab === 'profile') onNavigate?.('profile');
          }}
        />
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 14: STYLE — green header bg + rounded corners + decorations
// ═══════════════════════════════════════════
const s14 = `import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { BottomTabBar, TabName } from '../components/BottomTabBar';
import { DueItem } from '../components/DueItem';
import {
  BottomSectionDecor,
  NotifBellIcon,
  TopSectionDecor,
} from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };
${DUES_DATA}

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 bg-primary-dark"
        style={{ height: insets.top }}
      />

      <View
        className="overflow-hidden bg-primary-dark"
        style={{
          paddingTop: insets.top,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <View className="absolute right-0 top-0 opacity-30">
          <TopSectionDecor width={175} height={127} />
        </View>
        <View className="absolute bottom-0 left-0 opacity-30">
          <BottomSectionDecor width={109} height={165} />
        </View>

        <View className="flex-row items-center justify-between px-5 py-6">
          <View className="flex-row items-center">
            <AvatarImage size={48} />
            <View className="ml-3">
              <Text className="text-sm text-white">{getGreeting()},</Text>
              <Text className="text-lg font-bold text-white">{userName}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <NotifBellIcon size={40} />
          </TouchableOpacity>
        </View>

        <View className="items-center px-5 pb-12 pt-8">
          <Text className="mb-2 text-sm text-white">Available Balance</Text>
          <Text className="text-4xl font-bold text-white">\u20A6{formatBalance(balance)}</Text>

          <View className="mt-6 flex-row" style={{ gap: 16 }}>
            <TouchableOpacity className="rounded-md border border-white/30 px-5 py-3">
              <Text className="text-sm font-semibold text-white">Add money</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md border border-white/30 px-5 py-3">
              <Text className="text-sm font-semibold text-white">Send money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <Text className="text-lg font-semibold">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="text-sm">View all &gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {upcomingDues.map((due) => (
            <DueItem
              key={due.id}
              initials={due.initials}
              title={due.title}
              date={due.date}
              amount={due.amount}
              members={due.members}
              onPress={() => console.log('Due pressed:', due.title)}
            />
          ))}
        </ScrollView>

        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            if (tab === 'group') onNavigate?.('myGroups');
            else if (tab === 'transaction') onNavigate?.('transactions');
            else if (tab === 'profile') onNavigate?.('profile');
          }}
        />
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 15: STYLE — D1E76F accent colors + jakarta fonts on header
// ═══════════════════════════════════════════
const s15 = `import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { BottomTabBar, TabName } from '../components/BottomTabBar';
import { DueItem } from '../components/DueItem';
import {
  BottomSectionDecor,
  NotifBellIcon,
  TopSectionDecor,
} from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };
${DUES_DATA}

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 bg-primary-dark"
        style={{ height: insets.top }}
      />

      <View
        className="overflow-hidden bg-primary-dark"
        style={{
          paddingTop: insets.top,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <View className="absolute right-0 top-0 opacity-30">
          <TopSectionDecor width={175} height={127} />
        </View>
        <View className="absolute bottom-0 left-0 opacity-30">
          <BottomSectionDecor width={109} height={165} />
        </View>

        <View className="flex-row items-center justify-between px-5 py-6">
          <View className="flex-row items-center">
            <AvatarImage size={48} />
            <View className="ml-3">
              <Text className="font-jakarta text-sm" style={{ color: '#D1E76F' }}>
                {getGreeting()},
              </Text>
              <Text className="font-jakarta-bold text-lg text-white">{userName}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <NotifBellIcon size={40} />
          </TouchableOpacity>
        </View>

        <View className="items-center px-5 pb-12 pt-8">
          <Text className="mb-2 font-jakarta text-sm" style={{ color: '#D1E76F' }}>
            Available Balance
          </Text>
          <Text className="text-4xl font-bold text-white">\u20A6{formatBalance(balance)}</Text>

          <View className="mt-6 flex-row" style={{ gap: 16 }}>
            <TouchableOpacity className="rounded-md border border-white/30 px-5 py-3">
              <Text className="text-sm font-semibold text-white">Add money</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md border border-white/30 px-5 py-3">
              <Text className="text-sm font-semibold text-white">Send money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <Text className="font-jakarta-medium text-lg text-[#024E44]">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="font-jakarta text-sm text-[#024E44]">
              View all &gt;&gt;&gt;
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {upcomingDues.map((due) => (
            <DueItem
              key={due.id}
              initials={due.initials}
              title={due.title}
              date={due.date}
              amount={due.amount}
              members={due.members}
              onPress={() => console.log('Due pressed:', due.title)}
            />
          ))}
        </ScrollView>

        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            if (tab === 'group') onNavigate?.('myGroups');
            else if (tab === 'transaction') onNavigate?.('transactions');
            else if (tab === 'profile') onNavigate?.('profile');
          }}
        />
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 16: STYLE — balance text-5xl + eye toggle
// ═══════════════════════════════════════════
const s16 = `import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import { BottomTabBar, TabName } from '../components/BottomTabBar';
import { DueItem } from '../components/DueItem';
import {
  BottomSectionDecor,
  EyeIcon,
  EyeOffIcon,
  NotifBellIcon,
  TopSectionDecor,
} from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [showBalance, setShowBalance] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };
${DUES_DATA}

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 bg-primary-dark"
        style={{ height: insets.top }}
      />

      <View
        className="overflow-hidden bg-primary-dark"
        style={{
          paddingTop: insets.top,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <View className="absolute right-0 top-0 opacity-30">
          <TopSectionDecor width={175} height={127} />
        </View>
        <View className="absolute bottom-0 left-0 opacity-30">
          <BottomSectionDecor width={109} height={165} />
        </View>

        <View className="flex-row items-center justify-between px-5 py-6">
          <View className="flex-row items-center">
            <AvatarImage size={48} />
            <View className="ml-3">
              <Text className="font-jakarta text-sm" style={{ color: '#D1E76F' }}>
                {getGreeting()},
              </Text>
              <Text className="font-jakarta-bold text-lg text-white">{userName}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <NotifBellIcon size={40} />
          </TouchableOpacity>
        </View>

        <View className="items-center px-5 pb-12 pt-8">
          <TouchableOpacity
            className="mb-2 flex-row items-center"
            onPress={() => setShowBalance(!showBalance)}>
            <Text className="mr-2 font-jakarta text-sm" style={{ color: '#D1E76F' }}>
              Available Balance
            </Text>
            {showBalance ? (
              <EyeIcon size={16} color="#D1E76F" />
            ) : (
              <EyeOffIcon size={16} color="#D1E76F" />
            )}
          </TouchableOpacity>

          <Text className="font-jakarta-semibold text-5xl leading-none text-white">
            \u20A6{showBalance ? formatBalance(balance) : '\u2022\u2022\u2022\u2022\u2022\u2022'}
          </Text>

          <View className="mt-6 flex-row" style={{ gap: 16 }}>
            <TouchableOpacity className="rounded-md border border-white/30 px-5 py-3">
              <Text className="text-sm font-semibold text-white">Add money</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md border border-white/30 px-5 py-3">
              <Text className="text-sm font-semibold text-white">Send money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <Text className="font-jakarta-medium text-lg text-[#024E44]">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="font-jakarta text-sm text-[#024E44]">
              View all &gt;&gt;&gt;
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {upcomingDues.map((due) => (
            <DueItem
              key={due.id}
              initials={due.initials}
              title={due.title}
              date={due.date}
              amount={due.amount}
              members={due.members}
              onPress={() => console.log('Due pressed:', due.title)}
            />
          ))}
        </ScrollView>

        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            if (tab === 'group') onNavigate?.('myGroups');
            else if (tab === 'transaction') onNavigate?.('transactions');
            else if (tab === 'profile') onNavigate?.('profile');
          }}
        />
      </View>
    </View>
  );
}
`;

// ═══════════════════════════════════════════
// Stage 17: FINAL — green buttons + icons + AddMoneyModal
// ═══════════════════════════════════════════
const s17 = `import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddMoneyModal } from '../components/AddMoneyModal';
import { AvatarImage } from '../components/AvatarImage';
import { BottomTabBar, TabName } from '../components/BottomTabBar';
import { DueItem } from '../components/DueItem';
import {
  BottomSectionDecor,
  EyeIcon,
  EyeOffIcon,
  MoneyIcon,
  NotifBellIcon,
  SendMoneyIconAlt,
  TopSectionDecor,
} from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [showBalance, setShowBalance] = useState(true);
  const [showAddMoney, setShowAddMoney] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatBalance = (value: number) => {
    return value.toFixed(2);
  };
${DUES_DATA}

  return (
    <View className="flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 bg-primary-dark"
        style={{ height: insets.top }}
      />

      <View
        className="overflow-hidden bg-primary-dark"
        style={{
          paddingTop: insets.top,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <View className="absolute right-0 top-0 opacity-30">
          <TopSectionDecor width={175} height={127} />
        </View>
        <View className="absolute bottom-0 left-0 opacity-30">
          <BottomSectionDecor width={109} height={165} />
        </View>

        <View className="flex-row items-center justify-between px-5 py-6">
          <View className="flex-row items-center">
            <AvatarImage size={48} />
            <View className="ml-3">
              <Text className="font-jakarta text-sm" style={{ color: '#D1E76F' }}>
                {getGreeting()},
              </Text>
              <Text className="font-jakarta-bold text-lg text-white">{userName}</Text>
            </View>
          </View>

          <TouchableOpacity>
            <NotifBellIcon size={40} />
          </TouchableOpacity>
        </View>

        <View className="items-center px-5 pb-12 pt-8">
          <TouchableOpacity
            className="mb-2 flex-row items-center"
            onPress={() => setShowBalance(!showBalance)}>
            <Text className="mr-2 font-jakarta text-sm" style={{ color: '#D1E76F' }}>
              Available Balance
            </Text>
            {showBalance ? (
              <EyeIcon size={16} color="#D1E76F" />
            ) : (
              <EyeOffIcon size={16} color="#D1E76F" />
            )}
          </TouchableOpacity>

          <Text className="font-jakarta-semibold text-5xl leading-none text-white">
            \u20A6{showBalance ? formatBalance(balance) : '\u2022\u2022\u2022\u2022\u2022\u2022'}
          </Text>

          <View className="mt-6 flex-row gap-4">
            <TouchableOpacity
              className="flex-row items-center rounded-md px-5 py-3"
              style={{ backgroundColor: '#D1E76F' }}
              activeOpacity={0.8}
              onPress={() => setShowAddMoney(true)}>
              <MoneyIcon width={20} height={18} color="#024E44" />
              <Text className="ml-2 font-jakarta-semibold text-sm text-primary-dark">
                Add money
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center rounded-md px-5 py-3"
              style={{ backgroundColor: '#D1E76F' }}
              activeOpacity={0.8}>
              <SendMoneyIconAlt width={20} height={18} />
              <Text className="ml-2 font-jakarta-semibold text-sm text-primary-dark">
                Send money
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <Text className="font-jakarta-medium text-lg text-[#024E44]">Upcoming Dues</Text>
          <TouchableOpacity onPress={() => onNavigate?.('upcomingDues')}>
            <Text className="font-jakarta text-sm text-[#024E44]">
              View all &gt;&gt;&gt;
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {upcomingDues.map((due) => (
            <DueItem
              key={due.id}
              initials={due.initials}
              title={due.title}
              date={due.date}
              amount={due.amount}
              members={due.members}
              onPress={() => console.log('Due pressed:', due.title)}
            />
          ))}
        </ScrollView>

        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            if (tab === 'group') onNavigate?.('myGroups');
            else if (tab === 'transaction') onNavigate?.('transactions');
            else if (tab === 'profile') onNavigate?.('profile');
          }}
        />
      </View>

      <AddMoneyModal
        visible={showAddMoney}
        onClose={() => setShowAddMoney(false)}
        onSelectCard={() => onNavigate?.('cardPayment')}
        onSelectBankTransfer={() => onNavigate?.('bankTransfer')}
      />
    </View>
  );
}
`;

const stages = [
  { name: 'Empty shell' },
  { name: 'Avatar' },
  { name: '+ greeting text' },
  { name: '+ name' },
  { name: '+ notification bell' },
  { name: '+ "Available Balance" label' },
  { name: '+ balance amount (wrong size - text-lg)' },
  { name: 'FIX balance size \u2192 text-4xl' },
  { name: '+ "Add money" button (plain)' },
  { name: '+ "Send money" + borders' },
  { name: '+ "Upcoming Dues" header' },
  { name: '+ dues list items' },
  { name: '+ bottom tab bar' },
  { name: 'STYLE: green header + rounded corners + decor' },
  { name: 'STYLE: D1E76F accents + jakarta fonts' },
  { name: 'STYLE: balance text-5xl + eye toggle' },
  { name: 'FINAL: green buttons + icons + modal' },
];

const codes = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17];

async function run() {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(TARGET, BACKUP);
    console.log('\u2713 Original backed up to HomeScreen.tsx.bak');
  } else {
    console.log('\u2713 Backup already exists');
  }
  console.log(`\u2713 ${stages.length} stages, ${DELAY / 1000}s between each (~${Math.round(stages.length * DELAY / 1000)}s total)\n`);

  for (let i = 0; i < stages.length; i++) {
    console.log(`[${String(i + 1).padStart(2)}/${stages.length}] ${stages[i].name}`);
    fs.writeFileSync(TARGET, codes[i]);
    if (i < stages.length - 1) {
      await new Promise(r => setTimeout(r, DELAY));
    }
  }

  console.log('\n\u2713 All stages done!');
  console.log('  Restore: cp screens/HomeScreen.tsx.bak screens/HomeScreen.tsx');
}

run();
