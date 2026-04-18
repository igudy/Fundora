const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, 'screens', 'HomeScreen.tsx');
const BACKUP = TARGET + '.bak';
const DELAY = 5000; // 5 seconds between stages

// Back up original
fs.copyFileSync(TARGET, BACKUP);
console.log('✓ Original backed up');

const stage1 = `import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import {
  NotifBellIcon,
  TopSectionDecor,
  BottomSectionDecor,
} from '../components/icons';

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
      </View>
    </View>
  );
}
`;

const stage2 = `import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarImage } from '../components/AvatarImage';
import {
  EyeIcon,
  EyeOffIcon,
  NotifBellIcon,
  TopSectionDecor,
  BottomSectionDecor,
} from '../components/icons';

interface HomeScreenProps {
  userName?: string;
  balance?: number;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ userName = 'Olamide', balance = 3000.05, onNavigate }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
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
            \\u20A6{showBalance ? formatBalance(balance) : '\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022'}
          </Text>
        </View>
      </View>
    </View>
  );
}
`;

const stages = [stage1, stage2];

async function run() {
  for (let i = 0; i < stages.length; i++) {
    console.log(`→ Writing stage ${i + 1}/${stages.length}...`);
    fs.writeFileSync(TARGET, stages[i]);
    if (i < stages.length - 1) {
      console.log(`  Waiting ${DELAY / 1000}s for hot reload...`);
      await new Promise(r => setTimeout(r, DELAY));
    }
  }

  console.log('\n✓ Test done! Waiting 5s then restoring original...');
  await new Promise(r => setTimeout(r, DELAY));
  fs.copyFileSync(BACKUP, TARGET);
  fs.unlinkSync(BACKUP);
  console.log('✓ Original restored');
}

run();
