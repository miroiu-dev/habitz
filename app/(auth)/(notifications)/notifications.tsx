import {
	Badge,
	Container,
	EmptyList,
	GlobalError,
	Icon,
	Skeleton,
	Text
} from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import { useNotifications } from '@/lib/queries/useNotifications';
import { cn } from '@/lib/utils';
import { DateTime } from 'luxon';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationProps = {
	id: number;
	icon: Icon;
	title: string;
	description: string;
	isFirst: boolean;
	createdAt: string;
};

export function Notification({
	description,
	icon,
	title,
	isFirst,
	createdAt
}: NotificationProps) {
	const createAtDisplay =
		DateTime.fromISO(createdAt).toFormat('yyyy-MM-dd HH:mm');

	return (
		<View
			className={cn(
				'flex flex-row gap-4 p-4 border-collapse items-center border-b-2',
				isFirst && 'border-t-2'
			)}
		>
			<Icon type={icon} />
			<View className='flex flex-1'>
				<Text variant='body/medium'>{title}</Text>
				<Text>{description}</Text>
				<Text className='text-neutral-40'>{createAtDisplay}</Text>
			</View>
		</View>
	);
}

export default function Notifications() {
	const { data, error, isError, isFetching, refetch, isEmpty } =
		useNotifications();

	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			<Container className='px-0 py-0'>
				{isError && error && (
					<GlobalError error={error} refetch={refetch} />
				)}
				{!isError && isEmpty && (
					<EmptyList
						className='mt-0'
						title='No notifications found'
						description='Create habits with reminders to recieve notifications.'
					/>
				)}
				{isFetching && (
					<ActivityIndicator
						size={48}
						color={ColorsLight.primary[20]}
					/>
				)}
				{!isFetching &&
					!isError &&
					!isEmpty &&
					data?.map((x, index) => (
						<Notification
							key={x.id}
							createdAt={x.createdAt}
							description={x.description}
							icon={x.icon}
							id={x.id}
							isFirst={index === 0}
							title={x.title}
						/>
					))}
			</Container>
		</SafeAreaView>
	);
}
