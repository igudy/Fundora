import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

import { Avatar } from '../components/Avatar';
import { AvatarGroup } from '../components/AvatarGroup';
import { ArrowLeftIcon } from '../components/icons';

interface DueMember {
  imageUrl?: string;
  initials?: string;
}

interface DueData {
  id: string;
  initials: string;
  title: string;
  date: string;
  amount: number;
  members: DueMember[];
}

function CalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
        stroke="#9CA3AF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-10" style={{ paddingBottom: 80 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#F0FDF4',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={12} r={10} stroke="#024E44" strokeWidth={1.5} />
          <Path
            d="M9 12l2 2 4-4"
            stroke="#024E44"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      <Text className="font-jakarta-semibold text-lg text-[#23262F]">All caught up!</Text>
      <Text className="mt-2 text-center font-jakarta text-sm text-gray-400">
        You have no upcoming dues at the moment. Join or create a group to get started.
      </Text>
    </View>
  );
}

const formatAmount = (value: number) => {
  return value.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function DueCard({ item }: { item: DueData }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
      }}>
      <View className="flex-row items-center">
        <Avatar size={44} initials={item.initials} backgroundColor="#E9FFC9" textColor="#024E44" />

        <View className="ml-3 flex-1">
          <Text className="font-jakarta-semibold text-base text-[#23262F]">{item.title}</Text>
          <View className="mt-1 flex-row items-center" style={{ gap: 4 }}>
            <CalendarIcon size={14} />
            <Text className="font-jakarta text-xs text-gray-400">{item.date}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="font-jakarta-bold text-base text-[#024E44]">
            ₦{formatAmount(item.amount)}
          </Text>
        </View>
      </View>

      {item.members.length > 0 && (
        <View
          className="mt-3 flex-row items-center justify-between"
          style={{
            borderTopWidth: 1,
            borderTopColor: '#F9FAFB',
            paddingTop: 12,
          }}>
          <View className="flex-row items-center" style={{ gap: 6 }}>
            <AvatarGroup avatars={item.members} maxDisplay={4} size={24} />
            <Text className="font-jakarta text-xs text-gray-400">
              {item.members.length} member{item.members.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#F0FDF4',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
            <Text className="font-jakarta-medium text-xs text-[#024E44]">Due</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

interface UpcomingDuesScreenProps {
  onBack: () => void;
}

const DUES_DATA: DueData[] = [
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
    ],
  },
  {
    id: '3',
    initials: 'RB',
    title: 'Rent & Bills',
    date: '10 Jun, 12:00 PM',
    amount: 150000.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=7' },
      { imageUrl: 'https://i.pravatar.cc/100?img=8' },
      { initials: 'K' },
    ],
  },
  {
    id: '4',
    initials: 'GN',
    title: 'Game Night Fund',
    date: '12 Jun, 7:00 PM',
    amount: 5000.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=9' },
      { imageUrl: 'https://i.pravatar.cc/100?img=10' },
      { imageUrl: 'https://i.pravatar.cc/100?img=11' },
      { initials: 'T' },
      { initials: 'U' },
    ],
  },
  {
    id: '5',
    initials: 'WD',
    title: 'Wedding Gift',
    date: '15 Jun, 2:00 PM',
    amount: 25000.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=12' },
      { imageUrl: 'https://i.pravatar.cc/100?img=13' },
      { imageUrl: 'https://i.pravatar.cc/100?img=14' },
      { initials: 'F' },
      { initials: 'G' },
      { initials: 'H' },
    ],
  },
  {
    id: '6',
    initials: 'GY',
    title: 'Gym Membership',
    date: '18 Jun, 9:00 AM',
    amount: 12500.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=15' },
      { initials: 'L' },
    ],
  },
  {
    id: '7',
    initials: 'BC',
    title: 'Book Club',
    date: '20 Jun, 5:00 PM',
    amount: 3500.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=16' },
      { imageUrl: 'https://i.pravatar.cc/100?img=17' },
      { imageUrl: 'https://i.pravatar.cc/100?img=18' },
      { initials: 'R' },
    ],
  },
  {
    id: '8',
    initials: 'HP',
    title: 'House Party',
    date: '22 Jun, 8:00 PM',
    amount: 18000.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=19' },
      { imageUrl: 'https://i.pravatar.cc/100?img=20' },
      { imageUrl: 'https://i.pravatar.cc/100?img=21' },
      { initials: 'N' },
      { initials: 'O' },
      { initials: 'P' },
      { initials: 'Q' },
    ],
  },
  {
    id: '9',
    initials: 'VS',
    title: 'Vacation Savings',
    date: '25 Jun, 10:00 AM',
    amount: 75000.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=22' },
      { imageUrl: 'https://i.pravatar.cc/100?img=23' },
      { initials: 'S' },
      { initials: 'V' },
    ],
  },
  {
    id: '10',
    initials: 'EF',
    title: 'Emergency Fund',
    date: '28 Jun, 12:00 PM',
    amount: 50000.0,
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=24' },
      { initials: 'M' },
    ],
  },
];

export function UpcomingDuesScreen({ onBack }: UpcomingDuesScreenProps) {
  const insets = useSafeAreaInsets();

  const totalDue = DUES_DATA.reduce((sum, d) => sum + d.amount, 0);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-5 pb-4 pt-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            style={{ width: 40, height: 40, justifyContent: 'center' }}>
            <ArrowLeftIcon size={24} color="#024E44" />
          </TouchableOpacity>
          <Text className="ml-2 font-jakarta-bold text-xl text-[#23262F]">Upcoming Dues</Text>
        </View>
      </View>

      {/* Summary card */}
      <View className="mx-5 mb-5">
        <View
          style={{
            backgroundColor: '#024E44',
            borderRadius: 16,
            padding: 20,
          }}>
          <Text className="font-jakarta text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Total Upcoming
          </Text>
          <Text className="mt-1 font-jakarta-bold text-3xl text-white">
            ₦{formatAmount(totalDue)}
          </Text>
          <View className="mt-3 flex-row items-center" style={{ gap: 6 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#D1E76F',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text className="font-jakarta-bold text-[10px] text-[#024E44]">
                {DUES_DATA.length}
              </Text>
            </View>
            <Text className="font-jakarta text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              active dues
            </Text>
          </View>
        </View>
      </View>

      {/* Section label */}
      <View className="flex-row items-center justify-between px-5 pb-3">
        <Text className="font-jakarta-medium text-sm text-gray-400">ALL DUES</Text>
        <Text className="font-jakarta text-xs text-gray-300">
          Sorted by date
        </Text>
      </View>

      {/* Dues list */}
      <FlatList
        data={DUES_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DueCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyState}
      />
    </View>
  );
}
