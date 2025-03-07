import { ColorsLight } from '@/constants/Colors';
import {
	BottomSheetBackdrop,
	type BottomSheetProps,
	BottomSheetView,
	BottomSheetModal as RNBottomSheetModal,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { forwardRef } from 'react';

function SheetBackground(props: BottomSheetDefaultBackdropProps) {
	return (
		<BottomSheetBackdrop
			{...props}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
			disappearsOnIndex={-1}
			appearsOnIndex={0}
		/>
	);
}

export const BottomSheetModal = forwardRef<
	RNBottomSheetModal,
	BottomSheetProps
>(({ children, ...props }, ref) => {
	return (
		<RNBottomSheetModal
			ref={ref}
			enablePanDownToClose={true}
			enableHandlePanningGesture
			backdropComponent={SheetBackground}
			enableContentPanningGesture={false}
			handleIndicatorStyle={{
				backgroundColor: ColorsLight.neutral[30],
				width: 100,
			}}
			{...props}
		>
			<BottomSheetView>{children}</BottomSheetView>
		</RNBottomSheetModal>
	);
});
