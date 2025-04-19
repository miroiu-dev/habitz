import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import {
	type DimensionValue,
	Dimensions,
	type StyleProp,
	StyleSheet,
	View,
	type ViewStyle
} from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	cancelAnimation
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type SkeletonProps = {
	width?: DimensionValue;
	height?: DimensionValue;
	borderRadius?: number;
	backgroundColor?: string;
	shimmerColors?: readonly [string, string, ...string[]];
	duration?: number;
	style?: StyleProp<ViewStyle>;
};

export function Skeleton({
	width: itemWidth = 200,
	height = 20,
	borderRadius = 8,
	backgroundColor = '#e0e0e0',
	shimmerColors = ['#ebebeb', '#f5f5f5', '#ebebeb'],
	duration = 1500,
	style
}: SkeletonProps) {
	const translateX = useSharedValue(-width);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }]
		};
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: translateX is a stable value
	useEffect(() => {
		translateX.value = withRepeat(
			withTiming(width, { duration: duration }),
			-1,
			false
		);

		return () => {
			cancelAnimation(translateX);
		};
	}, []);

	return (
		<View
			style={[
				styles.container,
				style,
				{
					width: itemWidth,
					height,
					borderRadius,
					backgroundColor
				}
			]}
		>
			<Animated.View style={[styles.shimmer, animatedStyle]}>
				<LinearGradient
					colors={shimmerColors}
					style={styles.gradient}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		position: 'relative'
	},
	shimmer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	},
	gradient: {
		width: '200%',
		height: '100%'
	}
});
