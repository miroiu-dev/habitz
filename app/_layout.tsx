import { LightTheme } from '@/components/theme/router-theme';
import { toastConfig } from '@/lib/toast';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import {
	hideAsync,
	preventAutoHideAsync,
} from 'expo-router/build/utils/splash';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

import '../global.css';

preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceGrotesk_Bold: require('../assets/fonts/SpaceGrotesk-Bold.otf'),
		DMSans_Regular: require('../assets/fonts/DMSans-Regular.otf'),
		DMSans_Medium: require('../assets/fonts/DMSans-Medium.otf'),
		Syne_Bold: require('../assets/fonts/Syne-Bold.otf'),
	});

	useEffect(() => {
		if (loaded || error) {
			hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<ThemeProvider value={LightTheme}>
				<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
				<KeyboardProvider>
					<Slot initialRouteName="(auth)" />
				</KeyboardProvider>
				<Toast config={toastConfig} />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
