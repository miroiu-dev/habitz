import { formatHistoryDate } from '@/lib/time';
import { memo } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { IconButton, Text } from '../ui';

type History = {
	id: number;
	value: number;
	label: string;
};

type HistoryCardProps = {
	date: Date;
	data: History[];
};

type HistoryItemProps = {
	item: History;
};

const HistoryItem = memo(({ item }: HistoryItemProps) => {
	return (
		<View className='gap-2'>
			<Text variant='title/base'>{item.label}</Text>
			<Text>{item.value ?? '--'}</Text>
		</View>
	);
});

export const HistoryCard = memo(({ date, data }: HistoryCardProps) => {
	// use toast with actions to delete

	return (
		<View className='bg-primary-1 p-4 rounded-lg'>
			<View className='flex flex-row items-center justify-between mb-6'>
				<Text>{formatHistoryDate(date)}</Text>
				<IconButton type='trash' />
			</View>
			<FlatList
				data={data}
				renderItem={({ index, item }) => (
					<HistoryItem item={item} key={index} />
				)}
				keyExtractor={({ id }) => String(id)}
				horizontal
				bounces={false}
				overScrollMode='never'
				contentContainerClassName='gap-4'
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
});
