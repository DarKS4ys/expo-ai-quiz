import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { fetchUserById, updateUser } from '../lib/db';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function Layout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(protected)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/homepage');
    } else if (!isSignedIn && inTabsGroup) {
      router.replace('/');
    }

    if (isSignedIn && user) {
      fetchUserById(user.id, (userData) => {
        if (!userData) {
          updateUser(user.id, {
            name: user.fullName,
            points: 0,
            highScore: 0,
            imageUrl: user.imageUrl,
          });
        }
      });
    }
  }, [isSignedIn, segments, user]);

  return <Slot />;
}

const RootLayout = () => {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={'pk_test_aW1tZW5zZS1lZnQtNzEuY2xlcmsuYWNjb3VudHMuZGV2JA'}
    >
      <Layout />
    </ClerkProvider>
  );
};

export default RootLayout;
