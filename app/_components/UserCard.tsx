import React from 'react';
import { Image, Text, View } from 'react-native';
import { Quiz } from '../../types/quiz';
import RippleButton from './RippleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { User } from '../../types/user';
import { cn } from '../../lib/utils';

export default function UserCard({
  isDarkMode,
  index,
  user,
  full
}: {
  isDarkMode: boolean;
  user: User;
  index: number;
  full?: boolean;
}) {
  const primaryColor = isDarkMode ? 'white' : 'black';
  const placeholderUrl =
    'https://firebasestorage.googleapis.com/v0/b/ai-quiz-tr.appspot.com/o/placeholder-user-500x500.png?alt=media&token=4e57a80c-6c18-4d65-836e-6329393fb6eb';

  return (
    <Animated.View
      entering={FadeInUp.duration(1000)
        .delay(150 * index)
        .springify()}
      className={cn( 
        !full && "w-[47.6%]")}
    >
      <RippleButton
        rounded
        onPress={() =>
          router.push({
            pathname: '/quiz/[id]',
            params: { id: user.id },
          })
        }
        dark={isDarkMode}
        styling
      >
        <View className="flex gap-4">
          <View className="items-center justify-center">
            <Image
              source={{ uri: user.imageUrl || placeholderUrl }}
              style={{ width: 128, height: 128 }}
              className="rounded-lg"
            />
          </View>

          <View>
            <Text className="dark:text-white text-xl font-medium ">
              {user.name}
            </Text>
          </View>
        </View>
      </RippleButton>
    </Animated.View>
  );
}
