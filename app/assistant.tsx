import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function Assistant() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      <View className="flex gap-y-1 px-6 py-4">
        <Text className="dark:text-white text-[26px] leading-[1] font-semibold">
          Asistan
        </Text>
        <Text className="dark:text-white text- opacity-60">
          Yapay zeka ile etkileşime geç.
        </Text>
      </View>
    </SafeAreaView>
  );
}
