import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import Navigator from '../_components/Navigator';
import { Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import Button from '../_components/Button';

interface TopBarProps {
  children: string;
  tintColor?: string;
  title: string;
}

function TopBar({ children, tintColor, title }: TopBarProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <View className="justify-between items-center w-full flex flex-row space-x-4 pr-9">
      <View className='flex-row space-x-2'>
        <Button onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={primaryColor} />
        </Button>
        <Text className="text-xl font-semibold pl-4 dark:text-white">
          {title}
        </Text>
      </View>
      <View className="flex-row">
        <View className="flex flex-row space-x-1.5 pr-3.5 items-center">
          <Ionicons
            name="sparkles"
            size={16}
            color={!isDarkMode ? '#4C1D95' : '#6D28D9'}
          />
          <Text
            className={clsx(
              'text-lg font-medium',
              isDarkMode ? 'text-violet-700' : 'text-violet-900'
            )}
          >
            Intelli
          </Text>
        </View>
        <Button onPress={toggleColorScheme}>
          {!isDarkMode ? (
            <MaterialIcons name="sunny" size={28} color="black" />
          ) : (
            <MaterialIcons name="dark-mode" size={28} color="white" />
          )}
        </Button>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const headerTintColor = colorScheme === 'dark' ? 'white' : 'black';
  const headerBackgroundColor = colorScheme === 'light' ? 'white' : '#0F0F0F';

  return (
    <>
      <Stack
        screenOptions={{
          headerTintColor: headerTintColor,
          headerStyle: {
            backgroundColor: headerBackgroundColor,
          },
        }}
      >
        <Stack.Screen
          name="homepage"
          options={{
            headerTitle: (props) => <TopBar title="Anasayfa" {...props} />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            headerTitle: (props) => <TopBar title="Testler" {...props} />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="leaderboard"
          options={{
            headerTitle: (props) => <TopBar title="Sıralama" {...props} />,
            headerBackVisible: false,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
        />
        <Stack.Screen
          name="explore"
          options={{
            headerTitle: (props) => <TopBar title="Keşfet" {...props} />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="assistant"
          options={{
            headerTitle: (props) => <TopBar title="Asistan" {...props} />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="user"
          options={{
            headerTitle: (props) => <TopBar title="Hesabım" {...props} />,
            headerBackVisible: false,
          }}
        />
      </Stack>
      <Navigator colorScheme={colorScheme} />
    </>
  );
}
