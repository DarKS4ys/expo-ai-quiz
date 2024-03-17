import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { fetchQuizById } from '../../../lib/db';
import { Quiz } from '../../../types/quiz';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';

export default function QuestionPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>();

  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: '31' });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setLoading(true);
          const fetchedQuiz = await fetchQuizById(id);
          if (fetchedQuiz) {
            setQuiz(fetchedQuiz);
          }
          /* console.log(fetchedQuiz); */
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return (
    <SafeAreaView
      className={clsx(
        'h-full px-6 py-4',
        isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]'
      )}
    >
      <Text className="dark:text-white text-2xl font-semibold">{id}</Text>
      <Pressable
        onPress={() => {
          router.setParams({ name: 'Updated' });
        }}
      >
        <Text className="text-white">Test 31</Text>
      </Pressable>
    </SafeAreaView>
  );
}
