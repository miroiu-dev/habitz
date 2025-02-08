import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

export function Badge({ children }: PropsWithChildren) {
	return (
		<View className="relative p-0.5">
			<View className="absolute bg-primary-20 size-[10px] rounded-full right-0 top-0 z-10" />
			{children}
		</View>
	);
}
