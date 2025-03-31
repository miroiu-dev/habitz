import { HABIT_COLORS } from '@/constants';
import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { Icon } from '../ui';

type ColorPickerProps = {
	colors?: string[];
	onColorChange?: (color: string) => void;
};

export function ColorPicker({
	colors = HABIT_COLORS,
	onColorChange
}: ColorPickerProps) {
	const [selectedColor, setSelectedColor] = useState<string | null>(null);

	return (
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
					onPress={() => {
						setSelectedColor(item);
						onColorChange?.(item);
					}}
					className='size-10 rounded-full flex justify-center items-center'
					style={{ backgroundColor: item }}
				>
					{item === selectedColor && <Icon type='checkCircle' />}
				</Pressable>
			)}
		/>
	);
}
