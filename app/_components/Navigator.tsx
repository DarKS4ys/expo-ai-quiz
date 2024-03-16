import clsx from 'clsx';
import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import NavButton from './NavButton';
import { router, usePathname } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Navigator({
  colorScheme,
}: {
  colorScheme: 'dark' | 'light';
}) {
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  const pathname = usePathname();

  return (
    <View
      className={clsx(
        'py-4 px-8 shadow-2xl shadow-black grid-cols-3 flex flex-row items-center justify-between',
        isDarkMode ? 'bg-[#292929]' : 'bg-white '
      )}
    >
      <NavButton
        pathname={pathname}
        href="/assistant"
        bgColor="bg-orange-500"
        name="Asistan"
        colorScheme={colorScheme}
      >
        <MaterialIcons name="assistant" size={28} color={primaryColor} />
      </NavButton>
      <NavButton
        bgColor="bg-purple-500"
        pathname={pathname}
        href="/explore"
        name="Keşfet"
        colorScheme={colorScheme}
      >
        <FontAwesome5 name="compass" size={28} color={primaryColor} />
      </NavButton>
        <View className="relative items-center justify-center flex px-4">
          <Button
            active={pathname == '/homepage'}
            onPress={() => {
              if (pathname !== '/homepage') {
                router.push('/homepage');
              }
            }}
            styling
          >
            <Entypo name="home" size={36} color={'black'} />
          </Button>
        </View>
      <NavButton
        pathname={pathname}
        bgColor="bg-red-500"
        href="/leaderboard"
        name="Sıralama"
        colorScheme={colorScheme}
      >
        <MaterialIcons name="leaderboard" size={28} color={primaryColor} />
      </NavButton>
      <NavButton
        bgColor="bg-emerald-500"
        pathname={pathname}
        href="/user"
        name="Hesap"
        colorScheme={colorScheme}
      >
        <FontAwesome name="user" size={28} color={primaryColor} />
      </NavButton>
    </View>
  );
}
