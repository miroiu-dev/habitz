import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { InteractionManager } from 'react-native';

export function useMeasurement() {
	const { dismiss } = useBottomSheetModal();

	const selectedMuscle = useBodyCompositionStore(
		state => state.selectedMuscle
	);
	const selectedMuscleInitialMeasurement = useBodyCompositionStore(
		state => state[selectedMuscle as keyof typeof state] as number
	);
	const setSelectedMuscle = useBodyCompositionStore(
		state => state.setSelectedMuscle
	);
	const setMuscleMeasurement = useBodyCompositionStore(
		state => state.setMuscleMeasurement
	);

	const [measurement, setMeasurement] = useState(0);

	const handleClose = (index: number) => {
		if (index === -1) {
			setSelectedMuscle(null);
		}
	};

	const handleConfirm = () => {
		if (selectedMuscle === null) return;

		setMuscleMeasurement(selectedMuscle, measurement);

		requestAnimationFrame(() => {
			InteractionManager.runAfterInteractions(() => {
				dismiss();
			});
		});
	};

	const onValueChange = (value: number) => {
		setMeasurement(value);
	};

	return {
		selectedMuscle,
		selectedMuscleInitialMeasurement,
		handleClose,
		handleConfirm,
		onValueChange
	};
}
