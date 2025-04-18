import {
	Controller,
	type FieldValues,
	type UseControllerProps
} from 'react-hook-form';
import { type TextInputProps, View } from 'react-native';
import { FormError, Input, Text } from '../ui';

type NameInputProps<TFieldValues extends FieldValues = FieldValues> =
	UseControllerProps<TFieldValues> &
		Omit<TextInputProps, 'value' | 'onChangeText'>;

export function NameInput<TFieldValues extends FieldValues = FieldValues>({
	control,
	name,
	...props
}: NameInputProps<TFieldValues>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, onChange, value, ref },
				fieldState: { error, invalid }
			}) => (
				<View className='flex flex-col gap-1'>
					<View className='flex flex-row'>
						<Text variant='title/large'>I want to</Text>

						<Input
							ref={ref}
							placeholder='hike'
							onBlur={onBlur}
							onChangeText={text => onChange(text)}
							value={value}
							variant='outline'
							className='flex-1'
							{...props}
						/>
					</View>
					{invalid && <FormError error={error?.message} />}
				</View>
			)}
		/>
	);
}
