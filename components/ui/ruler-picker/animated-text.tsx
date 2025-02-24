import { cn } from '@/lib/utils';
import type { TextInputProps, TextStyle } from 'react-native';
import { TextInput } from 'react-native';
import Animated, {
	useAnimatedProps,
	type SharedValue,
} from 'react-native-reanimated';
import { text } from '../text';

type AnimatedTextProps = {
	displayText: SharedValue<number>;
	style?: TextStyle;
	defaultValue?: number;
} & Omit<TextInputProps, 'defaultValue'>;

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AnimatedText({
	displayText,
	defaultValue,
	...props
}: AnimatedTextProps) {
	const animatedProps = useAnimatedProps(() => {
		return {
			text: displayText.value.toFixed(1),
			// biome-ignore lint/suspicious/noExplicitAny: Text doesn't exist in AnimatedProps
		} as any;
	});

	return (
		<AnimatedTextInput
			underlineColorAndroid="transparent"
			editable={false}
			defaultValue={defaultValue?.toString()}
			className={cn(text({ variant: 'title/large' }), 'text-center')}
			style={{ fontVariant: ['tabular-nums'] }}
			animatedProps={animatedProps}
			{...props}
		/>
	);
}
