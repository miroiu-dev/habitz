import { Header } from '@/components/router';
import { useAppState } from '@/hooks/useAppState';
import { queryClient } from '@/lib/queryClient';
import { useSession } from '@/providers/auth-context';
import { QueryClientProvider } from '@tanstack/react-query';
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
					name='habit/[id]'
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
