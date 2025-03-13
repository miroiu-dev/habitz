import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import type { Muscle } from '@/lib/types';
import { InteractionManager, View } from 'react-native';
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
		if (selectedMuscle !== null) {
			return;
		}

		openBottomSheet();

		requestAnimationFrame(() => {
			InteractionManager.runAfterInteractions(() => {
				setSelectedMuscle(muscle);
			});
		});
	};

	return (
		<View className='flex flex-row justify-between items-center mt-8 mb-6 gap-2'>
			<View className='flex gap-4'>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='neck'
					label='Neck'
					isActive={selectedMuscle === 'neck'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='leftBiceps'
					label='Biceps'
					side='L'
					isActive={selectedMuscle === 'leftBiceps'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='chest'
					label='Chest'
					isActive={selectedMuscle === 'chest'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='abs'
					label='Abs'
					isActive={selectedMuscle === 'abs'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='leftTigh'
					label='Tigh'
					side='L'
					isActive={selectedMuscle === 'leftTigh'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='leftCalf'
					label='Calf'
					side='L'
					isActive={selectedMuscle === 'leftCalf'}
				/>
			</View>
			<View>
				<HumanBody highlight={selectedMuscle} />
			</View>
			<View className='flex gap-4'>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='shoulder'
					label='Shoulder'
					isActive={selectedMuscle === 'shoulder'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='rightBiceps'
					label='Biceps'
					side='R'
					isActive={selectedMuscle === 'rightBiceps'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='waist'
					label='Waist'
					isActive={selectedMuscle === 'waist'}
				/>

				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='hip'
					label='Hip'
					isActive={selectedMuscle === 'hip'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='rightTigh'
					label='Tigh'
					side='R'
					isActive={selectedMuscle === 'rightTigh'}
				/>
				<MeasurementCard
					onSelectMuscle={handleSelectMuscle}
					muscle='rightCalf'
					label='Calf'
					side='R'
					isActive={selectedMuscle === 'rightCalf'}
				/>
			</View>
		</View>
	);
}
