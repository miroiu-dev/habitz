import { type Icon, Text } from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import { DateTime } from 'luxon';
import { useRef } from 'react';
import { View } from 'react-native';
import Swipeable, {
	type SwipeableMethods
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { HabitListItemAction } from './habit-list-item-action';
import { HabitProgress } from './habit-progress';

type HabitListItemProps = {
	id: number;
	icon: Icon;
	color: string;
	name: string;
	isCompleted: boolean;
	habitId: number;
	reminder?: string;
};

export function HabitListItem({
	color,
	icon,
	name,
	isCompleted,
	id,
	habitId,
	reminder
}: HabitListItemProps) {
	const swipeableRef = useRef<SwipeableMethods>(null);

	const close = () => {
		swipeableRef.current?.close();
	};

	const reminderDisplay = reminder
		? DateTime.fromFormat(reminder, 'HH:mm:ss').toFormat('HH:mm')
		: 'no reminder';

	return (
		<Swipeable
			ref={swipeableRef}
			friction={2}
			enableTrackpadTwoFingerGesture
			leftThreshold={40}
			rightThreshold={40}
			renderLeftActions={(progress, drag, swipable) => (
				<HabitListItemAction
					drag={drag}
					progress={progress}
					swipeable={swipable}
					id={id}
					close={close}
					icon='check'
					backgroundColor={ColorsLight.primary[20]}
					canMutate={!isCompleted}
					isCompleted={true}
					habitId={habitId}
				/>
			)}
			renderRightActions={(progress, drag, swipable) => (
				<HabitListItemAction
					drag={drag}
					progress={progress}
					swipeable={swipable}
					id={id}
					close={close}
					icon='cross'
					backgroundColor={ColorsLight.danger}
					isCompleted={false}
					canMutate={isCompleted}
					habitId={habitId}
				/>
			)}
			overshootLeft={false}
			overshootRight={false}
			dragOffsetFromLeftEdge={20}
			dragOffsetFromRightEdge={20}
			overshootFriction={8}
		>
			<View className='flex flex-row items-center px-6 py-4 gap-4'>
				<HabitProgress
					color={color}
					icon={icon}
					isCompleted={isCompleted}
				/>
				<View className='flex flex-row items-center justify-between flex-1'>
					<Text variant='title/medium'>{name}</Text>
					<Text variant='title/medium' className='text-neutral-40'>
						{reminderDisplay}
					</Text>
				</View>
			</View>
		</Swipeable>
	);
}
