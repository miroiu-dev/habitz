import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import type { Muscle } from '@/lib/types';
import { View } from 'react-native';
import { HumanBody } from './human-body';
import { MeasurementCard } from './measurement-card';

type MeasurementsProps = {
	openBottomSheet: () => void;
};

export function Measurements({ openBottomSheet }: MeasurementsProps) {
	const selectedMuscle = useBodyCompositionStore(
		state => state.selectedMuscle
	);

	const setSelectedMuscle = useBodyCompositionStore(
		state => state.setSelectedMuscle
	);

	const handleSelectMuscle = (muscle: Muscle) => {
		setSelectedMuscle(muscle);
		openBottomSheet();
	};

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
