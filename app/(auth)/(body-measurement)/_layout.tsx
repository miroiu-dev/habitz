import { ColorsLight } from '@/constants/Colors';
import {
	type MaterialTopTabNavigationEventMap,
	type MaterialTopTabNavigationOptions,
	createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';
import type {
	ParamListBase,
	TabNavigationState
} from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
	return (
		<MaterialTopTabs
			screenOptions={{
				animationEnabled: false,
				swipeEnabled: false,
				tabBarActiveTintColor: ColorsLight.neutral[70],
				tabBarInactiveTintColor: ColorsLight.neutral[50],
				tabBarLabelStyle: {
					fontFamily: 'SpaceGrotesk_Bold',
					fontSize: 16
				},
				tabBarStyle: {
					backgroundColor: '#fff',
					elevation: 0,
					shadowOpacity: 0,
					marginHorizontal: 24
				},
				tabBarIndicatorStyle: {
					backgroundColor: ColorsLight.primary[30],
					height: 3
				},
				tabBarBounces: false,
				tabBarAndroidRipple: {
					color: ColorsLight.primary[1]
				}
			}}
		>
			<MaterialTopTabs.Screen
				name='general'
				options={{
					title: 'General'
				}}
			/>
			<MaterialTopTabs.Screen
				name='history'
				options={{
					title: 'History'
				}}
			/>
		</MaterialTopTabs>
	);
}
