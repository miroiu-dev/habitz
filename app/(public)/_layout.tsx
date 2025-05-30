import { Header } from '@/components/router';
import { useSession } from '@/providers/auth-context';
import { Redirect, Stack } from 'expo-router';

export default function Layout() {
	const { session, isLoading, signupFlow } = useSession();

	if (isLoading) {
		return <Redirect href='/session-loading' />;
	}

	if (session && !signupFlow) {
		return <Redirect href='/(auth)/(tabs)' />;
	}

	return (
		<Stack
			screenOptions={{
				header: props => <Header {...props} />
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='log-in'
				options={{
					title: 'Log in'
				}}
			/>
			<Stack.Screen
				name='sign-up'
				options={{
					title: 'Sign up'
				}}
			/>

			{/* Onboarding */}
			<Stack.Screen
				name='(onboarding)/welcome'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(onboarding)/goal'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(onboarding)/activity-level'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(onboarding)/weekly-goal'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(onboarding)/you'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(onboarding)/create-account'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(onboarding)/account-created'
				options={{
					headerShown: false
				}}
			/>
		</Stack>
	);
}
