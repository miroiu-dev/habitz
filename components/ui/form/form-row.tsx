import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text } from '../text';
import { FormError } from './form-error';

type FormInputProps = PropsWithChildren<{
	label?: string;
	invalid: boolean;
	error?: string;
}>;

export function FormRow({ label, invalid, error, children }: FormInputProps) {
	return (
		<View className='flex flex-col gap-1'>
			{label && <Text variant='body/medium'>{label}</Text>}
			{children}
			{invalid && <FormError error={error} />}
		</View>
	);
}
