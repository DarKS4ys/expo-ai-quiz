import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { cn } from '../../lib/utils';
import { useUser } from '@clerk/clerk-expo';
import { User } from '../../types/user';
import { fetchUsers } from '../../lib/db';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const Circle = ({
  children,
  size,
  color,
  className,
  name,
  delay,
}: {
  children?: React.ReactNode;
  color?: 'orange' | 'gray' | 'yellow' | undefined;
  className?: string;
  size: 'lg' | 'sm' | 'md';
  name: string;
  delay?: number;
}) => (
  <Animated.View
    entering={FadeInDown.duration(2000)
      .springify()
      .delay(delay ? delay : 0)}
    className={cn(
      'rounded-full p-2 shadow-2xl shadow-black items-center',
      size == 'lg' && 'w-32 h-32 ',
      size == 'md' && 'w-24 h-24',
      size == 'sm' && 'w-16 h-16',
      color == 'gray' && 'bg-gray-400',
      color == 'yellow' && 'bg-yellow-400',
      color == 'orange' && 'bg-orange-500',
      !color && 'bg-blue-600'
    )}
  >
    {children}
    <View
      className={cn(
        color == 'gray' && 'bg-gray-400',
        color == 'yellow' && 'bg-yellow-400',
        color == 'orange' && 'bg-orange-500',
        'rounded-full items-center justify-center w-[75%] absolute -bottom-2',
        size == 'lg' ? 'h-8' : 'h-6'
      )}
    >
      <Text className={cn('break-all truncate font-semibold', size == 'lg' && 'text-lg')}>
        {name ? name.split(' ')[0].length > 4 ? name.split(' ')[0] : name.split(' ')[0] + name.split(' ')[1] : '?'}
      </Text>
    </View>
  </Animated.View>
);

export default function Leaderboard() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const placeholderUrl =
    'https://firebasestorage.googleapis.com/v0/b/ai-quiz-tr.appspot.com/o/placeholder-user-500x500.png?alt=media&token=4e57a80c-6c18-4d65-836e-6329393fb6eb';

  const [loading, setLoading] = useState(true);
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
          const sortedUsers = fetchedUsers.sort(
            (a, b) => b.highScore - a.highScore
          );
          setUsers(sortedUsers);

          /* console.log(sortedUsers); */
        };
        fetchUsers(handleUsersUpdate);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <Image
        className="h-full w-full absolute"
        source={require('../../assets/background2.png')}
      />
      <View className="flex gap-y-6 px-6 py-4 pt-24">
        <View className="flex gap-y-1">
          <Text className="text-white text-[26px] leading-[1] font-semibold">
            Liderlik tablosu
          </Text>
          <Text className="text-white text- opacity-60">
            Sadece en pro elemanlar burada 😎
          </Text>
        </View>

        <View className="flex-row items-end justify-around pt-8">
          <View className="items-center space-y-3">
            <Circle delay={250} name={users[1]?.name} color="gray" size="md">
              <Image
                width={150}
                height={150}
                className="rounded-full w-full h-full"
                source={{ uri: users[1]?.imageUrl || placeholderUrl }}
              />
            </Circle>
            <Text className="dark:text-white font-medium">
              {users[1]?.highScore || 0}
            </Text>
          </View>
          <View className="items-center space-y-3">
            <Circle delay={50} name={users[0]?.name} color="yellow" size="lg">
              <Image
                width={200}
                height={200}
                className="rounded-full w-full h-full"
                source={{ uri: users[0]?.imageUrl || placeholderUrl }}
              />
            </Circle>
            <Text className="dark:text-white font-medium">
              {users[0]?.highScore || 0}
            </Text>
          </View>
          <View className="items-center space-y-3">
            <Circle delay={400} name={users[2]?.name} color="orange" size="md">
              <Image
                width={150}
                height={150}
                className="rounded-full w-full h-full"
                source={{ uri: users[2]?.imageUrl || placeholderUrl }}
              />
            </Circle>
            <Text className="dark:text-white font-medium">
              {users[2]?.highScore || 0}
            </Text>
          </View>
        </View>

        <View className="flex pt-4 space-y-3.5">
          {users.slice(3).map((userItem, index) => (
            <Animated.View
            entering={FadeInDown.duration(1000).springify().delay(350 + (150 * index))}
              key={index}
              className={cn(
                'rounded-2xl  items-center justify-between w-full flex-row space-x-4 px-6 py-4',
                isDarkMode ? 'bg-white/5' : 'bg-black/5',
                userItem.id === user?.id && 'bg-violet-600' 
              )}
            >
              <View className="items-center flex-row space-x-2.5">
                <Text className={cn("dark:text-white", userItem.id !== user?.id && 'opacity-50')}>{index + 4}</Text>
                <Image
                  width={150}
                  height={150}
                  className="rounded-full w-12 h-12"
                  source={{ uri: userItem?.imageUrl || placeholderUrl }}
                />
                <Text className="dark:text-white font-medium">
                  {userItem?.name}
                </Text>
              </View>
              <Text
                className={cn( userItem.id === user?.id ? 'text-white' : isDarkMode ? 'text-violet-600' : 'text-violet-900')}
              >
                {userItem?.highScore}
              </Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
