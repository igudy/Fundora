import { View, Text, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema, type SignupFormData } from '@/lib/validations/auth';
import { GoogleIcon } from '@/components/icons';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      countryCode: '+234',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    // TODO: Implement signup logic
    router.push('/(tabs)');
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google signup
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
          Create your account
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

          {/* Phone Input */}
          <View
            className={`flex-row items-center bg-gray-50 rounded-xl ${
              errors.phoneNumber ? 'border border-red-400' : ''
            }`}
          >
            <Controller
              control={control}
              name="countryCode"
              render={({ field: { value } }) => (
                <Pressable className="flex-row items-center px-4 py-4 border-r border-gray-200">
                  <Ionicons name="call-outline" size={20} color="#6B7280" />
                  <Text className="ml-2 text-gray-800 font-sans">{value}</Text>
                </Pressable>
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Phone Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  className="flex-1 px-4 py-4 text-gray-800 font-sans text-base"
                />
              )}
            />
          </View>
          {errors.phoneNumber && (
            <Text className="text-red-500 text-xs font-sans -mt-2">
              {errors.phoneNumber.message}
            </Text>
          )}
        </View>

        {/* Create Account Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-primary py-4 rounded-xl items-center mt-8 active:opacity-90"
        >
          <Text className="text-white font-sans-semibold text-base">
            Create an account
          </Text>
        </Pressable>

        {/* OR Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-400 font-sans">OR</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Google Sign Up */}
        <Pressable
          onPress={handleGoogleSignup}
          className="flex-row items-center justify-center border border-gray-200 py-4 rounded-xl active:bg-gray-50"
        >
          <GoogleIcon width={20} height={20} />
          <Text className="text-gray-700 font-sans-medium text-base ml-3">
            Sign up with Google
          </Text>
        </Pressable>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500 font-sans">
            Already have an account?{' '}
          </Text>
          <Pressable onPress={() => router.push('/(auth)/login')}>
            <Text className="text-primary font-sans-semibold underline">
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
