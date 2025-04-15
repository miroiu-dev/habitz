import { useKeyboardVisibility } from '@/hooks';
import { cn } from '@/lib/utils';
import { useNavigation } from 'expo-router';
import type { BaseSyntheticEvent } from 'react';
import { View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button, IconButton } from '../ui';

type OnboardingActionsProps = {
	onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
	title?: string;
	isSubmitting?: boolean;
};

export function OnboardingActions({
	onSubmit,
	title = 'Next',
	isSubmitting = false
}: OnboardingActionsProps) {
	const { goBack } = useNavigation();

	const isVisible = useKeyboardVisibility();

	return (
		<KeyboardStickyView>
			<View
				className={cn(
					'flex flex-row items-center gap-8 bg-white pt-4 pb-8 px-6',
					isVisible && 'border-t border-t-neutral-70 pt-2 pb-2'
				)}
			>
				<IconButton
					type='back'
					width={32}
					height={32}
					onPress={goBack}
					disabled={isSubmitting}
				/>
				<Button
					title={title}
					className='flex-1'
					onPress={onSubmit}
					disabled={isSubmitting}
				/>
			</View>
		</KeyboardStickyView>
	);
}
