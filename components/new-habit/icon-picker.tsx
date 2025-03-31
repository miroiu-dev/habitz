import { HABIT_ICONS } from '@/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { Icon } from '../ui';

type IconPickerProps = {
	icons?: Icon[];
	onIconChange?: (icon: Icon) => void;
};

export function IconPicker({
	icons = HABIT_ICONS,
	onIconChange
}: IconPickerProps) {
	const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

	return (
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
					onPress={() => {
						setSelectedIcon(item);
						onIconChange?.(item);
					}}
					className={cn(
						'size-12 bg-primary-1 flex justify-center items-center rounded-lg',
						selectedIcon === item && 'border-2 bg-primary-10'
					)}
				>
					<Icon type={item} />
				</Pressable>
			)}
		/>
	);
}
