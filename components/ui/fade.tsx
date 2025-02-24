import { ColorsLight } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

type FadeProps = {
	height: number;
	width?: number;
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
	opacity?: number;
};

// TODO: Fix fade

export function Fade({
	height,
	width,
	top = 0,
	left = 0,
	right = 0,
	bottom = 0,
	opacity = 0.7,
}: FadeProps) {
	return (
		<LinearGradient
			colors={[
				'rgba(255,255,255, 0.4)',
				`rgba(255,255,255,${opacity})`,
				ColorsLight.neutral[0],
			]}
			start={[0, 0.5]}
			end={[1, 0.5]}
			style={{
				position: 'absolute',
				top,
				left,
				right,
				bottom,
				height,
				width,
			}}
		/>
	);
}
