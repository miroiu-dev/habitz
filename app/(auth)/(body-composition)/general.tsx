import { WaistHipRatioCard } from '@/components/body-composition';
import { MeasurementSheet } from '@/components/body-composition/measurement-sheet';
import { Measurements } from '@/components/body-composition/measurements';
import { Button, Container, Text } from '@/components/ui';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BodyComposition() {
	const bottomSheetRef = useRef<BottomSheetModal>(null);

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	return (
		<SafeAreaView edges={['bottom']}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				bounces={false}
				overScrollMode='never'
			>
				<Container className='pt-0 pb-0'>
					<Measurements openBottomSheet={openBottomSheet} />
					<Text variant='title/medium' className='mb-2'>
						Waist - Hip Ratio
					</Text>
					<WaistHipRatioCard />
					<Button title='Save all' className='my-6' />
					<MeasurementSheet ref={bottomSheetRef} />
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
