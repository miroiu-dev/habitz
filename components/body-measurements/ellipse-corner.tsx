import { ColorsLight } from '@/constants/Colors';
import { Path, Svg, type SvgProps, Text } from 'react-native-svg';

type EllipseCornerProps = {
	side: string;
} & SvgProps;

export function EllipseCorner({ side, ...props }: EllipseCornerProps) {
	return (
		<Svg width={38} height={27} viewBox="0 0 38 27" fill="none" {...props}>
			<Path
				d="M38 18.632c0 10.203-13.53 8.21-23.524 8.21C4.482 26.843 0 18.573 0 8.369 0-1.835 9.006.158 19 .158s19 8.27 19 18.474z"
				fill="#EB279D"
			/>
			<Text
				x="16"
				y="18"
				fontSize="12"
				fill={ColorsLight.neutral[70]}
				textAnchor="middle"
				alignmentBaseline="middle"
				fontFamily="DMSans_Medium"
			>
				{side}
			</Text>
		</Svg>
	);
}
