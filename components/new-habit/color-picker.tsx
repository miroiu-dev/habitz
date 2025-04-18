import { HABIT_COLORS } from '@/constants';
import {
	Controller,
	type FieldValues,
	type UseControllerProps
} from 'react-hook-form';
import { FlatList, Pressable, View } from 'react-native';
import { FormError, Icon } from '../ui';

type ColorPickerProps<TFieldValues extends FieldValues = FieldValues> = {
	colors?: readonly string[];
} & UseControllerProps<TFieldValues>;

export function ColorPicker<TFieldValues extends FieldValues = FieldValues>({
	colors = HABIT_COLORS,
	control,
	name,
	...props
}: ColorPickerProps<TFieldValues>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, onChange, value, disabled },
				fieldState: { invalid, error }
			}) => (
				<View className='gap-1'>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						bounces={false}
						overScrollMode='never'
						contentContainerClassName='gap-4'
						data={colors}
						keyExtractor={item => item}
						renderItem={({ item }) => (
							<Pressable
								disabled={disabled}
								onBlur={onBlur}
								onPress={() => onChange(item)}
								className='size-10 rounded-full flex justify-center items-center'
								style={{ backgroundColor: item }}
							>
								{item === value && <Icon type='checkCircle' />}
							</Pressable>
						)}
					/>
					{invalid && <FormError error={error?.message} />}
				</View>
			)}
			{...props}
		/>
	);
}
