import React from 'react';
import { Image, Text, View } from 'react-native';
import { Quiz } from '../../types/quiz';
import RippleButton from './RippleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function QuizCard({
  isDarkMode,
  quiz,
}: {
  isDarkMode: boolean;
  quiz: Quiz;
}) {
  const primaryColor = isDarkMode ? 'white' : 'black';
  return (
    <RippleButton onPress={() => router.push({
      pathname: "/quiz/[id]",
      params: {id: quiz.id}
    })} dark={isDarkMode} styling>
      <View className="flex gap-4">
        {quiz.image ? (
          <Image
            source={{ uri: quiz.image }}
            style={{ width: 128, height: 128 }}
          />
        ) : (
          <View className="h-32 w-32 flex items-center justify-center">
            <MaterialCommunityIcons
              name="emoticon-poop"
              size={64}
              color={primaryColor}
            />
          </View>
        )}

        <View>
          <Text className="dark:text-white text-xl font-medium">
            {quiz.name}
          </Text>
          <Text className="dark:text-white text opacity-60">{quiz.questions} soru</Text>
        </View>
      </View>
    </RippleButton>
  );
}
