import { ColorsLight } from '@/constants/Colors';
import {
	Calendar as FlashCalendar,
	type CalendarProps as FlashCalendarProps,
	useCalendar
} from '@marceloterreiro/flash-calendar';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { linearTheme } from '../theme/calendar';
import { IconButton } from './icon-button';
import { Text } from './text';

const DAY_HEIGHT = 32;
const WEEK_DAYS_HEIGHT = 32;

const styles = StyleSheet.create({
	calendarContainer: {
		backgroundColor: ColorsLight.primary[1],
		padding: 16,
		borderRadius: 8,
		marginVertical: 16
	}
});

type CalendarProps = FlashCalendarProps & {
	onPreviousMonthPress: () => void;
	onNextMonthPress: () => void;
};

export const Calendar = memo((props: CalendarProps) => {
	const { calendarRowMonth, weekDaysList, weeksList } = useCalendar(props);

	return (
		<View style={styles.calendarContainer}>
			<FlashCalendar.VStack spacing={props.calendarRowVerticalSpacing}>
				<FlashCalendar.HStack
					alignItems='center'
					justifyContent='space-around'
					style={{
						marginBottom: 8
					}}
					width='100%'
				>
					<IconButton
						type='back'
						onPress={props.onPreviousMonthPress}
					/>
					<Text variant='title/base'>{calendarRowMonth}</Text>
					<IconButton
						type='back'
						className='-rotate-180'
						onPress={props.onNextMonthPress}
					/>
				</FlashCalendar.HStack>

				<FlashCalendar.Row.Week spacing={4}>
					{weekDaysList.map((day, i) => (
						<FlashCalendar.Item.WeekName
							height={WEEK_DAYS_HEIGHT}
							key={i}
							theme={linearTheme.itemWeekName}
						>
							{day}
						</FlashCalendar.Item.WeekName>
					))}
				</FlashCalendar.Row.Week>

				{weeksList.map((week, i) => (
					<FlashCalendar.Row.Week key={i}>
						{week.map(day => (
							<FlashCalendar.Item.Day.Container
								dayHeight={DAY_HEIGHT}
								daySpacing={4}
								isStartOfWeek={day.isStartOfWeek}
								key={day.id}
							>
								<FlashCalendar.Item.Day
									height={DAY_HEIGHT}
									metadata={day}
									onPress={props.onCalendarDayPress}
									theme={linearTheme.itemDay}
								>
									{day.displayLabel}
								</FlashCalendar.Item.Day>
							</FlashCalendar.Item.Day.Container>
						))}
					</FlashCalendar.Row.Week>
				))}
			</FlashCalendar.VStack>
		</View>
	);
});
