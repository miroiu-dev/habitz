import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../ui';

type ColorPickerProps = {
	colors?: string[];
	onColorChange?: (color: string) => void;
};

const HABIT_COLORS = [
	'#FF995F', // Orange
	'#BF6DD8', // Purple
	'#6D9BFF', // Light Blue
	'#0083D6', // Blue
	'#007EA6', // Dark Blue
	'#02BFB0', // Teal
	'#279E82' // Green
];

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
			contentContainerClassName='gap-3'
			data={colors}
			keyExtractor={item => item}
			renderItem={({ item }) => (
				<View>
					<Pressable
						onPress={() => {
							setSelectedColor(item);
							onColorChange?.(item);
						}}
						className='size-10 rounded-full'
						style={{ backgroundColor: item }}
					/>
					{item === selectedColor && (
						<View className='absolute top-1/2 right-2 -translate-y-1/2'>
							<Icon type='checkCircle' />
						</View>
					)}
				</View>
			)}
		/>
	);
}
