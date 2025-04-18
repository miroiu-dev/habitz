import type { QueryError } from '@/lib/errors';
import { cn } from '@/lib/utils';
import type {
	QueryObserverResult,
	RefetchOptions
} from '@tanstack/react-query';
import { View } from 'react-native';
import { Button } from './button';
import { Text } from './text';

type ErrorProps<T> = {
	error: QueryError;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<T, QueryError>>;
	className?: string;
};

export function GlobalError<T>({ error, className, refetch }: ErrorProps<T>) {
	return (
		<View className={cn('bg-primary-1 p-4 rounded-lg', className)}>
			<Text variant='title/medium' className='mb-1'>
				{error.title}
			</Text>
			<Text className='mb-8'>{error.description}</Text>
			<Button
				variant='secondary'
				onPress={() => refetch()}
				title='Try again'
			/>
		</View>
	);
}
