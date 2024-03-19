import React, { ReactNode } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import clsx from 'clsx';

interface RippleButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  styling?: boolean;
  dark?: boolean;
  rounded?:boolean;
  correct?: boolean;
  mistake?: boolean;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  onPress,
  disabled,
  loading,
  children,
  className,
  styling,
  dark,
  rounded,
  correct,
  mistake
}) => {
  const rippleEffect = () => {
    if (Platform.OS === 'android') {
      return TouchableNativeFeedback.Ripple('#adacac', false);
    } else {
      return { background: TouchableHighlight, underlayColor: '#adacac' };
    }
  };

  const ButtonComponent = Platform.select({
    ios: TouchableOpacity,
    android: TouchableNativeFeedback as any,
    default: TouchableOpacity,
  });

  return (
    <ButtonComponent
      onPress={onPress}
      disabled={disabled}
      style={rippleEffect()}
    >
      <View
        className={clsx(
          disabled && 'opacity-50',
          styling ? 'bg-white shadow-xl shadow-black/70 p-4 w-full my-2 rounded-xl dark:bg-[#292929]'
          : 'rounded justify-center items-center bg-blue-400 p-4',
          rounded ? 'rounded-2xl' : 'rounded',
          className,
          mistake && 'bg-red-500',
          correct && 'bg-green-500',
        )}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>{children}</>
        )}
      </View>
    </ButtonComponent>
    )
};

export default RippleButton;