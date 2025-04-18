import { Text } from '../text';

type FormErrorProps = {
	error?: string;
};

export function FormError({ error }: FormErrorProps) {
	return (
		<Text variant='body/small' className='text-danger'>
			{error}
		</Text>
	);
}
