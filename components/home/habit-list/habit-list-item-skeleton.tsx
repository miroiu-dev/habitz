import { Skeleton } from '@/components/ui';
import { View } from 'react-native';

export function HabitListItemSkeleton() {
	return (
		<View className='flex flex-row px-6 py-4 gap-4'>
			<Skeleton width={24} height={24} borderRadius={9999} />
			<View className='flex flex-row items-center justify-between flex-1'>
				<Skeleton width={260} height={16} borderRadius={8} />
				<Skeleton width={24} height={24} borderRadius={9999} />
			</View>
		</View>
	);
}
