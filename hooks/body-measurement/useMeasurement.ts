import { useBodyMeasurementStore } from '@/lib/store/bodyMeasurementStore';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useState } from 'react';

export function useMeasurement() {
	const { dismiss } = useBottomSheetModal();

	const selectedMuscle = useBodyMeasurementStore(
		state => state.selectedMuscle
	);
	const selectedMuscleInitialMeasurement = useBodyMeasurementStore(
		state => state[selectedMuscle as keyof typeof state] as number
	);
	const setSelectedMuscle = useBodyMeasurementStore(
		state => state.setSelectedMuscle
	);
	const setMuscleMeasurement = useBodyMeasurementStore(
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
		dismiss();
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
