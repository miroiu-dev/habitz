import { ColorsLight } from '@/constants/Colors';
import { Children, type ReactNode } from 'react';
import { Dimensions, type StyleProp, View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	clamp,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	type SharedValue,
} from 'react-native-reanimated';

interface CarouselProps {
	children: ReactNode[];
	containerStyle?: StyleProp<ViewStyle>;
	showPagination?: boolean;
	swipeTreshold?: number;
}

type PaginationProps = {
	itemsCount: number;
	showPagination?: boolean;
	activeIndex: SharedValue<number>;
};

type PaginationDotProps = {
	index: number;
	activeIndex: SharedValue<number>;
};

function PaginationDot({ activeIndex, index }: PaginationDotProps) {
	const stylez = useAnimatedStyle(() => {
		const isActive = activeIndex.value === index;

		return {
			width: isActive ? withSpring(24) : withSpring(8),
			backgroundColor: isActive
				? ColorsLight.primary[20]
				: ColorsLight.primary[5],
		};
	});

	return <Animated.View className="h-2 rounded" style={stylez} />;
}

function Pagination({
	itemsCount,
	showPagination,
	activeIndex,
}: PaginationProps) {
	if (!showPagination) return null;

	const dots = new Array(itemsCount).fill(0);
	return (
		<View className="flex flex-row justify-center items-center py-4 gap-2">
			{dots.map((_, index) => (
				<PaginationDot
					key={index}
					index={index}
					activeIndex={activeIndex}
				/>
			))}
		</View>
	);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MARGIN = 24;

export function Carousel({
	children,
	showPagination = true,
	swipeTreshold = 100,
}: CarouselProps) {
	const itemWidth = SCREEN_WIDTH - 2 * MARGIN;
	const translateX = useSharedValue(0);
	const activeIndex = useSharedValue(0);
	const itemsCount = children.length;

	const getCardPosition = (index: number) => {
		'worklet';
		return -index * (itemWidth + MARGIN);
	};

	const onSnap = (index: number) => {
		'worklet';

		const snapPoint = getCardPosition(index);

		translateX.value = withSpring(snapPoint, {
			damping: 25,
			stiffness: 100,
		});

		activeIndex.value = index;
	};

	const pan = Gesture.Pan()
		.onUpdate(event => {
			'worklet';

			const minSwipeLeft = MARGIN;

			const maxSwipeRight =
				-(itemsCount - 1) * itemWidth - itemsCount * MARGIN;
			const newTranslateX =
				getCardPosition(activeIndex.value) + event.translationX;

			translateX.value = clamp(
				newTranslateX,
				maxSwipeRight,
				minSwipeLeft
			);
		})
		.onEnd(event => {
			let nextCardIndex = activeIndex.value;

			const swipedRight =
				event.translationX < -swipeTreshold &&
				nextCardIndex + 1 <= itemsCount - 1;

			const swipedLeft =
				event.translationX > swipeTreshold && nextCardIndex - 1 >= 0;

			if (swipedRight) {
				nextCardIndex += 1;
			} else if (swipedLeft) {
				nextCardIndex -= 1;
			}

			onSnap(nextCardIndex);
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<GestureDetector gesture={pan}>
			<View className="flex flex-col">
				<Animated.View className="flex flex-row" style={animatedStyle}>
					{Children.map(children, child => (
						<View
							className="min-h-64"
							style={{
								width: itemWidth,
								marginRight: MARGIN,
							}}
						>
							{child}
						</View>
					))}
				</Animated.View>
				<Pagination
					activeIndex={activeIndex}
					itemsCount={itemsCount}
					showPagination={showPagination}
				/>
			</View>
		</GestureDetector>
	);
}
