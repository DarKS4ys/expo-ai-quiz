import clsx from 'clsx';
import { MotiView } from 'moti';
import React, { ReactNode, useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  styling?: boolean;
  styling2?: boolean;
  active?: boolean;
}

export default function Button({
  onPress,
  children,
  styling,
  styling2,
  className,
  loading,
  disabled,
  active,
}: ButtonProps) {
  const [scaleValue] = useState(new Animated.Value(1));
  const { colorScheme } = useColorScheme();

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.75,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        if (onPress) {
          onPress();
        }
      });
    });
  };

  if (styling) {
    return (
      <TouchableWithoutFeedback onPress={animateButton}>
        <MotiView
          className="rounded-full justify-center items-center transition inset-0 absolute shadow-xl shadow-black p-4"
          animate={{
            backgroundColor: active
              ? '#38BDF8'
              : colorScheme == 'dark'
              ? '#FAFAFA'
              : '#92d8fc',
            bottom: active ? -8 : -24,
          }}
        >
          <Animated.View
            style={{ transform: [{ scale: scaleValue }] }}
            className={clsx(disabled && 'opacity-50')}
          >
            {children}
          </Animated.View>
        </MotiView>
      </TouchableWithoutFeedback>
    );
  }

  if (styling2) {
    return (
      <TouchableWithoutFeedback onPress={animateButton}>
      <Animated.View
        style={{ transform: [{ scale: scaleValue }] }}
        className={clsx(
          'w-full justify-center items-center transition-all p-3.5 rounded-xl',
          disabled && 'opacity-50',
          colorScheme == 'dark' ? 'bg-white/95' : 'bg-black/10',
          className
        )}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={animateButton}>
      <Animated.View
        style={{ transform: [{ scale: scaleValue }] }}
        className={clsx(
          'rounded justify-center items-center transition-all ',
          disabled && 'opacity-50',
          className
        )}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
