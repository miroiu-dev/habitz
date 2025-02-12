import { ColorsLight } from '@/constants/Colors';
import { View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { G } from 'react-native-svg';
import { DonutChart, Icon, Text } from '../ui';

function HabitProgress() {
	const radius = 24;
	const strokeWidth = 5;
	const center = radius + strokeWidth;

	return (
		<DonutChart
			radius={radius}
			strokeWidth={strokeWidth}
			percentage={20}
			fill={ColorsLight.yellow}
			color={ColorsLight.orange}
		>
			<G transform={`translate(${center - 12}, ${center - 12})`}>
				<Icon type="cup" width={24} height={24} />
			</G>
		</DonutChart>
	);
}

function HabitListItemLeftAction(
	progress: SharedValue<number>,
	drag: SharedValue<number>
) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: drag.value - 80 }],
		};
	});

	return (
		<Animated.View
			style={styleAnimation}
			className="flax items-center justify-center bg-positive w-20 h-full"
		>
			<Icon type="plus" />
		</Animated.View>
	);
}

export function HabitListItem() {
	return (
		<Swipeable
			friction={2}
			enableTrackpadTwoFingerGesture
			leftThreshold={40}
			renderLeftActions={HabitListItemLeftAction}
			overshootLeft={false}
			dragOffsetFromLeftEdge={20}
			dragOffsetFromRightEdge={20}
			overshootFriction={8}
		>
			<View className="flex flex-row items-center px-6 py-4 gap-4">
				<HabitProgress />
				<View className="flex flex-row items-center justify-between flex-1">
					<Text variant="title/medium">Hydrate</Text>
					<Text variant="title/medium" className="text-neutral-40">
						4/8
					</Text>
				</View>
			</View>
		</Swipeable>
	);
}

export function HabitList() {
	return (
		<View className="flex mb-36">
			<View className="py-3 px-6 border-b-2 border-neutral-70">
				<Text variant="title/large">Habits</Text>
			</View>
			<HabitListItem />
			<HabitListItem />
		</View>
	);
}
