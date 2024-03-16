import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import Navigator from './_components/Navigator';
import { Text } from 'react-native';
import { Constants } from 'expo-constants';

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const headerTintColor = colorScheme === 'dark' ? 'white' : 'black';
  const headerBackgroundColor = colorScheme === 'light' ? 'white' : '#0F0F0F'; // #1C1C1C
  const params = useLocalSearchParams();

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
            headerTitle: 'Anasayfa',
          }}
        />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            headerTitle: 'Testler',
          }}
        />
        <Stack.Screen
          name="leaderboard"
          options={{
            headerTitle: 'Sıralama',
          }}
        />
        <Stack.Screen
          name="explore"
          options={{
            headerTitle: 'Keşfet',
          }}
        />
        <Stack.Screen
          name="assistant"
          options={{
            headerTitle: 'Asistan',
          }}
        />
        <Stack.Screen
          name="user"
          options={{
            headerTitle: 'Hesap',
          }}
        />
      </Stack>
      <Navigator colorScheme={colorScheme} />
    </>
  );
}
