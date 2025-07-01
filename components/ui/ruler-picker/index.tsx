import { ColorsLight } from '@/constants/Colors';
import { generateScaleData } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	clamp,
	runOnJS,
	useAnimatedScrollHandler,
	useSharedValue
} from 'react-native-reanimated';
import { itemSize, rulerWidth, scale, width } from './constants';
import { Measurement } from './measurement';
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
	step = 0.1
}: RulerProps) {
	const data = useMemo(
		() => generateScaleData(minValue, maxValue, step),
		[minValue, maxValue, step]
	);

	const initialOffset = useMemo(() => {
		const index = Math.round((initialValue - minValue) / step);
		return index * itemSize;
	}, [initialValue, minValue, step]);

	const initialNumToRender = useMemo(() => {
		const value = Math.ceil((initialValue - minValue) / step) + 10;

		return Math.max(value, 50);
	}, [initialValue, minValue, step]);

	const scrollX = useSharedValue(initialOffset);

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
		}
	});

	const getItemLayout = useCallback(
		(_: unknown, index: number) => {
			const length = index === data.length - 1 ? rulerWidth : itemSize;

			return {
				length,
				offset: length * index,
				index
			};
		},
		[data]
	);

	return (
		<View style={styles.container}>
			<Measurement minValue={minValue} scrollX={scrollX} />
			<View>
				<Animated.FlatList
					data={data}
					keyExtractor={String}
					bounces={false}
					horizontal
					showsHorizontalScrollIndicator={false}
					decelerationRate='normal'
					getItemLayout={getItemLayout}
					snapToInterval={itemSize}
					contentContainerStyle={styles.flatListContent}
					renderItem={({ item, index }) => (
						<RulerLine
							value={item}
							index={index}
							key={item}
							isLastItem={item === maxValue}
						/>
					)}
					onScroll={onScroll}
					scrollEventThrottle={16}
					removeClippedSubviews={false}
					initialNumToRender={initialNumToRender}
					maxToRenderPerBatch={50}
					windowSize={30}
					contentOffset={{ x: initialOffset, y: 0 }}
					persistentScrollbar={true}
					maintainVisibleContentPosition={{
						minIndexForVisible: 0,
						autoscrollToTopThreshold: 10
					}}
				/>
				<Indicator />
				<GradientOverlay />
			</View>
		</View>
	);
}

export const Indicator = memo(() => (
	<View style={styles.indicatorContainer}>
		<View style={styles.indicator} />
		<View style={styles.indicatorDot} />
	</View>
));

const GradientOverlay = memo(() => (
	<LinearGradient
		style={StyleSheet.absoluteFillObject}
		colors={['#fff', 'transparent', '#fff']}
		start={[0, 0.5]}
		end={[1, 0.5]}
		pointerEvents='none'
	/>
));

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	},
	animatedText: {
		fontSize: Math.round(24 * scale) / scale,
		fontWeight: '500',
		textAlign: 'center'
	},
	flatListContent: {
		paddingHorizontal:
			Math.round((width / 2 - rulerWidth / 2) * scale) / scale,
		paddingBottom: 40
	},
	indicatorContainer: {
		alignSelf: 'center',
		position: 'absolute',
		gap: 4
	},
	indicator: {
		width: rulerWidth,
		height: Math.round(68 * scale) / scale,
		backgroundColor: ColorsLight.primary[30]
	},
	indicatorDot: {
		width: rulerWidth,
		height: rulerWidth,
		backgroundColor: ColorsLight.primary[30],
		borderRadius: 9999
	}
});
