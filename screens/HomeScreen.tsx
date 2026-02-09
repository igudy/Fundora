import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05 }: HomeScreenProps) {
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

  const upcomingDues = [
    {
      id: '1',
      initials: 'W',
      title: 'Wagmi',
      date: '3 Jun, 6:22 PM',
      amount: 45333.0,
      members: [
        { imageUrl: 'https://i.pravatar.cc/100?img=1' },
        { imageUrl: 'https://i.pravatar.cc/100?img=2' },
        { imageUrl: 'https://i.pravatar.cc/100?img=3' },
        { initials: 'A' },
        { initials: 'B' },
        { initials: 'C' },
        { initials: 'D' },
      ],
    },
    {
      id: '2',
      initials: 'JT',
      title: 'Japan Trip',
      date: '3 Jun, 6:22 PM',
      amount: 30333.0,
      members: [
        { imageUrl: 'https://i.pravatar.cc/100?img=4' },
        { imageUrl: 'https://i.pravatar.cc/100?img=5' },
        { imageUrl: 'https://i.pravatar.cc/100?img=6' },
        { initials: 'X' },
        { initials: 'Y' },
        { initials: 'Z' },
        { initials: 'W' },
      ],
    },
    {
      id: '3',
      initials: 'W',
      title: 'Wagmi',
      date: '3 Jun, 6:22 PM',
      amount: 45333.0,
      members: [
        { imageUrl: 'https://i.pravatar.cc/100?img=7' },
        { imageUrl: 'https://i.pravatar.cc/100?img=8' },
        { imageUrl: 'https://i.pravatar.cc/100?img=9' },
        { initials: 'P' },
        { initials: 'Q' },
        { initials: 'R' },
        { initials: 'S' },
      ],
    },
    {
      id: '4',
      initials: 'W',
      title: 'Wagmi',
      date: '3 Jun, 6:22 PM',
      amount: 45333.0,
      members: [
        { imageUrl: 'https://i.pravatar.cc/100?img=10' },
        { imageUrl: 'https://i.pravatar.cc/100?img=11' },
        { imageUrl: 'https://i.pravatar.cc/100?img=12' },
        { initials: 'M' },
        { initials: 'N' },
        { initials: 'O' },
        { initials: 'L' },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Green status bar background */}
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

        {/* Top Bar */}
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
            ₦{showBalance ? formatBalance(balance) : '••••••'}
          </Text>

          <View className="mt-6 flex-row gap-4">
            <TouchableOpacity
              className="flex-row items-center rounded-md px-5 py-3"
              style={{ backgroundColor: '#D1E76F' }}
              activeOpacity={0.8}>
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
          <TouchableOpacity>
            <Text className="font-jakarta-regular *: text-sm text-[#024E44]">
              View all&gt;&gt;&gt;
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

        <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </View>
  );
}
