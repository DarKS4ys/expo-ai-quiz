import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import clsx from 'clsx';
import * as Progress from 'react-native-progress';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Quiz } from '../../../../../../types/quiz';
import { TopBar } from '../../../../../_components/TopBar';
import {
  fetchQuizById,
  fetchUserById,
  updateUser,
} from '../../../../../../lib/db';
import RippleButton from './../../../../../_components/RippleButton';
import Button from '../../../../../_components/Button';
import { useAuth } from '@clerk/clerk-expo';
import { User } from '../../../../../../types/user';

export default function SummaryPage() {
  const { question, id, correct, mistake } = useGlobalSearchParams<{
    question: string;
    id: string;
    correct: string;
    mistake: string;
  }>();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userDB, setUserDB] = useState<User>();

  const navigation = useNavigation();

  const { userId } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props: any) => <TopBar title={'Sonuçlar'} {...props} />,
    });
  }, [navigation, quiz]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id && userId) {
          setLoading(true);
          const fetchedQuiz = await fetchQuizById(id);
          if (fetchedQuiz) {
            setQuiz(fetchedQuiz);
          }

          const handleUserUpdate = (fetchedUser: User | null) => {
            if (fetchedUser) {
              setUserDB(fetchedUser);
            }
          };
          fetchUserById(userId, handleUserUpdate);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReturn = async () => {
    if (!userId) {
      return;
    }

    const updatedHighScore = Number(correct) * 30;
    const updatedPoints = Number(correct) * 20 - Number(mistake) * 3;

    if (userDB?.highScore ?? 0 > updatedHighScore) {
      await updateUser(userId, {
        points: Number(userDB?.points || 0) + updatedPoints,
      });
    } else {
      await updateUser(userId, {
        highScore: updatedHighScore,
        points: Number(userDB?.points || 0) + updatedPoints,
      });
    }


    router.push('homepage');
  };

  return (
    <SafeAreaView
      className={clsx(
        'h-full items-center justify-center px-6 py-4',
        isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]'
      )}
    >
      <View className="space-y-3">
        {question && quiz && (
          <View className="space-y-4 items-center">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify().delay(50)}
              className="dark:text-white text-3xl font-semibold"
            >
              Sonuçlar
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify().delay(150)}
              className="text-emerald-500 text-2xl font-semibold"
            >
              {correct} Doğru
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify().delay(300)}
              className="text-red-500 text-2xl font-semibold"
            >
              {mistake} Yanlış
            </Animated.Text>

            <Animated.View
              entering={FadeInUp.duration(1000).springify().delay(400)}
              className="flex-row space-x-2"
            >
              <Text className="dark:text-white text-2xl font-semibold">
                {Number(correct) * 30} Puan
              </Text>
              <Text className="dark:text-white text-2xl font-semibold">
                {Number(correct) * 20 - Number(mistake) * 3} Skor
              </Text>
            </Animated.View>
          </View>
        )}

        {question && quiz && (
          <Animated.View
            entering={FadeInDown.duration(1000).springify().delay(650)}
            className="pt-4"
          >
            <Button onPress={handleReturn} styling2>
              <Text className="text-xl font-semibold">Geri Dön</Text>
            </Button>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
