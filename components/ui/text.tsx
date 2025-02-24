import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { PropsWithChildren } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

export const text = cva('text-neutral-70', {
	variants: {
		variant: {
			'body/small': 'text-xs leading-4 font-dmsans-regular',
			'body/base': 'text-base font-dmsans-regular',
			'body/medium': 'text-lg leading-6 font-dmsans-medium',
			'body/large': 'text-xl leading-6 font-dmsans-medium',
			'title/base': 'text-base font-space-grotesk-bold',
			'title/medium': 'text-lg font-space-grotesk-bold',
			'title/large': 'text-2xl font-space-grotesk-bold',
			'title/xlarge': 'text-xlarge font-space-grotesk-bold',
			custom: '',
		},
	},
	defaultVariants: {
		variant: 'body/base',
	},
});

export type TextProps = PropsWithChildren<RNTextProps> &
	VariantProps<typeof text>;

export function Text({ children, className, variant, ...props }: TextProps) {
	return (
		<RNText className={cn(text({ variant }), className)} {...props}>
			{children}
		</RNText>
	);
}
