import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import {
	getWaistHipRatio,
	getWaistHipRatioColor,
	getWaistHipRatioText,
} from '@/lib/utils';
import { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../ui';

export function WaistHipRatioCard() {
	const waist = useBodyCompositionStore(state => state.waist);
	const hip = useBodyCompositionStore(state => state.hip);

	const waistHipRatio = useMemo(
		() => getWaistHipRatio(waist, hip),
		[waist, hip]
	);

	const waistHipRatioColor = useMemo(
		() => getWaistHipRatioColor(waistHipRatio),
		[waistHipRatio]
	);

	const waistHipRatioText = useMemo(
		() => getWaistHipRatioText(waistHipRatio),
		[waistHipRatio]
	);

	return (
		<View className="flex items-center bg-primary-1 rounded-lg py-3 px-6">
			<Text variant="body/small">{waistHipRatio}</Text>
			<Text variant="title/large" className={waistHipRatioColor}>
				{waistHipRatioText}
			</Text>

			<View className="flex flex-row">
				<View className="flex flex-1 gap-1">
					<Text
						variant="body/small"
						className="text-blue-40 text-right -mr-3"
					>
						0.96
					</Text>
					<View className="h-1.5 bg-blue-40 w-full rounded-tl-lg rounded-bl-lg" />
					<Text variant="body/small" className="text-left ml-1">
						Low
					</Text>
				</View>
				<View className="flex flex-1 gap-1">
					<Text variant="body/small" />
					<View className="h-1.5 bg-positive w-full" />
					<Text variant="body/small" className="text-center">
						Standard
					</Text>
				</View>
				<View className="flex flex-1 gap-1">
					<Text
						variant="body/small"
						className="text-gold text-left -ml-3"
					>
						1.00
					</Text>
					<View className="h-1.5 bg-gold w-full rounded-tr-lg rounded-br-lg" />
					<Text variant="body/small" className="text-right mr-1">
						High
					</Text>
				</View>
			</View>
		</View>
	);
}
