import { ColorsLight } from '@/constants/Colors';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../text';
import { itemSize, rulerWidth, scale } from './constants';

type RulerLineProps = {
	index: number;
	value: number;
	isLastItem: boolean;
};

const getRulerLineHeight = (value: number) => {
	if (value % 10 === 0) {
		return Math.round(68 * scale) / scale;
	}
	if (value % 5 === 0) {
		return Math.round(34 * scale) / scale;
	}
	return Math.round(21 * scale) / scale;
};

export const RulerLine = memo(
	({ index, value, isLastItem }: RulerLineProps) => {
		const height = getRulerLineHeight(index);
		const isMultipleOfTen = index % 10 === 0;

		return (
			<View
				style={[
					styles.rulerLineContainer,
					{
						width: isLastItem ? rulerWidth : itemSize,
					},
				]}
			>
				<View
					style={[
						styles.rulerLine,
						{
							height,
						},
					]}
				/>
				{isMultipleOfTen && (
					<Text className="absolute left-0.5 -translate-x-1/2 text-center w-8 -bottom-8">
						{value}
					</Text>
				)}
			</View>
		);
	}
);

const styles = StyleSheet.create({
	rulerLineContainer: {
		height: Math.round(68 * scale) / scale,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		position: 'relative',
	},
	rulerLine: {
		width: rulerWidth,
		backgroundColor: ColorsLight.neutral[30],
	},
	numberText: {
		position: 'absolute',
		bottom: 0,
		width: itemSize,
		textAlign: 'center',
		fontSize: Math.round(12 * scale) / scale,
		color: ColorsLight.neutral[50],
	},
});
