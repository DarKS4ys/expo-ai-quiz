import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import clsx from 'clsx';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './_components/Button';
import { fetchQuizzes, fetchUsers } from '../lib/db';
import { User } from '../types/user';
import { Quiz } from '../types/quiz';
import QuizCard from './_components/QuizCard';
import { Link } from 'expo-router';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);

        const fetchedQuizzes = await fetchQuizzes();
        setQuizzes(fetchedQuizzes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <ScrollView contentContainerStyle={{paddingHorizontal: 24}} className="py-4 overflow-visible flex gap-y-6">
        <View className="flex flex-row gap-x-2 w-full justify-between items-center">
          <View className="flex gap-y-1">
            <Text className="dark:text-white text-[26px] leading-[1] font-semibold">
              Merhaba, Kullanıcı!
            </Text>
            <Text className="dark:text-white text- opacity-60">
              Uygulamaya hoşgeldin.
            </Text>
          </View>

          <Button onPress={toggleColorScheme}>
            {!isDarkMode ? (
              <MaterialIcons name="sunny" size={32} color="black" />
            ) : (
              <MaterialIcons name="dark-mode" size={32} color="white" />
            )}
          </Button>
        </View>

        <View
          className={clsx(
            'w-full h-28 rounded-2xl flex flex-row divide-x p-4 py-8',
            isDarkMode
              ? 'bg-[#292929] !divide-white/60'
              : 'bg-white divide-black/60 shadow-xl shadow-black/70'
          )}
        >
          <View className="h-full w-1/2 flex flex-row items-center justify-center">
            <Image
              source={require('../assets/trophy.png')}
              style={{ width: 48, height: 48 }}
            />
            <View className="flex pl-3">
              <Text className="dark:text-white opacity-60">Sıralama</Text>
              <Text className="dark:text-white text-xl font-medium">1.</Text>
            </View>
          </View>

          <View className="h-full w-1/2 flex flex-row items-center justify-center">
            <Image
              source={require('../assets/coin.png')}
              style={{ width: 48, height: 48 }}
            />
            <View className="flex pl-3">
              <Text className="dark:text-white opacity-60">Puanlar</Text>
              <Text className="dark:text-white text-xl font-medium">47</Text>
            </View>
          </View>
        </View>
        <Link className="dark:text-white" href={'/'}>
          go back
        </Link>

        <View>
          <Text className="dark:text-white text-2xl font-medium">
            Hadi başlayalım!
          </Text>
          <View className="mt-4 flex flex-row flex-wrap justify-between w-full">
            {quizzes && !loading ? (
              quizzes.map((quiz, i) => (
                <QuizCard isDarkMode={isDarkMode} key={i} quiz={quiz} />
              ))
            ) : (
              <View className="w-full h-full items-center justify-center">
                <ActivityIndicator size="large" color={primaryColor} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
