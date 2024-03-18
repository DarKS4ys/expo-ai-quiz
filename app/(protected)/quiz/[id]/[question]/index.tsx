import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Question, Quiz } from '../../../../../types/quiz';
import { useColorScheme } from 'nativewind';
import { TopBar } from '../../../../_components/TopBar';
import { fetchQuizById } from '../../../../../lib/db';
import clsx from 'clsx';
import * as Progress from 'react-native-progress';
import RippleButton from '../../../../_components/RippleButton';
import Button from '../../../../_components/Button';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function QuestionPage() {
  const { question, id } = useLocalSearchParams<{
    question: string;
    id: string;
  }>();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props: any) => (
        <TopBar title={`Soru ${question}` || 'Yükleniyor...'} {...props} />
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
          console.log(fetchedQuiz);
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
        'h-full items-center justify-center px-6 py-4',
        isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]'
      )}
    >
      <View className="space-y-3">
        {question && quiz && (
          <Animated.View
            entering={FadeInUp.duration(1000).springify().delay(50)}
            className={clsx(
              'p-3 mb-8 flex-row items-center space-x-2 justify-between rounded-2xl',
              isDarkMode ? 'bg-white/5' : 'bg-black/5'
            )}
          >
            <View className="w-full flex-row items-center space-x-2">
              <Progress.Bar
                progress={Number(question) / Number(quiz?.questions)}
                className="w-[90%]"
              />
              <Text
                className={clsx(
                  isDarkMode ? 'text-violet-600' : 'text-violet-900'
                )}
              >{`${question}/${quiz?.questions}`}</Text>
            </View>
          </Animated.View>
        )}

        {quiz && question ? (
          <Animated.View
            entering={FadeInUp.duration(1000).springify().delay(250)}
            className={clsx(
              'p-4 items-center space-x-2 justify-between rounded-2xl',
              isDarkMode ? 'bg-white/5' : 'bg-black/5'
            )}
          >
            <Text className="dark:text-white text-xl font-bold">
              {quiz?.questionsData[Number(question) - 1].title ||
                'Yükleniyor...'}
            </Text>
          </Animated.View>
        ) : (
          <ActivityIndicator size="large" color={primaryColor} />
        )}

        <View className="pt-2">
          {(quiz && question) && (
            quiz?.questionsData[Number(question) - 1].options.map(
              (option, i) => (
                <Animated.View
                  entering={FadeInDown.duration(1000)
                    .springify()
                    .delay(250 + i * 100)}
                  key={i}
                >
                  <RippleButton styling>
                    <Text className="dark:text-white text-lg font-medium">
                      {option}
                    </Text>
                  </RippleButton>
                </Animated.View>
              )
            )
          )}
        </View>

        {question && quiz && (
          <Animated.View
            entering={FadeInDown.duration(1000).springify().delay(650)}
            className="pt-4"
          >
            <Button styling2>
              <Text className="text-xl font-semibold">Sonraki</Text>
            </Button>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
