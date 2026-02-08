import { View, Text, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { GoogleIcon } from '@/components/icons';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // TODO: Implement login logic
    router.replace('/(tabs)');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="#024E44" />
        </Pressable>
        <Text className="text-primary text-xl font-sans-bold ml-2">
          Welcome back
        </Text>
      </View>

      {/* Form */}
      <View className="flex-1 px-6 pt-6">
        <View className="gap-4">
          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 ${
                  errors.email ? 'border border-red-400' : ''
                }`}
              >
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-gray-800 font-sans text-base"
                />
              </View>
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs font-sans -mt-2">
              {errors.email.message}
            </Text>
          )}

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 ${
                  errors.password ? 'border border-red-400' : ''
                }`}
              >
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-gray-800 font-sans text-base"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs font-sans -mt-2">
              {errors.password.message}
            </Text>
          )}

          {/* Forgot Password */}
          <Pressable className="self-end">
            <Text className="text-primary font-sans-medium text-sm">
              Forgot password?
            </Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-primary py-4 rounded-xl items-center mt-8 active:opacity-90"
        >
          <Text className="text-white font-sans-semibold text-base">
            Log In
          </Text>
        </Pressable>

        {/* OR Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-400 font-sans">OR</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Google Sign In */}
        <Pressable
          onPress={handleGoogleLogin}
          className="flex-row items-center justify-center border border-gray-200 py-4 rounded-xl active:bg-gray-50"
        >
          <GoogleIcon width={20} height={20} />
          <Text className="text-gray-700 font-sans-medium text-base ml-3">
            Sign in with Google
          </Text>
        </Pressable>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500 font-sans">
            Don't have an account?{' '}
          </Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-primary font-sans-semibold underline">
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
