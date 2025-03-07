import { Header } from '@/components/router';
import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				header: props => <Header {...props} />,
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="(modal)/improve"
				options={{ title: 'Improve yourself' }}
			/>
			<Stack.Screen
				name="(in-progress)/body-composition"
				options={{ title: 'Body composition' }}
			/>
			<Stack.Screen name="(in-progress)/new-habit" />
		</Stack>
	);
}
