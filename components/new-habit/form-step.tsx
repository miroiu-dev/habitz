import Svg, { Text } from 'react-native-svg';

type FormStepProps = {
	text: string;
};

export function FormStep({ text }: FormStepProps) {
	return (
		<Svg height='61' width='200'>
			<Text
				fill='none'
				stroke='rgba(0, 0, 0, 0.1)'
				strokeWidth='2'
				fontSize='76'
				fontWeight='bold'
				x='41'
				y='60'
				textAnchor='middle'
			>
				{text}
			</Text>
		</Svg>
	);
}
