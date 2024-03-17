import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import { useSignIn } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import RippleButton from '../_components/RippleButton';
import Socials from '../_components/Socials';
import { Ionicons } from '@expo/vector-icons';

export default function index() {
  const { colorScheme } = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? 'white' : 'black';
  const isDarkMode = colorScheme === 'dark';

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      className={clsx('h-full', isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]')}
    >
      {!isLoaded ? (
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          className="h-full items-center justify-center"
        >
          <View className="flex-row space-x-2 items-center mb-1">
            <Text
              className={clsx(
                'font-medium text-3xl tracking-wide',
                isDarkMode ? 'text-violet-700' : 'text-violet-900'
              )}
            >
              Intelli
            </Text>
            <View>
              <Ionicons
                name="sparkles"
                size={24}
                color={!isDarkMode ? '#4C1D95' : '#6D28D9'}
              />
            </View>
          </View>
          <Text
            className="dark:text-white/90 mb-8 font-medium text-sm text-center tracking-wide"
          >
            "Yapay zekâ destekli bilgi yarışması"
          </Text>
          <ActivityIndicator size="large" color={primaryColor} />
        </Animated.View>
      ) : (
        <>
          {!isKeyboardOpen && (
            <Animated.View
              entering={FadeInUp.duration(500).springify()}
              exiting={FadeOutUp.duration(600).springify()}
              className="w-full h-full absolute"
            >
              <StatusBar style="light" />
              <Image
                className="h-[91%] w-full absolute"
                source={require('../../assets/background.png')}
              />
              <Animated.View className="flex-row justify-around w-full absolute">
                <Animated.Image
                  entering={FadeInUp.delay(200).duration(900).springify()}
                  exiting={FadeOutUp.duration(500).springify()}
                  className="h-[175] w-[66]"
                  source={require('../../assets/light.png')}
                />
                <Animated.Image
                  entering={FadeInUp.delay(400).duration(1000).springify()}
                  exiting={FadeOutUp.delay(50).duration(500).springify()}
                  className="h-[135] w-[50]"
                  source={require('../../assets/light.png')}
                />
              </Animated.View>
            </Animated.View>
          )}

          <View className="h-full w-full flex justify-around pb-10 pt-28">
            {!isKeyboardOpen && (
              <Animated.View
                entering={FadeInUp.duration(500).springify()}
                exiting={FadeOutUp.duration(500).springify()}
                className="flex items-center"
              >
                <View className="flex-row space-x-2 items-center">
                  <Animated.Text
                    entering={FadeInUp.duration(1000).springify()}
                    className="text-violet-900 font-medium text-3xl tracking-wide"
                  >
                    Intelli
                  </Animated.Text>
                  <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <Ionicons name="sparkles" size={24} color={'#4C1D95'} />
                  </Animated.View>
                </View>
                <Animated.Text
                  entering={FadeInUp.delay(150).duration(1000).springify()}
                  className="text-white mt-2 font-bold text-5xl tracking-wider"
                >
                  Giriş Yap
                </Animated.Text>
                <Animated.Text
                  entering={FadeInUp.delay(300).duration(1000).springify()}
                  className="text-white font-medium text-sm text-center tracking-wide"
                >
                  "Yapay zekâ destekli bilgi yarışması"
                </Animated.Text>
              </Animated.View>
            )}

            <View className="flex items-center mx-4 space-y-4">
              <Socials />
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className={clsx(
                  'p-5 rounded-2xl w-full',
                  isDarkMode ? 'bg-white/10' : 'bg-black/10'
                )}
              >
                <TextInput
                  placeholder="Email"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  placeholderTextColor={'gray'}
                  className="dark:text-white"
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className={clsx(
                  'p-5 mb-3 rounded-2xl w-full',
                  isDarkMode ? 'bg-white/10' : 'bg-black/10'
                )}
              >
                <TextInput
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Şifre"
                  placeholderTextColor={'gray'}
                  className="dark:text-white"
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="w-full"
              >
                <RippleButton
                  onPress={onSignInPress}
                  disabled={loading}
                  rounded
                >
                  <Text className="font-bold text-xl text-center">
                    Giriş yap
                  </Text>
                </RippleButton>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="flex-row justify-center"
              >
                <Text className="dark:text-white">Hesabın yok mu? </Text>
                <TouchableOpacity onPress={() => router.push('sign-up')}>
                  <Text className="text-violet-600">Kayıt Ol</Text>
                </TouchableOpacity>
              </Animated.View>
              {/* <Pressable onPress={() => router.push('/homepage')}><Text className='dark:text-white'>GO HOME</Text></Pressable> */}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

{
  /*         <SignedIn>
          <Text className="dark:text-white">You are Signed in</Text>
          <Pressable onPress={() => signOut()}>
            <Text className="dark:text-white">Log out</Text>
          </Pressable>
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>
        <Link
          className="dark:text-white p-4 bg-red-500 rounded"
          href={'/homepage'}
        >
          ENTER
        </Link> */
}
