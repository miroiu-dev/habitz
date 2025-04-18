import { useHabitLogs } from '@/lib/queries';
import { View } from 'react-native';
import { GlobalError, Text } from '../../ui';
import { HabitListEmpty } from './habit-list-empty';
import { HabitListItem } from './habit-list-item';
import { HabitListItemSkeleton } from './habit-list-item-skeleton';

export function HabitList() {
	const { data, error, isError, isPending, refetch, isEmpty } =
		useHabitLogs();

	return (
		<View className='flex mb-36'>
			<View className='py-3 px-6 border-b-2 border-neutral-70'>
				<Text variant='title/large'>Habits</Text>
			</View>
			{isError && error && (
				<GlobalError
					error={error}
					refetch={refetch}
					className='mx-6 mt-4'
				/>
			)}
			{isPending && (
				<>
					<HabitListItemSkeleton />
					<HabitListItemSkeleton />
					<HabitListItemSkeleton />
					<HabitListItemSkeleton />
					<HabitListItemSkeleton />
				</>
			)}

			{!isError && isEmpty && <HabitListEmpty />}
			{!isError &&
				!isEmpty &&
				data?.map(habit => (
					<HabitListItem
						key={habit.id}
						color={habit.color}
						icon={habit.icon}
						name={habit.name}
						id={habit.id}
						isCompleted={habit.isCompleted}
						habitId={habit.habitId}
						reminder={habit.reminder}
					/>
				))}
		</View>
	);
}
