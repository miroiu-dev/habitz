import { Header } from '@/components/router';
import { Text } from '@/components/ui';
import { useAppState } from '@/hooks/useAppState';
import { useSession } from '@/providers/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query';
import { addNetworkStateListener } from 'expo-network';
import { Redirect, Stack } from 'expo-router';

onlineManager.setEventListener(setOnline => {
	const eventSubscription = addNetworkStateListener(state => {
		setOnline(!!state.isConnected);
	});

	return eventSubscription.remove;
});

const queryClient = new QueryClient();

export default function Layout() {
	useAppState();

	const { session, isLoading, signupFlow } = useSession();

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (session && signupFlow) {
		return <Redirect href='/(public)/(onboarding)/account-created' />;
	}

	if (!session) {
		return <Redirect href='/(public)' />;
	}

	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}
