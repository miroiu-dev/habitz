import { TabBar } from '@/components/router/tab-bar';
import { Tabs } from 'expo-router';

export default function AppLayout() {
	return (
		<Tabs initialRouteName="index" tabBar={props => <TabBar {...props} />}>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="improve"
				options={{
					headerShown: false,
				}}
				listeners={{
					tabPress: e => {
						e.preventDefault();
					},
				}}
			/>
			<Tabs.Screen
				name="statistics"
				options={{
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}
