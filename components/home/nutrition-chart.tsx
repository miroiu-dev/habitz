import { Text } from 'react-native-svg';
import { DonutChart } from '../ui';
import type { DonutChartProps } from '../ui/charts/donout-chart';

type NutritionChartProps = {
	value: string;
	text: string;
	textFontSize?: number;
	valueFontSize?: number;
} & DonutChartProps;

export function NutritionChart({
	text,
	value,
	radius = 56,
	strokeWidth = 8,
	textFontSize = 16,
	valueFontSize = 18,
	...props
}: NutritionChartProps) {
	const halfCircle = radius + strokeWidth;

	return (
		<DonutChart {...props} radius={radius} strokeWidth={strokeWidth}>
			<Text
				x={halfCircle}
				y={halfCircle - 10}
				textAnchor="middle"
				fill="black"
				fontSize={valueFontSize}
				fontFamily="DMSans_Medium"
				fontWeight="bold"
			>
				{value}
			</Text>
			<Text
				x={halfCircle}
				y={halfCircle + 10}
				textAnchor="middle"
				fill="black"
				fontSize={textFontSize}
				fontFamily="DMSans_Regular"
			>
				{text}
			</Text>
		</DonutChart>
	);
}
