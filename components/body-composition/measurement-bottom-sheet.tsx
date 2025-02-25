import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
	type BottomSheetProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { forwardRef, useCallback } from 'react';
import { Button, Container, RulerPicker, Text } from '../ui';

export const MeasurementBottomSheet = forwardRef<BottomSheet, BottomSheetProps>(
	(props, ref) => {
		const renderBackdrop = useCallback(
			(props: BottomSheetDefaultBackdropProps) => (
				<BottomSheetBackdrop
					{...props}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 49,
					}}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
				/>
			),
			[]
		);

		return (
			<BottomSheet
				ref={ref}
				index={0}
				enablePanDownToClose={true}
				enableHandlePanningGesture
				backdropComponent={renderBackdrop}
				enableContentPanningGesture={false}
				{...props}
			>
				<BottomSheetView>
					<Container>
						<Text
							variant="title/medium"
							className="text-center mb-8"
						>
							Choose{' '}
							<Text
								variant="title/medium"
								className="text-primary-30"
							>
								abs
							</Text>{' '}
							size
						</Text>
						<RulerPicker initialValue={0} />

						<Button title="Confirm" className="mt-8" />
					</Container>
				</BottomSheetView>
			</BottomSheet>
		);
	}
);
