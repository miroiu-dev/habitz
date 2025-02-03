import { type PropsWithChildren, createContext, useContext } from 'react';
import {
	Controller,
	type FieldValues,
	type UseControllerProps,
} from 'react-hook-form';
import type { PressableProps } from 'react-native';
import type { Primitive } from 'zod';
import { RadioCard } from '../radio-card';

type FormRadioCardGroupProps<TFieldValues extends FieldValues = FieldValues> =
	PropsWithChildren<UseControllerProps<TFieldValues>>;

const FormRadioCardGroupContext = createContext<FormRadioCardGroupProps | null>(
	null
);

function useFormRadioCardGroup() {
	const context = useContext(FormRadioCardGroupContext);

	if (!context) {
		throw new Error(
			'useFormRadioGroup must be used within a FormRadioGroup!'
		);
	}

	return context;
}

export function FormRadioCardGroup<
	TFieldValues extends FieldValues = FieldValues
>({ children, ...props }: FormRadioCardGroupProps<TFieldValues>) {
	return (
		<FormRadioCardGroupContext.Provider
			value={props as FormRadioCardGroupProps<FieldValues>}
		>
			{children}
		</FormRadioCardGroupContext.Provider>
	);
}

type FormRadioProps = {
	value: Primitive;
	label: string;
	description?: string;
} & Omit<PressableProps, 'onPress'>;

export function FormRadioCard({
	value,
	label,
	description,
	...props
}: FormRadioProps) {
	const { name, control } = useFormRadioCardGroup();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value: selectedValue } }) => (
				<RadioCard
					checked={selectedValue === value}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
					label={label}
					description={description}
					{...props}
				/>
			)}
		/>
	);
}
