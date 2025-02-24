import {
	HumanBody,
	MeasurementCard,
	WaistHipRatioCard,
} from '@/components/body-composition';
import { MeasurementBottomSheet } from '@/components/body-composition/measurement-bottom-sheet';
import { Button, Container, Icon, Text } from '@/components/ui';
import { getToday } from '@/lib/time';
import type BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { ScrollView, View } from 'react-native';

export default function BodyComposition() {
	const today = getToday();

	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
			<Container>
				<View className="flex flex-row items-center gap-2">
					<Icon type="calendar" />
					<Text variant="title/medium">{today}</Text>
				</View>
				<View className="flex flex-row justify-between items-center mt-8 mb-6 gap-2">
					<View className="flex gap-4">
						<MeasurementCard muscle="Neck" value={36.4} />
						<MeasurementCard
							muscle="Biceps"
							value={36.4}
							side="L"
						/>
						<MeasurementCard muscle="Chest" value={36.4} />
						<MeasurementCard muscle="Abs" value={36.4} />
						<MeasurementCard muscle="Tigh" value={36.4} side="L" />
						<MeasurementCard muscle="Calf" value={36.4} side="L" />
					</View>
					<View>
						<HumanBody highlight="leftBiceps" />
					</View>
					<View className="flex gap-4">
						<MeasurementCard muscle="Shoulder" value={36.4} />
						<MeasurementCard
							muscle="Biceps"
							value={36.4}
							side="R"
						/>
						<MeasurementCard muscle="Waist" value={36.4} />
						<MeasurementCard muscle="Hip" value={36.4} />
						<MeasurementCard muscle="Tigh" value={36.4} side="R" />
						<MeasurementCard muscle="Calf" value={36.4} side="R" />
					</View>
				</View>

				<Text variant="title/medium" className="mb-2">
					Waist - Hip Ratio
				</Text>
				<WaistHipRatioCard ratio={0.84} />
				<Button title="Save all" className="mt-6" />

				<MeasurementBottomSheet />
			</Container>
		</ScrollView>
	);
}
