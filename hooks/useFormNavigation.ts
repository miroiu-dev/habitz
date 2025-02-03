import { useCallback } from 'react';
import type {
	NativeSyntheticEvent,
	ReturnKeyTypeOptions,
	SubmitBehavior,
	TextInputSubmitEditingEventData,
} from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';

type Register = {
	submitBehavior: SubmitBehavior;
	returnKeyType: ReturnKeyTypeOptions;
	onSubmitEditing: (
		e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
	) => void;
};

export function useFormNavigation() {
	const register = useCallback((isLast = false): Register => {
		return {
			submitBehavior: isLast ? 'blurAndSubmit' : 'submit',
			returnKeyType: isLast ? 'done' : 'next',
			onSubmitEditing: () => {
				KeyboardController.setFocusTo('next');
			},
		};
	}, []);

	return { register };
}
