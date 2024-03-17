import { useAuth } from '@clerk/clerk-expo';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

export default function User() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const {signOut} = useAuth()
  return (
    <SafeAreaView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <View className="flex gap-y-1 px-6 py-4">
        <Text className="dark:text-white text-[26px] leading-[1] font-semibold">
          Kullanıcı
        </Text>
        <Text className="dark:text-white text- opacity-60">
          Kullanıcı bilgisi ve ayarlar.
        </Text>

        <Pressable onPress={() => signOut()}><Text className='dark:text-white'>Sign out</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}
