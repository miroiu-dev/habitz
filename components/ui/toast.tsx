import { cn } from '@/lib/utils';
import { Pressable, type PressableProps, View } from 'react-native';
import type { ToastConfigParams } from 'react-native-toast-message';
import { Icon } from './svg/icons';
import { Text } from './text';

type ToastButtonProps = PressableProps & {
	text?: string;
};

function ToastButton({ text, ...props }: ToastButtonProps) {
	return (
		<Pressable
			className='flex flex-row items-center justify-center rounded-tr-2xl rounded-br-2xl bg-green-10 active:bg-neutral-30 h-full px-4'
			{...props}
		>
			<Text variant='body/base' className='mt-0.5'>
				{text}
			</Text>
		</Pressable>
	);
}

type ToastProps = {
	actionText?: string;
	action: () => void;
};

export function Toast({
	type,
	text1,
	text2,
	props,
	hide
}: ToastConfigParams<ToastProps>) {
	const isSuccess = type === 'success';
	const isError = type === 'error';

	return (
		<View
			className={cn(
				'flex flex-row items-center gap-2 rounded-2xl mx-6',
				isSuccess && 'bg-positive',
				isError && 'bg-danger'
			)}
		>
			<View className='flex flex-row items-center pl-4 py-3 gap-2 flex-1'>
				{isSuccess && <Icon type='checkCircle' />}
				{isError && <Icon type='crossCircle' />}
				<View className='flex justify-center flex-shrink'>
					{text1 && (
						<Text variant='title/medium' className='leading-6'>
							{text1}
						</Text>
					)}
					{text2 && <Text variant='body/base'>{text2}</Text>}
				</View>
			</View>
			{props?.action && (
				<ToastButton
					text={props?.actionText}
					onPress={() => {
						props?.action?.();
						hide?.();
					}}
				/>
			)}
		</View>
	);
}
