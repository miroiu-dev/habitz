import {
	HumanBody,
	MeasurementCard,
	WaistHipRatioCard,
} from '@/components/body-composition';
import { MeasurementSheet } from '@/components/body-composition/measurement-sheet';
import { Measurements } from '@/components/body-composition/measurements';
import { Button, Container, Icon, RulerPicker, Text } from '@/components/ui';
import { getToday } from '@/lib/time';
import type { Muscle } from '@/lib/types';
import { camelToFlat } from '@/lib/utils';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function BodyComposition() {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const today = getToday();

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
			<Container>
				<View className="flex flex-row items-center gap-2">
					<Icon type="calendar" />
					<Text variant="title/medium">{today}</Text>
				</View>
				<Measurements openBottomSheet={openBottomSheet} />
				<Text variant="title/medium" className="mb-2">
					Waist - Hip Ratio
				</Text>
				<WaistHipRatioCard />
				<Button title="Save all" className="mt-6" />
				<MeasurementSheet ref={bottomSheetRef} />
			</Container>
		</ScrollView>
	);
}
