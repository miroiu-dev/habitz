import { Header } from '@/components/router';
import { Text } from '@/components/ui';
import { useSession } from '@/providers/auth-context';
import { Redirect, Stack } from 'expo-router';

export default function Layout() {
	const { session, isLoading } = useSession();

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (!session) {
		return <Redirect href='/(public)' />;
	}

	return (
		<Stack
			screenOptions={{
				header: props => <Header {...props} />
			}}
		>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen
				name='(settings)/settings'
				options={{ title: 'Settings' }}
			/>
			<Stack.Screen
				name='(habit)/habit'
				options={{ headerShown: false }}
			/>
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
