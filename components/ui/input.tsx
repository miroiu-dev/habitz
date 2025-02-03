import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

export const input = cva(
	'px-4 py-2 border-2 border-neutral-70 bg-neutral-0 font-dmsans-regular text-base placeholder:text-neutral-40 caret-primary-20 selection:text-primary-20 focus:border-primary-20',
	{
		variants: {
			variant: {
				search: 'rounded-full',
				text: 'rounded-lg',
				textArea: 'rounded-lg h-28',
			},
		},
		defaultVariants: {
			variant: 'text',
		},
	}
);

type InputProps = TextInputProps &
	VariantProps<typeof input> & { invalid?: boolean };

export const Input = forwardRef<TextInput, InputProps>(
	({ variant, invalid = false, className, ...rest }, ref) => {
		const style = cn(
			input({ variant }),
			invalid && 'border-danger focus:border-danger',
			className
		);

		const props = {
			...rest,
		};

		if (variant === 'textArea') {
			props.multiline = true;
			props.numberOfLines = props.numberOfLines ?? 10;
			props.style = { textAlignVertical: 'top' };
		}

		return (
			<TextInput
				ref={ref}
				className={style}
				numberOfLines={1}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';
