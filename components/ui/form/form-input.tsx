import { type ForwardedRef, forwardRef } from 'react';
import {
	type FieldValues,
	type UseControllerProps,
	useController,
} from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';
import { Input } from '../input';
import { FormRow } from './form-row';

type FormInputProps<TFieldValues extends FieldValues = FieldValues> = {
	label?: string;
} & UseControllerProps<TFieldValues> &
	Omit<TextInputProps, 'value' | 'onChangeText'>;

function FormInputInner<TFieldValues extends FieldValues = FieldValues>(
	{
		label,
		control,
		name,
		disabled,
		defaultValue,
		rules,
		shouldUnregister,
		...rest
	}: FormInputProps<TFieldValues>,
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
			<Input
				{...rest}
				ref={ref}
				onBlur={onBlur}
				onChangeText={text => onChange(text)}
				value={value}
				invalid={invalid}
			/>
		</FormRow>
	);
}

export const FormInput = forwardRef(FormInputInner) as <
	TFieldValues extends FieldValues = FieldValues
>(
	props: FormInputProps<TFieldValues> & {
		ref?: ForwardedRef<TextInput>;
	}
) => ReturnType<typeof FormInputInner>;
