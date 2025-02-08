import { getHeaderTitle } from '@react-navigation/elements';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { IconButton } from '../ui/icon-button';
import { Text } from '../ui/text';

export function Header({
	navigation,
	options,
	route,
	back,
}: NativeStackHeaderProps) {
	const title = getHeaderTitle(options, route.name);

	if (!options.headerShown) {
		return null;
	}

	return (
		<View className="flex flex-row items-center px-6 pb-8 pt-4">
			{back && (
				<IconButton
					type="back"
					onPress={() => navigation.goBack()}
					className="mr-4"
				/>
			)}
			<Text variant="title/large">{title}</Text>
		</View>
	);
}
