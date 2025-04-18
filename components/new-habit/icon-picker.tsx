import { HABIT_ICONS } from '@/constants';
import { cn } from '@/lib/utils';
import {
	Controller,
	type FieldValues,
	type UseControllerProps
} from 'react-hook-form';
import { FlatList, Pressable } from 'react-native';
import { View } from 'react-native';
import { FormError, Icon } from '../ui';

type IconPickerProps<TFieldValues extends FieldValues = FieldValues> = {
	icons?: readonly Icon[];
} & UseControllerProps<TFieldValues>;

export function IconPicker<TFieldValues extends FieldValues = FieldValues>({
	icons = HABIT_ICONS,
	control,
	name,
	...props
}: IconPickerProps<TFieldValues>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value, onChange, onBlur, disabled },
				fieldState: { error, invalid }
			}) => (
				<View className='gap-1'>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						bounces={false}
						contentContainerClassName='gap-4'
						overScrollMode='never'
						data={icons}
						keyExtractor={item => item}
						renderItem={({ item }) => (
							<Pressable
								disabled={disabled}
								onPress={() => onChange(item)}
								onBlur={onBlur}
								className={cn(
									'size-12 bg-primary-1 flex justify-center items-center rounded-lg',
									value === item && 'border-2 bg-primary-10'
								)}
							>
								<Icon type={item} />
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
