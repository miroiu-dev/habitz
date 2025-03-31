import type { WithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';
import { View, type ViewStyle } from 'react-native';

type ContainerProps = WithClassName<PropsWithChildren> & {
	direction?: 'row' | 'column';
	style?: ViewStyle;
};

export function Container({
	children,
	className,
	style,
	direction = 'column'
}: ContainerProps) {
	return (
		<View
			style={style}
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
