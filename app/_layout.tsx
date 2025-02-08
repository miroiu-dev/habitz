import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import {
	hideAsync,
	preventAutoHideAsync,
} from 'expo-router/build/utils/splash';
import { useEffect } from 'react';

import '../global.css';
import { Header } from '@/components/router/header';
import { LightTheme } from '@/components/theme/router-theme';
import { toastConfig } from '@/lib/toast';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

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
					<Stack
						initialRouteName="(auth)/(onboarding)/welcome"
						screenOptions={{
							header: props => <Header {...props} />,
						}}
					>
						<Stack.Screen
							name="index"
							options={{
								headerShown: false,
							}}
						/>

						{/* Auth */}
						<Stack.Screen
							name="(auth)/index"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/log-in"
							options={{
								title: 'Log in',
							}}
						/>
						<Stack.Screen
							name="(auth)/sign-up"
							options={{
								title: 'Sign up',
							}}
						/>

						{/* Onboarding */}
						<Stack.Screen
							name="(auth)/(onboarding)/welcome"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/(onboarding)/goal"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/(onboarding)/activity-level"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/(onboarding)/weekly-goal"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/(onboarding)/you"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/(onboarding)/create-account"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(auth)/(onboarding)/account-created"
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</KeyboardProvider>
				<Toast config={toastConfig} />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
