import { ColorsLight } from '@/constants/Colors';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { NavigationRoute, ParamListBase } from '@react-navigation/native';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from 'react-native-reanimated';
import { Icon } from '../ui';
import { Fade } from '../ui/fade';
import type { IconProps } from '../ui/svg/icons';

function ImproveButton() {
	return (
		<Link href="/(auth)/(modal)/improve" asChild>
			<TouchableOpacity className="size-14 bg-neutral-70 flex items-center justify-center rounded-full">
				<Icon
					type="plus"
					width={22}
					height={24}
					fill={ColorsLight.neutral[0]}
				/>
			</TouchableOpacity>
		</Link>
	);
}

const icon = {
	index: (props: Omit<IconProps, 'type'>) => <Icon type="home" {...props} />,
	statistics: (props: Omit<IconProps, 'type'>) => (
		<Icon type="statistics" {...props} />
	),
};

type TabProps = BottomTabBarProps & {
	route: NavigationRoute<ParamListBase, string>;
	index: number;
};

export function Tab({
	descriptors,
	route,
	index,
	navigation,
	state,
}: TabProps) {
	const { options } = descriptors[route.key];
	const isFocused = state.index === index;

	const onPress = () => {
		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, route.params);
		}
	};

	const onLongPress = () => {
		navigation.emit({
			type: 'tabLongPress',
			target: route.key,
		});
	};

	const TabIcon = icon[route.name as keyof typeof icon];

	const focused = useDerivedValue(() => isFocused, [isFocused]);

	const dotStyle = useAnimatedStyle(() => {
		const scale = focused.value ? 1 : 0;

		return {
			transform: [
				{
					scale: withSpring(scale),
				},
				{
					translateX: '-50%',
				},
			],
		};
	});

	return (
		<TouchableOpacity
			className="relative"
			accessibilityState={{ selected: isFocused }}
			testID={options.tabBarButtonTestID}
			onPress={onPress}
			onLongPress={onLongPress}
		>
			<TabIcon />
			<Animated.View
				className="absolute left-1/2 size-2 -bottom-3 bg-neutral-70 rounded-full"
				style={dotStyle}
			/>
		</TouchableOpacity>
	);
}

export function TabBar({ state, ...props }: BottomTabBarProps) {
	const middle = Math.floor(state.routes.length / 2);
	const leftTabs = state.routes.slice(0, middle);
	const rightTabs = state.routes.slice(middle);

	return (
		<View className="pb-9 px-14 pt-8 absolute bottom-0 left-0 right-0">
			<Fade height={216} />
			<View
				className="flex flex-row bg-primary-20 h-[72px] items-center justify-between px-10 rounded-full border-2	 border-neutral-70"
				style={styles.tabBar}
			>
				{leftTabs.map((route, index) => (
					<Tab
						key={route.key}
						route={route}
						index={index}
						state={state}
						{...props}
					/>
				))}
				<ImproveButton />
				{rightTabs.map((route, index) => (
					<Tab
						key={route.key}
						route={route}
						index={index + middle}
						state={state}
						{...props}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		boxShadow: [
			{
				offsetX: 0,
				offsetY: 4,
				blurRadius: 0,
				color: ColorsLight.neutral[70],
				inset: false,
				spreadDistance: 0,
			},
		],
	},
});
