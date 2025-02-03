import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { Pressable, type PressableProps, type View } from 'react-native';
import { Text } from './text';

const button = cva(
	'h-12 px-8 rounded-lg flex justify-center items-center disabled:bg-neutral-60 active:border-b-2',
	{
		variants: {
			variant: {
				primary:
					'bg-primary-10 active:bg-primary-20 border-2 border-b-4 border-neutral-70',
				secondary:
					'bg-neutral-0 active:bg-neutral-40 border-2 border-b-4 border-neutral-70',
				tertiary: 'active:border-2 active:bg-neutral-40',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	}
);

type ButtonProps = {
	title: string;
	loading?: boolean;
} & PressableProps &
	VariantProps<typeof button>;

import { forwardRef } from 'react';

export const Button = forwardRef<View, ButtonProps>(
	(
		{ title, variant, disabled, loading, className, ...props }: ButtonProps,
		ref
	) => {
		return (
			<Pressable
				ref={ref}
				className={cn(
					button({
						variant,
					}),
					className
				)}
				disabled={disabled}
				{...props}
			>
				<Text
					variant="body/medium"
					className={cn(disabled && 'text-neutral-40')}
				>
					{title}
				</Text>
			</Pressable>
		);
	}
);

Button.displayName = 'Button';
