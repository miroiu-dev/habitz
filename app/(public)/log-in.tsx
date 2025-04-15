import { Button, Container, FormInput, Illustration } from '@/components/ui';
import { useFormNavigation } from '@/hooks';
import { type SignInSchema, signInSchema } from '@/lib/schemas/auth';
import { useSession } from '@/providers/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

export default function Login() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const { register } = useFormNavigation();
	const { signIn } = useSession();

	const onSubmit: SubmitHandler<SignInSchema> = async data =>
		await signIn(data);

	return (
		<>
			<Container className='gap-4'>
				<FormInput
					label='Email address'
					control={control}
					name='email'
					keyboardType='email-address'
					{...register()}
				/>
				<FormInput
					label='Password'
					control={control}
					name='password'
					secureTextEntry
					{...register(true)}
				/>
				<Button
					title='Log in'
					onPress={handleSubmit(onSubmit)}
					disabled={isSubmitting}
				/>
			</Container>
			<Illustration
				type='cat'
				style={{
					margin: 'auto',
					position: 'absolute',
					bottom: 0,
					left: '50%',
					transform: [{ translateX: '-50%' }]
				}}
			/>
		</>
	);
}
