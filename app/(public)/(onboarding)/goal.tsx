import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import {
	Container,
	FormRadioCard,
	FormRadioCardGroup,
	Text
} from '@/components/ui';
import {
	Goal as GoalEnum,
	type GoalSchema,
	goalSchema
} from '@/lib/schemas/auth';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Goal() {
	const goal = useOnboardingStore(state => state.goal);
	const updateGoalData = useOnboardingStore(state => state.updateGoal);

	const { control, handleSubmit } = useForm<GoalSchema>({
		resolver: zodResolver(goalSchema),
		defaultValues: {
			goal
		}
	});

	const { push } = useRouter();

	const onSubmit: SubmitHandler<GoalSchema> = data => {
		updateGoalData({
			goal: data.goal
		});

		push('/(public)/(onboarding)/activity-level');
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
				keyboardShouldPersistTaps='always'
				keyboardDismissMode='none'
				bottomOffset={80}
			>
				<Container className='h-full'>
					<Text variant='title/large'>Goal</Text>

					<Text variant='title/medium' className='mt-8'>
						Let’s start with your goal.
					</Text>
					<Text className='mt-1'>
						Select the one that matters most to you.
					</Text>

					<FormRadioCardGroup name='goal' control={control}>
						<View className='flex my-4 gap-4'>
							<FormRadioCard
								label='Lose weight'
								value={GoalEnum.lose}
							/>
							<FormRadioCard
								label='Maintain weight'
								value={GoalEnum.maintain}
							/>
							<FormRadioCard
								label='Gain weight'
								value={GoalEnum.gain}
							/>
						</View>
					</FormRadioCardGroup>
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions onSubmit={handleSubmit(onSubmit)} />
		</SafeAreaView>
	);
}
