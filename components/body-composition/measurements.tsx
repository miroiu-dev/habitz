import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import type { Muscle } from '@/lib/types';
import type { BottomSheetModal as RNBottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { HumanBody } from './human-body';
import { MeasurementCard } from './measurement-card';

// <BottomSheetModal ref={bottomSheetRef}>
// 					<Text variant="title/medium" className="text-center mb-8">
// 						Choose{' '}
// 						<Text
// 							variant="title/medium"
// 							className="text-primary-30"
// 						>
// 							{camelToFlat(selectedMuscle ?? '')}
// 						</Text>{' '}
// 						size
// 					</Text>
// 					<RulerPicker initialValue={5} />
// 					<Button
// 						title="Confirm"
// 						className="mt-8 my-4 mx-6"
// 						onPress={hideMeasurementBottomSheet}
// 					/>
// 				</BottomSheetModal>

export function Measurements() {
	// const bottomSheetRef = useRef<RNBottomSheetModal>(null);

	// const showMeasurementBottomSheet = (muscle: Muscle) => {
	// 	// bottomSheetRef.current?.present();
	// };

	// const hideMeasurementBottomSheet = () => {
	// 	// bottomSheetRef.current?.dismiss();
	// };

	const selectedMuscle = useBodyCompositionStore(
		state => state.selectedMuscle
	);

	const setSelectedMuscle = useBodyCompositionStore(
		state => state.setSelectedMuscle
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Imutable function
	const handleSelectMuscle = useCallback((muscle: Muscle) => {
		setSelectedMuscle(muscle);
	}, []);

	return (
		<View className="flex flex-row justify-between items-center mt-8 mb-6 gap-2">
			<View className="flex gap-4">
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="neck"
					label="Neck"
					value={36.4}
					isActive={selectedMuscle === 'neck'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="leftBiceps"
					label="Biceps"
					value={36.4}
					side="L"
					isActive={selectedMuscle === 'leftBiceps'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="chest"
					label="Chest"
					value={36.4}
					isActive={selectedMuscle === 'chest'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="abs"
					label="Abs"
					value={36.4}
					isActive={selectedMuscle === 'abs'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="leftTigh"
					label="Tigh"
					value={36.4}
					side="L"
					isActive={selectedMuscle === 'leftTigh'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="leftCalf"
					label="Calf"
					value={36.4}
					side="L"
					isActive={selectedMuscle === 'leftCalf'}
				/>
			</View>
			<View>
				<HumanBody highlight={selectedMuscle} />
			</View>
			<View className="flex gap-4">
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="shoulder"
					label="Shoulder"
					value={36.4}
					isActive={selectedMuscle === 'shoulder'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="leftBiceps"
					label="Biceps"
					value={36.4}
					side="R"
					isActive={selectedMuscle === 'rightBiceps'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="waist"
					label="Waist"
					value={36.4}
					isActive={selectedMuscle === 'waist'}
				/>

				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="hip"
					label="Hip"
					value={36.4}
					isActive={selectedMuscle === 'hip'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="rightTigh"
					label="Tigh"
					value={36.4}
					side="R"
					isActive={selectedMuscle === 'rightTigh'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle="rightCalf"
					label="Calf"
					value={36.4}
					side="R"
					isActive={selectedMuscle === 'rightCalf'}
				/>
			</View>
		</View>
	);
}
