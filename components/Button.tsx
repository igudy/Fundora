import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-2xl px-8 py-4 ${
        isPrimary ? 'bg-primary-main' : 'border-primary-dark border-2 bg-white'
      }`}
      style={style}
      activeOpacity={0.8}
      {...props}>
      <Text
        className={`font-jakarta-semibold text-lg ${
          isPrimary ? 'text-primary-dark' : 'text-primary-dark'
        }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
