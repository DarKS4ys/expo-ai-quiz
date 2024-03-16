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
}

const RippleButton: React.FC<RippleButtonProps> = ({
  onPress,
  disabled,
  loading,
  children,
  className,
  styling,
  dark
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
          className,
          styling ? 'bg-white shadow-xl shadow-black/70 p-4 w-[47.7%] my-2 rounded-2xl dark:bg-[#292929]'
          : 'rounded justify-center items-center'
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