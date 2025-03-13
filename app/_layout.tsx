import { LightTheme } from '@/components/theme/router';
import { toastConfig } from '@/lib/toast';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import {
	hideAsync,
	preventAutoHideAsync
} from 'expo-router/build/utils/splash';
import { useEffect } from 'react';
import { SystemBars } from 'react-native-edge-to-edge';
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
		Syne_Bold: require('../assets/fonts/Syne-Bold.otf')
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
			<BottomSheetModalProvider>
				<ThemeProvider value={LightTheme}>
					<SystemBars style='dark' />
					<KeyboardProvider>
						<Slot initialRouteName='(auth)' />
					</KeyboardProvider>
					<Toast config={toastConfig} />
				</ThemeProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
