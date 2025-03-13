import { useMeasurement } from '@/hooks/body-composition/useMeasurement';
import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import { camelToFlat } from '@/lib/utils';
import {
	type BottomSheetProps,
	type BottomSheetModal as RNBottomSheetModal,
	useBottomSheetModal
} from '@gorhom/bottom-sheet';
import { forwardRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, Button, RulerPicker, Text } from '../ui';

export const MeasurementSheet = forwardRef<
	RNBottomSheetModal,
	Omit<BottomSheetProps, 'children'>
>((props, ref) => {
	const {
		handleClose,
		handleConfirm,
		onValueChange,
		selectedMuscle,
		selectedMuscleInitialMeasurement
	} = useMeasurement();

	return (
		<BottomSheetModal ref={ref} onChange={handleClose} {...props}>
			<SafeAreaView edges={['bottom']}>
				<Text variant='title/medium' className='text-center mb-8'>
					Choose{' '}
					<Text variant='title/medium' className='text-primary-30'>
						{camelToFlat(selectedMuscle ?? '')}
					</Text>{' '}
					size
				</Text>
				<RulerPicker
					initialValue={selectedMuscleInitialMeasurement}
					onChange={onValueChange}
				/>
				<Button
					title='Confirm'
					className='mt-8 my-4 mx-6'
					onPress={handleConfirm}
				/>
			</SafeAreaView>
		</BottomSheetModal>
	);
});
