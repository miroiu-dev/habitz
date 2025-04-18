import { Container, GlobalError, Icon, Skeleton, Text } from '@/components/ui';
import { useHistory } from '@/lib/queries';
import { CellStatus } from '@/lib/services/habitService';
import { getHistoryDate } from '@/lib/time';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import type { PropsWithChildren } from 'react';
import {
	Dimensions,
	Pressable,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function HeaderRow({ children }: PropsWithChildren) {
	return (
		<View className='flex flex-row border-b border-t border-dashed'>
			{children}
		</View>
	);
}

function Row({ children }: PropsWithChildren) {
	return (
		<View className='flex flex-row border-b border-dashed -mt-0.5'>
			{children}
		</View>
	);
}

type CellProps = PropsWithChildren<{
	className?: string;
}>;

function Cell({ children, className }: CellProps) {
	return (
		<View
			className={cn(
				'size-12 border-r-2 items-center justify-center',
				className
			)}
		>
			{children}
		</View>
	);
}

type IconCellProps = {
	type: Icon;
	id: number;
};

function IconCell({ type, id }: IconCellProps) {
	return (
		<Link
			href={{
				pathname: '/habit/[id]',
				params: { id }
			}}
			asChild
		>
			<Pressable className='bg-primary-1 active:bg-primary-10'>
				<Cell>
					<Icon type={type} width={24} height={24} />
				</Cell>
			</Pressable>
		</Link>
	);
}

function DayCell({ day }: { day: number }) {
	return (
		<Cell>
			<Text variant='title/base'>{day}</Text>
		</Cell>
	);
}

function IncompleteCell() {
	return (
		<Cell>
			<View className='rounded-full size-6 border-2 items-center justify-center border-neutral-40'>
				<Icon type='cross' width={16} height={16} />
			</View>
		</Cell>
	);
}

type CompleteCellProps = {
	color: string;
};

function CompleteCell({ color }: CompleteCellProps) {
	return (
		<Cell>
			<View
				className='size-6 rounded-full'
				style={{ backgroundColor: color }}
			/>
		</Cell>
	);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function History() {
	const { data, isPending, error, isError, refetch } = useHistory();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<Text variant='title/xlarge' className='mb-6'>
					History
				</Text>
				{data && (
					<Text className='mb-4'>{getHistoryDate(data.date)}</Text>
				)}
				{isPending && (
					<View className='gap-4'>
						<Skeleton width={80} height={16} />
						<Skeleton width={SCREEN_WIDTH - 48} height={480} />
					</View>
				)}
				{isError && error && (
					<GlobalError error={error} refetch={refetch} />
				)}
				{!isError && data && (
					<ScrollView
						contentContainerStyle={{
							minHeight: '100%',
							paddingBottom: 200
						}}
						overScrollMode='never'
						showsVerticalScrollIndicator={false}
						bounces={false}
					>
						<ScrollView
							horizontal
							overScrollMode='never'
							showsHorizontalScrollIndicator={false}
							bounces={false}
						>
							<View>
								<HeaderRow>
									{data.header.map((cell, i) =>
										cell.icon && cell.id ? (
											<IconCell
												key={i}
												id={cell.id}
												type={cell.icon}
											/>
										) : (
											<Cell key={i} />
										)
									)}
								</HeaderRow>

								{data.rows.map((row, rowIndex) => (
									<Row key={rowIndex}>
										<DayCell day={row.day} />
										{row.cells.map((cell, cellIndex) => {
											if (
												cell.status ===
												CellStatus.Complete
											) {
												return (
													<CompleteCell
														key={cellIndex}
														color={cell.color}
													/>
												);
											}

											if (
												cell.status ===
												CellStatus.Incomplete
											) {
												return (
													<IncompleteCell
														key={cellIndex}
													/>
												);
											}

											return <Cell key={cellIndex} />;
										})}
									</Row>
								))}
							</View>
						</ScrollView>
					</ScrollView>
				)}
			</Container>
		</SafeAreaView>
	);
}
