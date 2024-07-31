import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SessionProvider } from './SessionContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './components/navigation/app.navigation';

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded || error) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'OpenSans-Regular', // Apply custom font
    fontSize: 24,
    fontWeight: 'bold',
  },
  navbar: {
    height: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  menuBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
    padding: 10,
  },
  menuBarBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
