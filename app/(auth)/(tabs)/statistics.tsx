import { Container, Icon, Text } from '@/components/ui';
import { getHistoryDate } from '@/lib/time';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Header({ children }: PropsWithChildren) {
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
};

function IconCell({ type }: IconCellProps) {
	return (
		<Link href='/(auth)/(habit)/habit'>
			<Cell className='bg-primary-1'>
				<Icon type={type} />
			</Cell>
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

export default function History() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<Text variant='title/xlarge' className='mb-6'>
					History
				</Text>
				<Text className='mb-4'>{getHistoryDate()}</Text>
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
							<Header>
								<Cell />
								<IconCell type='bed' />
								<IconCell type='run' />
								<IconCell type='palette' />
								<Cell />
								<Cell />
								<Cell />
								<Cell />
							</Header>
							<Row>
								<DayCell day={15} />
								<CompleteCell color='blue' />

								<CompleteCell color='red' />
								<IncompleteCell />

								<Cell />
								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={14} />
								<IncompleteCell />
								<IncompleteCell />

								<CompleteCell color='purple' />

								<Cell />
								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={13} />
								<IncompleteCell />

								<CompleteCell color='green' />
								<CompleteCell color='purple' />

								<Cell />
								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={12} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={11} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={10} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={9} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={8} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={7} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={6} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={5} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
							<Row>
								<DayCell day={4} />
								<IncompleteCell />

								<CompleteCell color='red' />
								<IncompleteCell />
								<Cell />

								<Cell />
								<Cell />
								<Cell />
							</Row>
						</View>
					</ScrollView>
				</ScrollView>
			</Container>
		</SafeAreaView>
	);
}
