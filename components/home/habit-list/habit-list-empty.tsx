import { Text } from '@/components/ui';
import { View } from 'react-native';

export function HabitListEmpty() {
	return (
		<View className='items-center gap-1 bg-primary-1 mx-6 p-4 mt-4'>
			<Text variant='title/large' className='text-center'>
				No habits found
			</Text>
			<Text className='text-center'>
				Start building your routine by adding your first habit.
			</Text>
		</View>
	);
}
