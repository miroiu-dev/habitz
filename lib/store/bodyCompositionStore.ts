import { create } from 'zustand/react';
import type { Muscle } from '../types';

type BodyCompositionActions = {
	setSelectedMuscle: (muscle: Muscle | null) => void;
	setMuscleMeasurement: (muscle: Muscle, value: number) => void;
};

type BodyCompositionData = {
	selectedMuscle: Muscle | null;
	neck: number;
	leftBiceps: number;
	rightBiceps: number;
	chest: number;
	abs: number;
	leftTigh: number;
	rightTigh: number;
	leftCalf: number;
	rightCalf: number;
	shoulder: number;
	waist: number;
	hip: number;
};

export const useBodyCompositionStore = create<
	BodyCompositionData & BodyCompositionActions
>(set => ({
	setSelectedMuscle: muscle => set({ selectedMuscle: muscle }),
	selectedMuscle: null,
	neck: 0,
	leftBiceps: 0,
	rightBiceps: 0,
	chest: 0,
	abs: 0,
	leftTigh: 0,
	rightTigh: 0,
	leftCalf: 0,
	rightCalf: 0,
	shoulder: 0,
	waist: 0,
	hip: 0,
	setMuscleMeasurement: (muscle, value) => set({ [muscle]: value }),
}));
