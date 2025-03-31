import { useMeasurement } from '@/hooks/body-composition/useMeasurement';
import { camelToFlat } from '@/lib/utils';
import type {
	BottomSheetProps,
	BottomSheetModal as RNBottomSheetModal
} from '@gorhom/bottom-sheet';
import { forwardRef } from 'react';
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
