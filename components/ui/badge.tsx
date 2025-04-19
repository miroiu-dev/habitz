import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

type BadgeProps = PropsWithChildren<{
	className?: string;
}>;

export function Badge({ children, className }: BadgeProps) {
	return (
		<View className='relative p-0.5'>
			<View
				className={cn(
					'absolute bg-primary-20 size-[10px] rounded-full right-0 top-0 z-10',
					className
				)}
			/>
			{children}
		</View>
	);
}
