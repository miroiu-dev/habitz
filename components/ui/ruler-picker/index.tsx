import { ColorsLight } from '@/constants/Colors';
import { generateScaleData } from '@/lib/utils';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useLayoutEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	clamp,
	runOnJS,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import type { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/component/ScrollView';
import { Text } from '../text';
import { AnimatedText } from './animated-text';
import { itemSize, rulerWidth, scale, width } from './constants';
import { RulerLine } from './ruler-line';

type RulerProps = {
	onChange?: (value: number) => void;
	minValue?: number;
	maxValue?: number;
	step?: number;
	initialValue?: number;
};

export function RulerPicker({
	onChange,
	minValue = 0,
	maxValue = 240,
	initialValue = 0,
	step = 0.1,
}: RulerProps) {
	const scrollViewRef = useAnimatedRef<AnimatedScrollView>();

	const data = useMemo(
		() => generateScaleData(minValue, maxValue, step),
		[minValue, maxValue, step]
	);

	const initialIndex = useMemo(
		() => Math.round((initialValue - minValue) / step),
		[initialValue, minValue, step]
	);

	const scrollX = useSharedValue(initialIndex * itemSize);

	// biome-ignore lint/correctness/useExhaustiveDependencies: No need to add scrollViewRef to the dependencies because it's a ref
	useLayoutEffect(() => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				x: initialIndex * itemSize,
				animated: false,
			});
		}
	}, [initialIndex]);

	const onScroll = useAnimatedScrollHandler({
		onScroll: event => {
			scrollX.value = clamp(
				(event.contentOffset.x / itemSize) * step,
				minValue,
				maxValue
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
			<View className="flex flex-row gap-1 items-baseline justify-center mb-2">
				<AnimatedText displayText={scrollX} defaultValue={minValue} />
				<Text
					variant="body/small"
					style={{ fontVariant: ['tabular-nums'] }}
				>
					cm
				</Text>
			</View>
			<View>
				<Animated.ScrollView
					ref={scrollViewRef}
					bounces={false}
					horizontal
					showsHorizontalScrollIndicator={false}
					decelerationRate={0.98}
					snapToInterval={itemSize}
					contentContainerStyle={styles.flatListContent}
					onScroll={onScroll}
					scrollEventThrottle={16}
					removeClippedSubviews={false}
					maintainVisibleContentPosition={{
						minIndexForVisible: 0,
						autoscrollToTopThreshold: 10,
					}}
				>
					{data.map((item, index) => (
						<RulerLine
							key={item}
							value={item}
							index={index}
							isLastItem={item === maxValue}
						/>
					))}
				</Animated.ScrollView>
				<View style={styles.indicatorContainer}>
					<View style={styles.indicator} />
					<View style={styles.indicatorDot} />
				</View>
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
	animatedText: {
		fontSize: Math.round(24 * scale) / scale,
		fontWeight: '500',
		textAlign: 'center',
	},
	flatListContent: {
		paddingHorizontal:
			Math.round((width / 2 - rulerWidth / 2) * scale) / scale,
		paddingBottom: 40,
	},
	indicatorContainer: {
		alignSelf: 'center',
		position: 'absolute',
		gap: 4,
	},
	indicator: {
		width: rulerWidth,
		height: Math.round(68 * scale) / scale,
		backgroundColor: ColorsLight.primary[30],
	},
	indicatorDot: {
		width: rulerWidth,
		height: rulerWidth,
		backgroundColor: ColorsLight.primary[30],
		borderRadius: 9999,
	},
});
