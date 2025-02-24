import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback } from 'react';

export function MeasurementBottomSheet() {
	const renderBackdrop = useCallback(
		(props: BottomSheetDefaultBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	return (
		<BottomSheet
			snapPoints={['30%']}
			index={0}
			enablePanDownToClose
			backdropComponent={renderBackdrop}
		>
			<BottomSheetView />
		</BottomSheet>
	);
}
