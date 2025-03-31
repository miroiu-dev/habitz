import { ColorsLight } from '@/constants/Colors';
import {
	type CalendarProps,
	Calendar as RNCalendar
} from 'react-native-calendars';

export function Calendar({ style, ...props }: CalendarProps) {
	return (
		<RNCalendar
			style={[{ borderRadius: 8 }, style]}
			theme={{
				textInactiveColor: ColorsLight.neutral[70],
				monthTextColor: ColorsLight.neutral[70],
				arrowColor: ColorsLight.primary[30],
				calendarBackground: ColorsLight.primary[1],
				textSectionTitleColor: ColorsLight.neutral[70],
				selectedDayBackgroundColor: ColorsLight.primary[20],
				selectedDayTextColor: ColorsLight.neutral[0],
				todayTextColor: ColorsLight.primary[20],
				dayTextColor: ColorsLight.neutral[70],
				textDisabledColor: ColorsLight.neutral[50],
				textDayFontFamily: 'DMSans_Regular',
				textMonthFontFamily: 'DMSans_Regular',
				textDayHeaderFontFamily: 'DMSans_Regular',
				todayButtonFontFamily: 'DMSans_Regular'
			}}
			{...props}
		/>
	);
}
