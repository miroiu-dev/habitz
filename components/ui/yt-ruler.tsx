import { ColorsLight } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import {
	Dimensions,
	PixelRatio,
	StyleSheet,
	TextInput,
	type TextStyle,
	View,
} from 'react-native';
import Animated, {
	clamp,
	runOnJS,
	useAnimatedProps,
	useAnimatedScrollHandler,
	useSharedValue,
	type SharedValue,
} from 'react-native-reanimated';

type RulerLineProps = {
	index: number;
};

const scale = PixelRatio.get();
const spacing = Math.round(8 * scale) / scale;
const rulerWidth = Math.round(4 * scale) / scale;
const itemSize = Math.round((rulerWidth + spacing) * scale) / scale;
const { width } = Dimensions.get('window');

const getRulerLineHeight = (value: number) => {
	if (value % 10 === 0) {
		return Math.round(68 * scale) / scale;
	}
	if (value % 5 === 0) {
		return Math.round(34 * scale) / scale;
	}
	return Math.round(21 * scale) / scale;
};

function RulerLine({ index }: RulerLineProps) {
	const height = getRulerLineHeight(index);

	return (
		<View style={styles.rulerLineContainer}>
			<View
				style={[
					styles.rulerLine,
					{
						height,
					},
				]}
			/>
		</View>
	);
}

type AnimatedTextProps = {
	value: SharedValue<number>;
	style?: TextStyle;
	defaultValue?: number;
};

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedText({ value, defaultValue, style }: AnimatedTextProps) {
	const animatedProps = useAnimatedProps(() => {
		return {
			text: String(Math.round(value.value)),
		} as any;
	});

	return (
		<AnimatedTextInput
			underlineColorAndroid="transparent"
			editable={false}
			defaultValue={defaultValue?.toString()}
			style={[styles.animatedText, style]}
			animatedProps={animatedProps}
		/>
	);
}

type RulerProps = {
	onChange?: (value: number) => void;
	minValue?: number;
	maxValue?: number;
};

export function Ruler({ onChange, minValue = 0, maxValue = 240 }: RulerProps) {
	const data = useMemo(() => [...Array(maxValue + 1).keys()], [maxValue]);
	const scrollX = useSharedValue(0);

	const onScroll = useAnimatedScrollHandler({
		onScroll: event => {
			scrollX.value = clamp(
				event.contentOffset.x / itemSize,
				0,
				data.length - 1
			);
		},
		onMomentumEnd: () => {
			if (onChange) {
				runOnJS(onChange)(scrollX.value);
			}
		},
	});

	return (
		<View style={styles.container}>
			<View>
				<AnimatedText value={scrollX} defaultValue={minValue} />
			</View>
			<View>
				<Animated.FlatList
					data={data}
					keyExtractor={item => String(item)}
					bounces={false}
					horizontal
					showsHorizontalScrollIndicator={false}
					decelerationRate="fast"
					getItemLayout={(_, index) => ({
						length: itemSize,
						offset: itemSize * index,
						index,
					})}
					snapToInterval={itemSize}
					contentContainerStyle={styles.flatListContent}
					renderItem={({ index }) => <RulerLine index={index} />}
					onScroll={onScroll}
					scrollEventThrottle={16}
				/>
				<View style={styles.indicator} />
				<LinearGradient
					style={StyleSheet.absoluteFillObject}
					colors={['#fff', 'transparent', '#fff']}
					start={[0, 0.5]}
					end={[1, 0.5]}
					pointerEvents="none"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	rulerLineContainer: {
		width: itemSize,
		height: Math.round(68 * scale) / scale,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
	},
	rulerLine: {
		width: rulerWidth,
		backgroundColor: ColorsLight.neutral[30],
	},
	animatedText: {
		fontSize: Math.round(24 * scale) / scale,
		fontWeight: '500',
		textAlign: 'center',
	},
	flatListContent: {
		paddingHorizontal:
			Math.round((width / 2 - rulerWidth / 2) * scale) / scale,
	},
	indicator: {
		alignSelf: 'center',
		position: 'absolute',
		width: rulerWidth,
		height: Math.round(68 * scale) / scale,
		backgroundColor: ColorsLight.primary[30],
	},
});
