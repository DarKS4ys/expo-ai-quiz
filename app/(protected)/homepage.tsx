import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import clsx from 'clsx';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../_components/Button';
import {
  fetchQuizzes,
  fetchUserById,
  fetchUsers,
  updateUser,
} from '../../lib/db';
import { User } from '../../types/user';
import { Quiz } from '../../types/quiz';
import QuizCard from '../_components/QuizCard';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userDB, setUserDB] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [userRanking, setUserRanking] = useState(0);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

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

        const handleUserUpdate = (fetchedUser: User | null) => {
          if (fetchedUser) {
            setUserDB(fetchedUser);
          }
        };
        fetchUserById(user.id, handleUserUpdate);

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

  useEffect(() => {
    if (!user || !users || !userDB) {
      return;
    }

    const sortedUsers = users.slice().sort((a, b) => b.highScore - a.highScore);
    const userRanking = sortedUsers.findIndex((u) => u.id === user.id) + 1;
    setUserRanking(userRanking);
  }, [user, users, userDB]);

  const handleRefresh = () => {
    if (!user || !users || !userDB) {
      return;
    }

    const sortedUsers = users.slice().sort((a, b) => b.highScore - a.highScore);
    const userRanking = sortedUsers.findIndex((u) => u.id === user.id) + 1;

    setUserRanking(userRanking);
  };

  const handleAddPoints = async () => {
    if (!user) {
      return;
    }

    try {
      const updatedPoints = userDB ? userDB.points + 10 : 0 + 10;
      await updateUser(user.id, { points: updatedPoints });
      setUserDB((prevUser) => ({ ...prevUser!, points: updatedPoints }));
    } catch (error) {
      console.error('Error adding points:', error);
    }
  };

  return (
    <SafeAreaView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24 }}
        className="py-4 overflow-visible flex gap-y-6"
      >
        <View className="flex flex-row gap-x-2 w-full justify-between items-center">
          <View className="flex gap-y-1">
            <Text className="dark:text-white text-[26px] leading-[1] font-semibold">
              Merhaba {user?.firstName}!
            </Text>
            <Text className="dark:text-white text- opacity-60">
              Uygulamaya hoşgeldin.
            </Text>
          </View>

          <Button onPress={() => router.push('/user')}>
            <Image source={{uri: user?.imageUrl}} width={50} height={50} className='rounded-full overflow-hidden'/>
          </Button>
        </View>

        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          className={clsx(
            'w-full h-28 rounded-2xl flex flex-row divide-x p-4 py-8',
            isDarkMode
              ? 'bg-[#292929] !divide-white/60'
              : 'bg-white divide-black/60 shadow-xl shadow-black/70'
          )}
        >
          <View className="h-full w-1/2 flex flex-row items-center justify-center">
            <Image
              source={require('../../assets/trophy.png')}
              style={{ width: 48, height: 48 }}
            />
            <View className="flex pl-3">
              <Text className="dark:text-white opacity-60">Sıralama</Text>
              <Text className="dark:text-white text-xl font-medium">
                {userRanking}
              </Text>
            </View>
          </View>

          <View className="h-full w-1/2 flex flex-row items-center justify-center">
            <Image
              source={require('../../assets/coin.png')}
              style={{ width: 48, height: 48 }}
            />
            <View className="flex pl-3">
              <Text className="dark:text-white opacity-60">Puanlar</Text>
              <Text className="dark:text-white text-xl font-medium">
                {userDB ? userDB.points : 0}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <Text className="dark:text-white text-2xl font-medium">
            Hadi başlayalım!
          </Text>
          <View className="mt-4 flex flex-row flex-wrap justify-between w-full">
            {quizzes && !loading ? (
              quizzes.map((quiz, i) => (
                <QuizCard
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
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
