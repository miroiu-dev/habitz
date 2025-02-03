import { cn } from '@/lib/utils';
import { Pressable, type PressableProps } from 'react-native';
import type { Primitive } from 'zod';
import { Text } from './text';

type RadioCardProps = {
	value: Primitive;
	onChange: (value: Primitive) => void;
	checked: boolean;
	label: string;
	description?: string;
} & Omit<PressableProps, 'onPress'>;

export function RadioCard({
	value,
	onChange,
	checked,
	label,
	description,
	...props
}: RadioCardProps) {
	return (
		<Pressable
			onPress={() => onChange(value)}
			className={cn(
				'p-4 border-2 border-b-4 rounded-lg flex-auto',
				checked && 'bg-primary-20 border-b-2'
			)}
			{...props}
		>
			<Text variant="title/medium">{label}</Text>
			{description && <Text>{description}</Text>}
		</Pressable>
	);
}
