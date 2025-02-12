import { Button, Container, FormInput, Illustration } from '@/components/ui';
import { useFormNavigation } from '@/hooks';
import { type LoginSchema, loginSchema } from '@/lib/schemas/auth';
import { toast } from '@/lib/toast';
import { delay } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

export default function Login() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { register } = useFormNavigation();

	const onSubmit: SubmitHandler<LoginSchema> = async data => {
		await delay(2000);
		toast.success({ title: 'Logged in successfully' });
	};

	return (
		<>
			<Container className="gap-4">
				<FormInput
					label="Email address"
					control={control}
					name="email"
					keyboardType="email-address"
					{...register()}
				/>
				<FormInput
					label="Password"
					control={control}
					name="password"
					secureTextEntry
					{...register(true)}
				/>
				<Button
					title="Log in"
					onPress={handleSubmit(onSubmit)}
					disabled={isSubmitting}
				/>
				<Button title="Forgot password?" variant="tertiary" />
			</Container>
			<Illustration
				type="cat"
				style={{
					margin: 'auto',
					position: 'absolute',
					bottom: 0,
					left: '50%',
					transform: [{ translateX: '-50%' }],
				}}
			/>
		</>
	);
}
