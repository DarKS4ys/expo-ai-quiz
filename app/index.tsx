import { Link } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';

export default function index() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <Text className='dark:text-white'>welcome!</Text>
      <Link className='dark:text-white' href={'/homepage'}>go</Link>
    </SafeAreaView>
  );
}
