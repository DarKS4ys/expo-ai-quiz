import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { fetchQuizById } from '../../../../lib/db';
import { Quiz } from '../../../../types/quiz';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import { TopBar } from '../../../_components/TopBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RippleButton from '../../../_components/RippleButton';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function QuizPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props: any) => (
        <TopBar title={quiz?.name || 'Yükleniyor...'} {...props} />
      ),
    });
  }, [navigation, quiz]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setLoading(true);
          const fetchedQuiz = await fetchQuizById(id);
          if (fetchedQuiz) {
            setQuiz(fetchedQuiz);
          }
          /* console.log(fetchedQuiz); */
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <SafeAreaView
      className={clsx(
        'h-full px-6 py-4',
        isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]'
      )}
    >
      <View className="space-y-3">
        <Animated.View
          entering={FadeInUp.duration(1000).springify().delay(50)}
          className={clsx(
            'w-full h-48 rounded-xl flex items-center justify-center',
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          )}
        >
          {quiz?.image ? (
            <Image
              className="w-full h-full"
              source={{ uri: quiz.image }}
              style={{ width: 192, height: 192 }}
            />
          ) : (
            <View className="h-full w-full flex items-center justify-center">
              <MaterialCommunityIcons
                name="emoticon-poop"
                size={64}
                color={primaryColor}
              />
            </View>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(1000).springify().delay(250)}
          className="mt-2"
        >
          <RippleButton
            rounded
            onPress={() => router.push(`quiz/${quiz?.id}/1`)}
          >
            <Text className="text-xl font-semibold uppercase">
              Çözmeye Başla
            </Text>
          </RippleButton>
        </Animated.View>

        <View className="flex-row space-x-2 pt-8 items-center justify-between">
          <Text className="dark:text-white text-3xl font-semibold ">
            {quiz?.name || 'Yükleniyor...'}
          </Text>

          <Text className="dark:text-white text-2xl font-semibold ">
            {quiz?.questions ? `${quiz?.questions} soru` : '?'}
          </Text>
        </View>

        <View className="space-y-2">
          {quiz?.questionsData.map((question, i) => (
            <Animated.View
              entering={FadeInDown.duration(1000).springify().delay(250 + i * 100)}
              key={i}
              className={clsx(
                isDarkMode ? 'bg-white/5' : 'bg-black/5',
                'p-6 rounded-2xl flex-row items-center space-x-8'
              )}
            >
              <Text className="dark:text-white font-medium text-lg">{i + 1}</Text>
              <Text className="dark:text-white font-medium line-clamp-1 text-lg">
                {question.title}
              </Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
