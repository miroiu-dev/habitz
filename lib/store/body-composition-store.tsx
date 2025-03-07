import { create } from 'zustand/react';
import type { Muscle } from '../types';

type BodyCompositionActions = {
	setSelectedMuscle: (muscle: Muscle | null) => void;
};

type BodyCompositionData = {
	selectedMuscle: Muscle | null;
};

export const useBodyCompositionStore = create<
	BodyCompositionData & BodyCompositionActions
>(set => ({
	setSelectedMuscle: muscle => set({ selectedMuscle: muscle }),
	selectedMuscle: null,
}));
