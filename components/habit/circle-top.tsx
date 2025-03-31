import { Circle, Svg, type SvgProps } from 'react-native-svg';

export function CircleTop(props: SvgProps) {
	return (
		<Svg
			width={217}
			height={217}
			viewBox='0 0 217 217'
			fill='none'
			{...props}
		>
			<Circle
				cx={108.5}
				cy={108.5}
				r={107}
				stroke='#000'
				strokeOpacity={0.5}
				strokeWidth={3}
			/>
		</Svg>
	);
}
