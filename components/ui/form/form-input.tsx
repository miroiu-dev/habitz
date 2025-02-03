import { type ForwardedRef, type ReactNode, forwardRef } from 'react';
import {
	Controller,
	type FieldValues,
	type UseControllerProps,
} from 'react-hook-form';
import {
	type InputModeOptions,
	type NativeSyntheticEvent,
	type TextInput,
	type TextInputProps,
	View,
} from 'react-native';
import type { TextInputKeyPressEventData } from 'react-native';
import { Input } from '../input';
import { Text } from '../text';

function isNumberInput(inputMode?: InputModeOptions) {
	return inputMode === 'numeric' || inputMode === 'decimal';
}

type FormInputProps<TFieldValues extends FieldValues = FieldValues> = {
	label?: string;
} & UseControllerProps<TFieldValues> &
	TextInputProps;

function FormInputInner<TFieldValues extends FieldValues = FieldValues>(
	{ label, control, name, disabled, ...rest }: FormInputProps<TFieldValues>,
	ref: ForwardedRef<TextInput>
) {
	const handleKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>
	) => {
		if (!isNumberInput(rest.inputMode)) return;

		const { key } = e.nativeEvent;

		if (!/^[0-9]$/.test(key) && key !== 'Backspace') {
			e.preventDefault();
		}
	};

	return (
		<View className="flex flex-col gap-1">
			{label && <Text variant="body/medium">{label}</Text>}
			<Controller
				control={control}
				name={name}
				render={({
					field: { onChange, onBlur, value },
					fieldState,
				}) => {
					console.log('value', value);
					return (
						<View className="flex gap-1">
							<Input
								{...rest}
								ref={ref}
								onBlur={onBlur}
								onChangeText={text => onChange(text)}
								onKeyPress={handleKeyPress}
								value={value}
								invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<Text
									variant="body/small"
									className="text-danger"
								>
									{fieldState.error.message}
								</Text>
							)}
						</View>
					);
				}}
			/>
		</View>
	);
}

export const FormInput = forwardRef(FormInputInner) as <
	TFieldValues extends FieldValues = FieldValues
>(
	props: FormInputProps<TFieldValues> & {
		ref?: ForwardedRef<TextInput>;
	}
) => ReturnType<typeof FormInputInner>;
