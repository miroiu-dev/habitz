import { ColorsLight } from '@/constants/Colors';
import { type PropsWithChildren, useEffect } from 'react';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type DonutChartProps = {
	percentage?: number;
	radius?: number;
	strokeWidth?: number;
	duration?: number;
	color?: string;
	delay?: number;
	max?: number;
	fill?: string;
};

export function DonutChart({
	percentage = 75,
	radius = 56,
	strokeWidth = 8,
	duration = 500,
	color = ColorsLight.primary[30],
	delay = 500,
	max = 100,
	fill = 'transparent',
	children,
}: PropsWithChildren<DonutChartProps>) {
	const halfCircle = radius + strokeWidth;
	const circleCircumference = 2 * Math.PI * radius;
	const diameter = radius * 2;

	const progress = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => {
		const maxPercentage = (100 * progress.value) / max;
		const strokeDashoffset =
			circleCircumference - (circleCircumference * maxPercentage) / 100;

		return {
			strokeDashoffset,
		};
	});

	useEffect(() => {
		progress.value = withDelay(
			delay,
			withTiming(percentage, {
				duration,
			})
		);
	}, [percentage, duration, delay, progress]);

	return (
		<Svg
			width={diameter}
			height={diameter}
			viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
			style={{ position: 'relative' }}
		>
			<G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
				<Circle
					cy="50%"
					cx="50%"
					stroke={color}
					strokeWidth={strokeWidth}
					r={radius}
					fill={fill}
					strokeOpacity={0.2}
				/>
				<AnimatedCircle
					cy="50%"
					cx="50%"
					stroke={color}
					strokeWidth={strokeWidth}
					r={radius}
					fill="transparent"
					strokeDasharray={circleCircumference}
					strokeDashoffset={circleCircumference}
					strokeLinecap="round"
					animatedProps={animatedProps}
				/>
			</G>
			{children}
		</Svg>
	);
}
