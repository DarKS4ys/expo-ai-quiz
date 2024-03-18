import { Text, View } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Button from "./Button";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import clsx from "clsx";


interface TopBarProps {
    children: string;
    tintColor?: string;
    title: string;
  }
  

export function TopBar({ children, tintColor, title }: TopBarProps) {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  
    return (
      <View className="justify-between items-center w-full flex flex-row space-x-4 pr-9">
        <View className='flex-row space-x-2'>
          <Button onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color={primaryColor} />
          </Button>
          <Text key={title} className="text-xl font-semibold pl-4 dark:text-white">
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