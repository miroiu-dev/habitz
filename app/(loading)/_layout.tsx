import { Header } from '@/components/router';
import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				header: props => <Header {...props} />
			}}
		>
			<Stack.Screen
				name='session-loading'
				options={{
					headerShown: false
				}}
			/>
		</Stack>
	);
}
