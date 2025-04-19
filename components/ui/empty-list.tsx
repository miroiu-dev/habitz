import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { Text } from './text';

type EmptyListProps = {
	title: string;
	description: string;
	className?: string;
};

export function EmptyList({ title, description, className }: EmptyListProps) {
	return (
		<View
			className={cn(
				'items-center gap-1 bg-primary-1 mx-6 p-4 mt-4 rounded-lg',
				className
			)}
		>
			<Text variant='title/large' className='text-center'>
				{title}
			</Text>
			<Text className='text-center'>{description}</Text>
		</View>
	);
}
