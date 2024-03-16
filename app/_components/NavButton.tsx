import React from 'react';
import Button from './Button';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { AnimatePresence, MotiText, MotiView } from 'moti';
import clsx from 'clsx';

export default function NavButton({
  name,
  colorScheme,
  children,
  pathname,
  bgColor,
  href,
}: {
  pathname: string;
  name: string;
  bgColor: string;
  href: string;
  children: React.ReactNode;
  colorScheme: 'light' | 'dark';
}) {
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';
  const isActive = pathname == href;

  const handlePush = () => {
    if (pathname != href) {
        router.push(href)
    }
  }
  return (
    <MotiView
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1.15 : 1,
      }}
      transition={{
        type: 'spring',
      }}
    >
      <Button onPress={handlePush}>
        <>
          {children}
          <Text className="text-xs font-medium dark:text-white mt-0.5">{name}</Text>
          <AnimatePresence>
            <MotiView animate={{bottom: isActive ? -29 : -44, opacity: isActive ? 1 : 0}} className={clsx('w-full h-6 absolute rounded-t-lg', bgColor)}/>
          </AnimatePresence>
        </>
      </Button>
    </MotiView>
  );
}
