import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import Navigator from '../_components/Navigator';
import { TopBar } from '../_components/TopBar';

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
          name="quiz/[id]/index"
          options={{
            headerTitle: (props) => <TopBar title="Testler" {...props} />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="quiz/[id]/[question]/index"
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
            },
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
