import { LightTheme } from '@/components/theme/router';
import { toastConfig } from '@/lib/toast';
import { SessionProvider } from '@/providers/auth-context';
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
import '@/lib/polyfills';
import '@/lib/reanimated-config';
import { queryClient } from '@/lib/queryClient';
import { NotificationProvider } from '@/providers/notification-context';
import { QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: false,
		shouldShowAlert: true
	})
});

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
			<QueryClientProvider client={queryClient}>
				<NotificationProvider>
					<BottomSheetModalProvider>
						<ThemeProvider value={LightTheme}>
							<SystemBars style='dark' />
							<KeyboardProvider>
								<SessionProvider>
									<Slot initialRouteName='(auth)' />
								</SessionProvider>
							</KeyboardProvider>
							<Toast config={toastConfig} />
						</ThemeProvider>
					</BottomSheetModalProvider>
				</NotificationProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
