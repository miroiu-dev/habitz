import { View } from 'react-native';
import { Text } from './text';

type LogoProps = {
	variant?: 'title/xlarge' | 'title/large';
};

export function Logo({ variant = 'title/xlarge' }: LogoProps) {
	return (
		<View className="relative">
			<Text variant={variant} className="z-10">
				habitz
			</Text>
			<View className="w-[83px] h-9 bg-primary-20 absolute top-0.5 -left-0.5" />
		</View>
	);
}
