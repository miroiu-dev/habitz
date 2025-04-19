import { Skeleton } from '@/components/ui';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

const SKELETON_WIDTH = width - 130;

export function HabitListItemSkeleton() {
	return (
		<View className='flex flex-row px-6 py-4 gap-4'>
			<Skeleton width={24} height={24} borderRadius={9999} />
			<View className='flex flex-row items-center justify-between gap-4'>
				<Skeleton width={SKELETON_WIDTH} height={16} borderRadius={8} />
				<Skeleton width={24} height={24} borderRadius={9999} />
			</View>
		</View>
	);
}
