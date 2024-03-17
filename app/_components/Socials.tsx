import React from 'react';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Button from './Button';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
  useOAuth,
} from '@clerk/clerk-expo';
import type { OAuthStrategy } from '@clerk/types/dist/strategies';

const items = [
  { key: '1', iconName: 'google', iconColor: 'black', oauth: 'oauth_google' },
  {
    key: '2',
    iconName: 'facebook-square',
    iconColor: 'blue',
    oauth: 'oauth_facebook',
  },
  { key: '3', iconName: 'apple1', iconColor: 'gray', oauth: 'oauth_apple' },
  {
    key: '4',
    iconName: 'discord',
    iconColor: 'blueviolet',
    oauth: 'oauth_discord',
  },
];

export default function Socials() {
  const { startOAuthFlow: startOAuthFlowGoogle } = useOAuth({
    strategy: 'oauth_google',
  });
  const { startOAuthFlow: startOAuthFlowFacebook } = useOAuth({
    strategy: 'oauth_facebook',
  });
  const { startOAuthFlow: startOAuthFlowApple } = useOAuth({
    strategy: 'oauth_apple',
  });
  const { startOAuthFlow: startOAuthFlowDiscord } = useOAuth({
    strategy: 'oauth_discord',
  });

  const oauthMap: Record<
    string,
    (
      startOAuthFlowParams?: StartOAuthFlowParams | undefined
    ) => Promise<StartOAuthFlowReturnType>
  > = {
    oauth_google: startOAuthFlowGoogle,
    oauth_facebook: startOAuthFlowFacebook,
    oauth_apple: startOAuthFlowApple,
    oauth_discord: startOAuthFlowDiscord,
  };

  const onPress = async (oauth: OAuthStrategy) => {
    try {
      const startOAuthFlow = oauthMap[oauth];
      if (!startOAuthFlow) {
        throw new Error(`Invalid OAuth strategy: ${oauth}`);
      }

      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Animated.View
      className="w-[20%] mx-auto"
      entering={FadeInLeft.duration(1000)
        .delay(450 + parseInt(item.key) * 150)
        .springify()}
    >
      <Button onPress={() => onPress(item.oauth)} styling2>
        {item.iconName != 'discord' ? (
          <AntDesign name={item.iconName} size={30} color={item.iconColor} />
        ) : (
          <MaterialIcons
            name={item.iconName}
            size={30}
            color={item.iconColor}
          />
        )}
      </Button>
    </Animated.View>
  );

  return (
    <FlatList
      style={{ overflow: 'visible' }}
      data={items}
      className="w-full"
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      numColumns={4}
    />
  );
}
