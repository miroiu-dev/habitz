import type { QueryError } from '@/lib/errors';
import {
	type BodyMeasurementLog,
	type DeleteBodyMeasurementLogResponse,
	deleteBodyMeasurementLog
} from '@/lib/services/bodyMeasurementService';
import { formatHistoryDate } from '@/lib/time';
import { toast } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { IconButton, Text } from '../ui';

type History = {
	id: string;
	value: number;
	label: string;
};

type HistoryCardProps = {
	data: BodyMeasurementLog;
	selectedDate: string;
};

type HistoryItemProps = {
	item: History;
};

function getHistoryItems(data: BodyMeasurementLog, date: string) {
	return [
		{
			id: `${date}_0`,
			label: 'Abs',
			value: data.abs
		},
		{
			id: `${date}_1`,
			label: 'Neck',
			value: data.neck
		},
		{
			id: `${date}_2`,
			label: 'Shoulder',
			value: data.shoulder
		},
		{
			id: `${date}_3`,
			label: 'Chest',
			value: data.chest
		},
		{
			id: `${date}_4`,
			label: 'Waist',
			value: data.waist
		},
		{
			id: `${date}_5`,
			label: 'Hip',
			value: data.hip
		},
		{
			id: `${date}_6`,
			label: 'L Biceps',
			value: data.leftBiceps
		},
		{
			id: `${date}_7`,
			label: 'R Biceps',
			value: data.rightBiceps
		},
		{
			id: `${date}_8`,
			label: 'L Calf',
			value: data.leftCalf
		},
		{
			id: `${date}_9`,
			label: 'R Calf',
			value: data.rightCalf
		},
		{
			id: `${date}_10`,
			label: 'L Tigh',
			value: data.leftTigh
		},
		{
			id: `${date}_11`,
			label: 'R Tigh',
			value: data.rightTigh
		},
		{
			id: `${date}_12`,
			label: 'WHR',
			value: data.waistToHipRatio
		}
	] as History[];
}

const HistoryItem = memo(({ item }: HistoryItemProps) => {
	const value =
		(item.value ?? 0) === 0
			? '--'
			: item.value.toFixed(item.label === 'WHR' ? 2 : 1);
	return (
		<View className='gap-2'>
			<Text variant='title/base'>{item.label}</Text>
			<Text>{value}</Text>
		</View>
	);
});

export const HistoryCard = memo(({ data, selectedDate }: HistoryCardProps) => {
	const date = formatHistoryDate(data.createdAt);

	const historyItems = useMemo(
		() => getHistoryItems(data, date),
		[data, date]
	);

	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation<
		DeleteBodyMeasurementLogResponse,
		QueryError,
		{ id: number }
	>({
		mutationFn: ({ id }) => deleteBodyMeasurementLog(id),
		onError: err => {
			toast.danger({
				title: err.title,
				description: err.description
			});
		},
		onSettled: async () => {
			await Promise.all([
				queryClient.cancelQueries({
					queryKey: ['body-measurement-logs', selectedDate]
				}),
				queryClient.cancelQueries({
					queryKey: ['statistics', selectedDate]
				})
			]);

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ['body-measurement-logs', selectedDate]
				}),
				queryClient.invalidateQueries({
					queryKey: ['statistics', selectedDate]
				})
			]);

			toast.success({
				title: 'The log was deleted successfully.'
			});
		}
	});

	return (
		<View className='bg-primary-1 p-4 rounded-lg'>
			<View className='flex flex-row items-center justify-between mb-6'>
				<Text>{date}</Text>
				<IconButton
					type='trash'
					onPress={() =>
						toast.danger({
							title: 'Are you sure?',
							actionText: 'Yes',
							action: () => mutateAsync({ id: data.id }),
							position: 'bottom',
							autoHide: true,
							visibilityTime: 6000,
							swipable: true,
							bottomOffset: 65
						})
					}
				/>
			</View>
			<FlatList
				data={historyItems}
				renderItem={({ index, item }) => (
					<HistoryItem item={item} key={index} />
				)}
				keyExtractor={({ id }) => id}
				horizontal
				bounces={false}
				overScrollMode='never'
				contentContainerClassName='gap-4'
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
});
