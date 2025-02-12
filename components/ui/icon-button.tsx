import { cn } from '@/lib/utils';
import { TouchableOpacity, type View } from 'react-native';
import { Icon, type IconProps } from './svg/icons';

import React, { forwardRef } from 'react';

export const IconButton = forwardRef<View, IconProps>(
	({ className, onPress, ...props }, ref) => {
		return (
			<TouchableOpacity
				className={cn('rounded-lg', className)}
				onPress={onPress}
				ref={ref}
			>
				<Icon {...props} />
			</TouchableOpacity>
		);
	}
);

IconButton.displayName = 'IconButton';
