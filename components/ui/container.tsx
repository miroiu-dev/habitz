import type { WithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

type ContainerProps = WithClassName<PropsWithChildren> & {
	direction?: 'row' | 'column';
};

export function Container({
	children,
	className,
	direction = 'column',
}: ContainerProps) {
	return (
		<View
			className={cn(
				direction === 'column' ? 'flex' : 'flex flex-row',
				'pt-4 pb-8 px-6',
				className
			)}
		>
			{children}
		</View>
	);
}
