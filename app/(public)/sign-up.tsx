import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  Keyboard,
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
import { AntDesign } from '@expo/vector-icons';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import { SignedIn, SignedOut, useSignUp } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import RippleButton from '../_components/RippleButton';
import Socials from '../_components/Socials';

export default function SignUp() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

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

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
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
      {(!isKeyboardOpen || pendingVerification) && (
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
          {!(isKeyboardOpen && pendingVerification) && (
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
          )}
        </Animated.View>
      )}

      <View
        className={clsx(
          'h-full w-full flex justify-around pb-10',
          pendingVerification && !isKeyboardOpen
            ? 'pt-40'
            : pendingVerification && isKeyboardOpen
            ? 'pt-12'
            : 'pt-28'
        )}
      >
        {(!isKeyboardOpen || pendingVerification) && (
          <Animated.View
            entering={FadeInUp.duration(500).springify()}
            exiting={FadeOutUp.duration(500).springify()}
            className="flex items-center"
          >
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-violet-900 font-medium text-3xl tracking-wide"
            >
              Intelli
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.delay(150).duration(1000).springify()}
              className="text-white mt-2 font-bold text-5xl tracking-wider"
            >
              Kayıt Ol
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.delay(300).duration(1000).springify()}
              className="text-white font-medium text-sm text-center tracking-wide"
            >
              "Yapay zekâ destekli bilgi yarışması"
            </Animated.Text>
          </Animated.View>
        )}

        <View
          className={clsx(
            'flex items-center mx-4 space-y-4',
            pendingVerification && 'my-auto'
          )}
        >
          {pendingVerification ? (
            <>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className={clsx(
                  'p-5 rounded-2xl w-full',
                  isDarkMode ? 'bg-white/10' : 'bg-black/10'
                )}
              >
                <TextInput
                  placeholder="Doğrulama kodu"
                  value={code}
                  className="dark:text-white"
                  onChangeText={setCode}
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="w-full"
              >
                <RippleButton
                  onPress={onPressVerify}
                  disabled={loading}
                  rounded
                >
                  <Text className="font-bold text-xl text-center">
                    Email doğrula
                  </Text>
                </RippleButton>
              </Animated.View>
            </>
          ) : (
            <>
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
                  onPress={onSignUpPress}
                  disabled={loading}
                  rounded
                >
                  <Text className="font-bold text-xl text-center">
                    Kayıt Ol
                  </Text>
                </RippleButton>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="flex-row justify-center"
              >
                <Text className="dark:text-white">Zaten hesabın var mı? </Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                  <Text className="text-sky-600">Giriş Yap</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </View>
      </View>
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
