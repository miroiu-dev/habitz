import { ColorsLight } from '@/constants/Colors';
import { generateScaleData } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { type FlatList, StyleSheet, View } from 'react-native';
import Animated, {
	clamp,
	runOnJS,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
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
	const flatListRef = useRef<FlatList>(null);

	const data = useMemo(
		() => generateScaleData(minValue, maxValue, step),
		[minValue, maxValue, step]
	);

	const initialIndex = useMemo(
		() => Math.round((initialValue - minValue) / step),
		[initialValue, minValue, step]
	);

	const scrollX = useSharedValue(initialIndex * itemSize);

	useLayoutEffect(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToIndex({
				index: initialIndex,
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

	const getItemLayout = useCallback(
		(_: unknown, index: number) => {
			const length = index === data.length - 1 ? rulerWidth : itemSize;

			return {
				length,
				offset: length * index,
				index,
			};
		},
		[data]
	);

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
				<Animated.FlatList
					ref={flatListRef}
					data={data}
					keyExtractor={String}
					bounces={false}
					horizontal
					showsHorizontalScrollIndicator={false}
					decelerationRate="normal"
					getItemLayout={getItemLayout}
					snapToInterval={itemSize}
					contentContainerStyle={styles.flatListContent}
					renderItem={({ item, index }) => (
						<RulerLine
							value={item}
							index={index}
							isLastItem={item === maxValue}
						/>
					)}
					onScroll={onScroll}
					scrollEventThrottle={16}
					removeClippedSubviews={false}
					initialNumToRender={data.length}
					maxToRenderPerBatch={50}
					updateCellsBatchingPeriod={5}
					windowSize={21}
					maintainVisibleContentPosition={{
						minIndexForVisible: 0,
						autoscrollToTopThreshold: 10,
					}}
				/>
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
