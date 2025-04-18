import { DonutChart, Icon } from '@/components/ui';
import { G } from 'react-native-svg';

type HabitProgressProps = {
	isCompleted: boolean;
	icon: Icon;
	color: string;
};

export function HabitProgress({
	color,
	icon,
	isCompleted
}: HabitProgressProps) {
	const radius = 24;
	const strokeWidth = 5;
	const center = radius + strokeWidth;

	const percentage = isCompleted ? 100 : 20;

	return (
		<DonutChart
			radius={radius}
			strokeWidth={strokeWidth}
			percentage={percentage}
			fill={color}
		>
			<G transform={`translate(${center - 12}, ${center - 12})`}>
				<Icon type={icon} width={24} height={24} />
			</G>
		</DonutChart>
	);
}
