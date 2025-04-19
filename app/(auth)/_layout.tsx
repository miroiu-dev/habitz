import { Header } from '@/components/router';
import { useAppState } from '@/hooks/useAppState';
import { useSession } from '@/providers/auth-context';
import { Redirect, Stack } from 'expo-router';

export default function Layout() {
	useAppState();

	const { session, isLoading, signupFlow } = useSession();

	1;

	if (session && signupFlow) {
		return <Redirect href='/(public)/(onboarding)/account-created' />;
	}

	if (!session && !isLoading) {
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
			<Stack.Screen name='habit/[id]' options={{ headerShown: false }} />
			<Stack.Screen
				name='(body-measurement)'
				options={{
					title: 'Body measurement',
					headerShown: true
				}}
			/>
			<Stack.Screen
				name='(modal)/new-habit'
				options={{ title: 'New habit' }}
			/>
			<Stack.Screen
				name='(notifications)/notifications'
				options={{ title: 'Notifications' }}
			/>
		</Stack>
	);
}
