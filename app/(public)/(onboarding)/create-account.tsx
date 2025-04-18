import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import { Container, FormInput, Spacer, Text } from '@/components/ui';
import { useFormNavigation } from '@/hooks';
import {
	type CreateAccountSchema,
	createAccountSchema
} from '@/lib/schemas/auth';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { useSession } from '@/providers/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccount() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<CreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			confirmPassword: '',
			email: '',
			password: ''
		}
	});

	const onboarding = useOnboardingStore();
	const { register } = useFormNavigation();

	const { signUp } = useSession();

	const onSubmit: SubmitHandler<CreateAccountSchema> = async data =>
		await signUp({
			...data,
			activityLevel: onboarding.activityLevel,
			age: onboarding.age,
			fullName: onboarding.fullName,
			gender: onboarding.gender,
			goal: onboarding.goal,
			height: onboarding.height,
			weeklyGoal: onboarding.weeklyGoal,
			weight: onboarding.weight,
			goalWeight: onboarding.goalWeight
		});

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
					<Text variant='title/large'>Create account</Text>

					<Text variant='title/medium' className='mt-8 mb-6'>
						Almost done! Create your account.
					</Text>

					<View className='flex gap-4'>
						<FormInput
							label='Email address'
							placeholder='Enter your email'
							control={control}
							inputMode='email'
							keyboardType='email-address'
							name='email'
							{...register()}
						/>
						<FormInput
							label='Password'
							placeholder='Enter your password'
							control={control}
							inputMode='text'
							keyboardType='visible-password'
							secureTextEntry
							name='password'
							{...register()}
						/>
						<FormInput
							label='Confirm password'
							placeholder='Enter your password again'
							control={control}
							name='confirmPassword'
							secureTextEntry
							keyboardType='visible-password'
							inputMode='text'
							{...register(true)}
						/>
					</View>

					<Spacer />
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions
				onSubmit={handleSubmit(onSubmit)}
				isSubmitting={isSubmitting}
			/>
		</SafeAreaView>
	);
}
