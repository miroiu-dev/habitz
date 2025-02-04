import { type ForwardedRef, forwardRef } from 'react';
import {
	type FieldValues,
	type UseControllerProps,
	useController,
} from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';
import { NumberInput, type NumberInputProps } from '../number-input';
import { FormRow } from './form-row';

type FormNumberInputProps<TFieldValues extends FieldValues = FieldValues> = {
	label?: string;
} & UseControllerProps<TFieldValues> &
	Omit<
		TextInputProps,
		'value' | 'onChangeText' | 'keyboardType' | 'inputMode'
	> &
	NumberInputProps;

function FormNumberInputInner<TFieldValues extends FieldValues = FieldValues>(
	{
		label,
		control,
		name,
		disabled,
		defaultValue,
		rules,
		shouldUnregister,
		...rest
	}: FormNumberInputProps<TFieldValues>,
	ref: ForwardedRef<TextInput>
) {
	const {
		field: { onBlur, onChange, value },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
		defaultValue,
		disabled,
		rules,
		shouldUnregister,
	});

	return (
		<FormRow label={label} invalid={invalid} error={error?.message}>
			<NumberInput
				{...rest}
				onChangeText={onChange}
				ref={ref}
				onBlur={onBlur}
				value={value}
				invalid={invalid}
			/>
		</FormRow>
	);
}

export const FormNumberInput = forwardRef(FormNumberInputInner) as <
	TFieldValues extends FieldValues = FieldValues
>(
	props: FormNumberInputProps<TFieldValues> & {
		ref?: ForwardedRef<TextInput>;
	}
) => ReturnType<typeof FormNumberInputInner>;
