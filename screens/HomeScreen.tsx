import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

import { Avatar } from '../components/Avatar';
import { BottomTabBar, TabName } from '../components/BottomTabBar';
import { DueItem } from '../components/DueItem';
import {
  NotificationIcon,
  EyeIcon,
  AddMoneyIcon,
  SendMoneyIcon,
} from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  userImage?: string;
  balance?: number;
}

export function HomeScreen({
  userName = 'Olamide',
  userImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  balance = 3000.05,
}: HomeScreenProps) {
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
    return value.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
      {/* Header Section with Green Background */}
      <View className="bg-primary-dark" style={{ paddingTop: insets.top }}>
        {/* Decorative Background Shapes */}
        <View className="absolute right-0 top-0 opacity-20">
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <Circle cx="180" cy="20" r="80" fill="#98B80B" />
            <Path d="M100 100 Q150 50 200 100 Q150 150 100 100" fill="#98B80B" />
          </Svg>
        </View>

        {/* Top Bar */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: userImage }}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="font-jakarta text-sm text-white/70">{getGreeting()},</Text>
              <Text className="font-jakarta-bold text-lg text-white">{userName}</Text>
            </View>
          </View>

          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <NotificationIcon size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Balance Section */}
        <View className="items-center px-5 pb-6 pt-4">
          <TouchableOpacity
            className="mb-2 flex-row items-center"
            onPress={() => setShowBalance(!showBalance)}>
            <Text className="font-jakarta mr-2 text-sm text-primary-main">Available Balance</Text>
            <EyeIcon size={16} color="#D1E76F" />
          </TouchableOpacity>

          <Text className="font-jakarta-bold text-5xl text-white">
            ₦{showBalance ? formatBalance(balance) : '••••••'}
          </Text>

          {/* Action Buttons */}
          <View className="mt-6 flex-row gap-4">
            <TouchableOpacity
              className="flex-row items-center rounded-full bg-primary-main px-5 py-3"
              activeOpacity={0.8}>
              <AddMoneyIcon size={18} color="#024E44" />
              <Text className="font-jakarta-semibold ml-2 text-sm text-primary-dark">
                Add money
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center rounded-full bg-primary-main px-5 py-3"
              activeOpacity={0.8}>
              <SendMoneyIcon size={18} color="#024E44" />
              <Text className="font-jakarta-semibold ml-2 text-sm text-primary-dark">
                Send money
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* White Content Section */}
      <View className="flex-1 bg-white">
        {/* Upcoming Dues Header */}
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <Text className="font-jakarta-bold text-lg text-gray-900">Upcoming Dues</Text>
          <TouchableOpacity>
            <Text className="font-jakarta-semibold text-sm text-gray-500">View all&gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Dues List */}
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

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}
