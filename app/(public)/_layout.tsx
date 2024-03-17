import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text } from 'react-native';
import { Constants } from 'expo-constants';
import { ClerkProvider } from '@clerk/clerk-expo';

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const headerTintColor = colorScheme === 'dark' ? 'white' : 'black';
  const headerBackgroundColor = colorScheme === 'light' ? 'white' : '#0F0F0F'; // #1C1C1C

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
          name="index"
          options={{
            headerTitle: 'Giriş',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerTitle: 'Kayıt Ol',
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
