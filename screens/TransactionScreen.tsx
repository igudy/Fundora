import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { ArrowLeftIcon } from '../components/icons';
import { BottomTabBar, TabName } from '../components/BottomTabBar';

function ArrowUpIcon({ size = 18, color = '#16A34A' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19V5M5 12l7-7 7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ArrowDownIcon({ size = 18, color = '#EF4444' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M19 12l-7 7-7-7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

type TransactionType = 'credit' | 'debit';
type FilterType = 'all' | 'credit' | 'debit';

interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  time: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    title: 'Money Received',
    subtitle: 'John Doe \u2022 Oct 14, 2025',
    amount: 5000,
    time: '3:45 PM',
  },
  {
    id: '2',
    type: 'debit',
    title: 'Group Contribution',
    subtitle: 'Wagmi \u2022 Oct 13, 2025',
    amount: 45333,
    time: '10:22 AM',
  },
  {
    id: '3',
    type: 'debit',
    title: 'Money Sent',
    subtitle: 'Sarah Williams \u2022 Oct 12, 2025',
    amount: 3000,
    time: '5:15 PM',
  },
  {
    id: '4',
    type: 'credit',
    title: 'Wallet Funding',
    subtitle: 'Bank Transfer \u2022 Oct 11, 2025',
    amount: 50000,
    time: '2:30 PM',
  },
  {
    id: '5',
    type: 'debit',
    title: 'Group Contribution',
    subtitle: 'Japan Trip \u2022 Oct 10, 2025',
    amount: 30333,
    time: '11:00 AM',
  },
  {
    id: '6',
    type: 'credit',
    title: 'Money Received',
    subtitle: 'Alex Johnson \u2022 Oct 9, 2025',
    amount: 15000,
    time: '9:30 AM',
  },
  {
    id: '7',
    type: 'debit',
    title: 'Money Sent',
    subtitle: 'David Chen \u2022 Oct 8, 2025',
    amount: 7500,
    time: '4:00 PM',
  },
  {
    id: '8',
    type: 'credit',
    title: 'Wallet Funding',
    subtitle: 'Card Payment \u2022 Oct 7, 2025',
    amount: 100000,
    time: '1:15 PM',
  },
  {
    id: '9',
    type: 'debit',
    title: 'Group Contribution',
    subtitle: 'Wedding Fund \u2022 Oct 6, 2025',
    amount: 25000,
    time: '8:45 AM',
  },
  {
    id: '10',
    type: 'credit',
    title: 'Money Received',
    subtitle: 'Grace Obi \u2022 Oct 5, 2025',
    amount: 8000,
    time: '6:20 PM',
  },
];

function formatAmount(amount: number, type: TransactionType): string {
  const prefix = type === 'credit' ? '+' : '-';
  return `${prefix}₦${amount.toLocaleString('en-NG')}.00`;
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.type === 'credit';

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderLeftWidth: 4,
        borderLeftColor: isCredit ? '#D1E76F' : '#FCA5A5',
      }}>
      <View className="flex-row items-center">
        {/* Icon */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: isCredit ? '#F0FDF4' : '#FEF2F2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isCredit ? (
            <ArrowUpIcon size={18} color="#16A34A" />
          ) : (
            <ArrowDownIcon size={18} color="#EF4444" />
          )}
        </View>

        {/* Title + Subtitle */}
        <View className="ml-3 flex-1">
          <Text className="font-jakarta-bold text-base text-[#23262F]">{transaction.title}</Text>
          <Text className="mt-1 font-jakarta text-xs text-gray-400">{transaction.subtitle}</Text>
        </View>

        {/* Amount + Time */}
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            className="font-jakarta-bold text-base"
            style={{ color: isCredit ? '#024E44' : '#EF4444' }}>
            {formatAmount(transaction.amount, transaction.type)}
          </Text>
          <Text className="mt-1 font-jakarta text-xs text-gray-400">{transaction.time}</Text>
        </View>
      </View>
    </View>
  );
}

interface TransactionScreenProps {
  onBack: () => void;
  onTabPress?: (tab: TabName) => void;
}

export function TransactionScreen({ onBack, onTabPress }: TransactionScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'credit', label: 'Credit' },
    { key: 'debit', label: 'Debit' },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.type === activeFilter;
  });

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

        <Text className="mt-5 font-jakarta-bold text-3xl text-[#23262F]">Transactions</Text>
        <Text className="mt-1 font-jakarta text-sm text-gray-400">
          View your transaction history
        </Text>
      </View>

      {/* Filter Tabs */}
      <View className="flex-row px-5" style={{ marginTop: 20, gap: 10 }}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(filter.key)}
              style={{
                backgroundColor: isActive ? '#024E44' : '#FFFFFF',
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: isActive ? '#024E44' : '#E5E7EB',
              }}>
              <Text
                className="font-jakarta-medium text-sm"
                style={{ color: isActive ? '#FFFFFF' : '#23262F' }}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center pt-16">
            <Text className="font-jakarta-medium text-base text-gray-400">
              No transactions found
            </Text>
          </View>
        }
      />

      {/* Bottom Tab Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <BottomTabBar
          activeTab="transaction"
          onTabPress={(tab) => {
            if (tab !== 'transaction') {
              onTabPress?.(tab);
            }
          }}
        />
      </View>
    </View>
  );
}
