import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import Button from '../_components/Button';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { Quiz } from '../../types/quiz';
import { User } from '../../types/user';
import { fetchQuizzes, fetchUsers } from '../../lib/db';
import QuizCard from '../_components/QuizCard';
import UserCard from '../_components/UserCard';
import Carousel from 'react-native-reanimated-carousel';

export default function Explore() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!user) {
          return;
        }

        const handleUsersUpdate = (fetchedUsers: User[]) => {
          setUsers(fetchedUsers);
        };
        fetchUsers(handleUsersUpdate);

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

  const window = Dimensions.get('window');
  const PAGE_WIDTH = window.width;
  return (
    <ScrollView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <View className="flex gap-y-6 px-6 py-4">
        <View className="flex gap-y-1">
          <Text className="dark:text-white text-[26px] leading-[1] font-semibold">
            Keşfet
          </Text>
          <Text className="dark:text-white text- opacity-60">
            Kişiler, Testler ve dahasını keşfet.
          </Text>
        </View>

        <View className="flex-row items-center justify-between space-x-3 w-full">
          <Animated.View
            entering={FadeInUp.duration(1000).delay(50).springify()}
            className={clsx(
              'p-4 rounded-2xl w-[88%]',
              isDarkMode ? 'bg-white/10' : 'bg-black/10'
            )}
          >
            <TextInput
              placeholder="Ara..."
              value={query}
              onChangeText={setQuery}
              placeholderTextColor={'gray'}
              className="dark:text-white"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.duration(1000).delay(200).springify()}
          >
            <Button>
              <FontAwesome name="search" size={28} color={primaryColor} />
            </Button>
          </Animated.View>
        </View>

        <View className="space-y-3">
          <Text
            className={clsx(
              'dark:text-white z-20 text-2xl font-semibold text-center'
            )}
          >
            Kullanıcılar
          </Text>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="flex-row h-64 w-full "
          >
            {users && !loading ? (
              users.map((user, i) => (
                <Animated.View
                  className={clsx('h-full', i % 2 === 0 && 'mr-2', 'last:ml-2')}
                  style={{ width: PAGE_WIDTH * 0.4287 }}
                  key={i}
                >
                  <UserCard
                    full
                    index={i}
                    isDarkMode={isDarkMode}
                    user={user}
                  />
                </Animated.View>
              ))
            ) : (
              <View
                style={{ width: PAGE_WIDTH * 0.887 }}
                className="w-full h-full items-center justify-center"
              >
                <ActivityIndicator size="large" color={primaryColor} />
              </View>
            )}
          </ScrollView>
        </View>

        <View className="space-y-3 mt-4">
          <Text
            className={clsx(
              'dark:text-white z-20 text-2xl font-semibold text-center'
            )}
          >
            Testler
          </Text>
          <View className="flex flex-row flex-wrap justify-between w-full">
            {quizzes && !loading ? (
              quizzes.map((quiz, i) => (
                <QuizCard
                  extraDelay={300}
                  key={i}
                  index={i}
                  isDarkMode={isDarkMode}
                  quiz={quiz}
                />
              ))
            ) : (
              <View className="w-full h-full items-center justify-center">
                <ActivityIndicator size="large" color={primaryColor} />
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
