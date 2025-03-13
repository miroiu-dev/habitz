import { Header } from '@/components/router';
import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				header: props => <Header {...props} />
			}}
		>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen
				name='(body-composition)'
				options={{ title: 'Body composition', headerShown: true }}
			/>
			<Stack.Screen
				name='(modal)/new-habit'
				options={{ title: 'New habit' }}
			/>
		</Stack>
	);
}
