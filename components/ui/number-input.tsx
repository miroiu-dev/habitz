import { forwardRef } from 'react';
import type {
	InputModeOptions,
	KeyboardTypeOptions,
	TextInput,
	TextInputProps,
} from 'react-native';
import { Input } from './input';

export type NumberInputProps = {
	invalid?: boolean;
	allowDecimals?: boolean;
	allowNegative?: boolean;
	maxDecimalPlaces?: number;
};

type InputProps = Omit<TextInputProps, 'keyboardType' | 'inputMode'> &
	NumberInputProps;

function getValue(value: number | string | undefined) {
	if (value === undefined) return '';

	if (typeof value === 'number') {
		if (Number.isNaN(value)) return '';

		return value.toString();
	}

	return value;
}

export const NumberInput = forwardRef<TextInput, InputProps>(
	(
		{
			invalid = false,
			allowDecimals = false,
			allowNegative = false,
			maxDecimalPlaces = 2,
			onChangeText,
			value,
			className,
			...props
		},
		ref
	) => {
		const keyboardType: KeyboardTypeOptions = allowDecimals
			? 'decimal-pad'
			: 'number-pad';

		const inputMode: InputModeOptions = allowDecimals
			? 'decimal'
			: 'numeric';

		const handleTextChange = (text: string) => {
			if (!text) {
				onChangeText?.('');
				return;
			}

			const pattern = allowDecimals
				? allowNegative
					? /^-?\d*\.?\d*$/
					: /^\d*\.?\d*$/
				: allowNegative
				? /^-?\d+$/
				: /^\d+$/;

			const isInvalidFormat = !pattern.test(text);
			const hasInvalidLeadingZero =
				text.length > 1 && text[0] === '0' && text[1] !== '.';
			const isIncompleteInput = text === '-' || text === '.';
			const hasMultipleDecimals = (text.match(/\./g) || []).length > 1;
			const exceedsDecimalLimit =
				allowDecimals && text.split('.')[1]?.length > maxDecimalPlaces;

			if (
				isInvalidFormat ||
				hasInvalidLeadingZero ||
				isIncompleteInput ||
				hasMultipleDecimals ||
				exceedsDecimalLimit
			) {
				return;
			}

			onChangeText?.(text);
		};

		const actualValue = getValue(value);

		return (
			<Input
				ref={ref}
				className={className}
				keyboardType={keyboardType}
				inputMode={inputMode}
				onChangeText={handleTextChange}
				value={actualValue}
				{...props}
			/>
		);
	}
);

Input.displayName = 'NumberInput';
