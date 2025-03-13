import { ColorsLight } from '@/constants/Colors';
import type { CalendarTheme } from '@marceloterreiro/flash-calendar';

const linearAccent = ColorsLight.primary[30];

export const linearTheme: CalendarTheme = {
	rowWeek: {
		container: {}
	},
	itemWeekName: { content: { color: ColorsLight.neutral[50] } },
	itemDayContainer: {
		activeDayFiller: {
			backgroundColor: linearAccent
		}
	},
	itemDay: {
		idle: ({ isPressed, isWeekend }) => ({
			container: {
				backgroundColor: isPressed ? linearAccent : 'transparent',
				borderRadius: 8
			},
			content: {
				color:
					isWeekend && !isPressed
						? ColorsLight.danger
						: ColorsLight.neutral[70]
			}
		}),
		today: ({ isPressed }) => ({
			container: {
				borderColor: ColorsLight.neutral[70],
				borderRadius: 8,
				backgroundColor: isPressed ? linearAccent : 'transparent'
			},
			content: {
				color: ColorsLight.neutral[70]
			}
		}),
		active: ({ isEndOfRange, isStartOfRange }) => ({
			container: {
				backgroundColor: linearAccent,
				borderTopLeftRadius: isStartOfRange ? 8 : 0,
				borderBottomLeftRadius: isStartOfRange ? 8 : 0,
				borderTopRightRadius: isEndOfRange ? 8 : 0,
				borderBottomRightRadius: isEndOfRange ? 8 : 0
			},
			content: {
				color: '#ffffff'
			}
		})
	}
};
