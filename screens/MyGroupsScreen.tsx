import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { AvatarGroup } from '../components/AvatarGroup';
import { ArrowLeftIcon } from '../components/icons';

function PlusIcon({ size = 16, color = '#024E44' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface GroupData {
  id: string;
  initials: string;
  name: string;
  targetAmount: number;
  contribution: number;
  progress: number;
  nextDue: string;
  members: { imageUrl?: string; initials?: string }[];
}

const groups: GroupData[] = [
  {
    id: '1',
    initials: 'W',
    name: 'Wagmi',
    targetAmount: 450000,
    contribution: 45333,
    progress: 0.65,
    nextDue: 'Jun 15, 2025',
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=1' },
      { imageUrl: 'https://i.pravatar.cc/100?img=2' },
      { imageUrl: 'https://i.pravatar.cc/100?img=3' },
      { initials: 'A' },
      { initials: 'B' },
      { initials: 'C' },
      { initials: 'D' },
      { initials: 'E' },
    ],
  },
  {
    id: '2',
    initials: 'JT',
    name: 'Japan Trip',
    targetAmount: 1200000,
    contribution: 30333,
    progress: 0.4,
    nextDue: 'Jul 1, 2025',
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=4' },
      { imageUrl: 'https://i.pravatar.cc/100?img=5' },
      { imageUrl: 'https://i.pravatar.cc/100?img=6' },
      { initials: 'X' },
      { initials: 'Y' },
      { initials: 'Z' },
      { initials: 'W' },
      { initials: 'V' },
      { initials: 'U' },
      { initials: 'T' },
      { initials: 'S' },
      { initials: 'R' },
    ],
  },
  {
    id: '3',
    initials: 'WF',
    name: 'Wedding Fund',
    targetAmount: 800000,
    contribution: 65000,
    progress: 0.8,
    nextDue: 'Jul 20, 2025',
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=7' },
      { imageUrl: 'https://i.pravatar.cc/100?img=8' },
      { imageUrl: 'https://i.pravatar.cc/100?img=9' },
      { initials: 'K' },
      { initials: 'L' },
      { initials: 'M' },
    ],
  },
  {
    id: '4',
    initials: 'RB',
    name: 'Rent & Bills',
    targetAmount: 600000,
    contribution: 42000,
    progress: 0.55,
    nextDue: 'Aug 1, 2025',
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=10' },
      { imageUrl: 'https://i.pravatar.cc/100?img=11' },
      { initials: 'N' },
      { initials: 'O' },
    ],
  },
  {
    id: '5',
    initials: 'GN',
    name: 'Game Night Fund',
    targetAmount: 150000,
    contribution: 12500,
    progress: 0.25,
    nextDue: 'Jun 20, 2025',
    members: [
      { imageUrl: 'https://i.pravatar.cc/100?img=12' },
      { imageUrl: 'https://i.pravatar.cc/100?img=13' },
      { imageUrl: 'https://i.pravatar.cc/100?img=14' },
      { initials: 'P' },
      { initials: 'Q' },
    ],
  },
];

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-NG');
}

function GroupCard({ group }: { group: GroupData }) {
  const percentage = Math.round(group.progress * 100);

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
      }}>
      {/* Top Row: Avatar + Name/Members + Target Amount */}
      <View className="flex-row" style={{ marginBottom: 20 }}>
        {/* Avatar */}
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: '#D1E76F',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text className="font-jakarta-bold text-lg" style={{ color: '#024E44' }}>
            {group.initials}
          </Text>
        </View>

        {/* Name + Members */}
        <View className="ml-3 flex-1 justify-center">
          <Text className="font-jakarta-bold text-lg text-[#23262F]">{group.name}</Text>
          <View className="mt-1 flex-row items-center">
            <AvatarGroup avatars={group.members} maxDisplay={3} size={22} />
            <Text className="ml-2 font-jakarta text-xs text-gray-400">
              {group.members.length} members
            </Text>
          </View>
        </View>

        {/* Target Amount */}
        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text className="font-jakarta-bold text-lg" style={{ color: '#024E44' }}>
            ₦{formatCurrency(group.targetAmount)}
          </Text>
          <Text className="font-jakarta text-xs text-gray-400">Target</Text>
        </View>
      </View>

      {/* Contribution + Percentage */}
      <View className="flex-row items-center justify-between" style={{ marginBottom: 10 }}>
        <Text className="font-jakarta-medium text-sm text-gray-500">
          Your contribution: <Text style={{ color: '#024E44' }}>₦{formatCurrency(group.contribution)}</Text>
        </Text>
        <Text className="font-jakarta-bold text-sm" style={{ color: '#90C841' }}>
          {percentage}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 8,
          backgroundColor: '#E8E8E8',
          borderRadius: 4,
          marginBottom: 18,
          overflow: 'hidden',
        }}>
        <View
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: '#D1E76F',
            borderRadius: 4,
          }}
        />
      </View>

      {/* Bottom Row: Next Due + Contribute Button */}
      <View className="flex-row items-center justify-between">
        <Text className="font-jakarta text-xs text-gray-400">Next due: {group.nextDue}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: '#024E44',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 24,
          }}>
          <Text className="font-jakarta-semibold text-sm text-white">Contribute</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface MyGroupsScreenProps {
  onBack: () => void;
}

export function MyGroupsScreen({ onBack }: MyGroupsScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-5 pt-4">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <ArrowLeftIcon size={24} color="#23262F" />
        </TouchableOpacity>

        <Text className="mt-5 font-jakarta-bold text-3xl text-[#23262F]">My Groups</Text>
        <Text className="mt-1 font-jakarta text-sm text-gray-400">
          Manage your contribution groups
        </Text>
      </View>

      {/* Create Group Button - compact pill */}
      <View className="px-5" style={{ marginTop: 20 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center self-start rounded-full"
          style={{
            backgroundColor: '#D1E76F',
            paddingVertical: 12,
            paddingHorizontal: 24,
            gap: 8,
          }}>
          <PlusIcon size={16} color="#024E44" />
          <Text className="font-jakarta-semibold text-sm" style={{ color: '#024E44' }}>
            Create Group
          </Text>
        </TouchableOpacity>
      </View>

      {/* Group List */}
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GroupCard group={item} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
