import { ReactNode } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  icon?: ReactNode;
}

export function Input({ icon, style, ...props }: InputProps) {
  return (
    <View className="flex-row items-center rounded-2xl bg-gray-100 px-4 py-4">
      {icon && <View className="mr-3">{icon}</View>}
      <TextInput
        className="font-jakarta flex-1 text-base text-gray-900"
        placeholderTextColor="#9CA3AF"
        style={style}
        {...props}
      />
    </View>
  );
}
