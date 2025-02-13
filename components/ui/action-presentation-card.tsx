import { Pressable, type PressableProps, View } from 'react-native';
import { Icon, Illustration } from './svg';
import { Text } from './text';

export type ActionPresentationCardProps = {
	title: string;
	illustration: 'aurora-sm' | 'award-sm' | 'moment-sm';
	icon: Icon;
} & PressableProps;

export function ActionPresentationCard({
	illustration,
	title,
	icon,
	...props
}: ActionPresentationCardProps) {
	return (
		<Pressable
			className="flex flex-row items-center gap-4 px-6 overflow-hidden border-2 border-b-4 border-neutral-70 h-[5.8rem] bg-primary-1 rounded-lg relative active:bg-primary-20 active:border-b-2"
			{...props}
		>
			<View className="flex items-center justify-center bg-neutral-70 p-2 rounded-full">
				<Icon type={icon} fill="#fff" />
			</View>
			<Text variant="title/medium">{title}</Text>
			<View className="absolute right-0 -bottom-0.5">
				<Illustration type={illustration} />
			</View>
		</Pressable>
	);
}
