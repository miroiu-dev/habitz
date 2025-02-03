import Svg, { G, Path, Defs, ClipPath, type SvgProps } from 'react-native-svg';

type Icon = keyof typeof iconMapping;

const iconMapping = {
	back: BackIcon,
	checkCircle: CheckCircleIcon,
	crossCircle: CrossCircleIcon,
};

export type IconProps = SvgProps & {
	type: Icon;
};

export function Icon({ type, ...props }: IconProps) {
	const SvgIcon = iconMapping[type];

	return <SvgIcon {...props} />;
}

function BackIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<G clipPath="url(#clip0_205_5919)">
				<Path
					d="M8.255 4.828c.262.22.37.506.37.797 0 .29-.108.577-.37.755L3.84 10.875h19.034a1.125 1.125 0 010 2.25H3.841l4.455 4.455a1.125 1.125 0 11-1.591 1.59L.33 12.796a1.125 1.125 0 010-1.59L6.705 4.83c.439-.44 1.151-.44 1.55-.002z"
					fill="#000"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_205_5919">
					<Path fill="#fff" d="M0 0H24V24H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

function CheckCircleIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<G clipPath="url(#clip0_1_3296)">
				<Path
					d="M11.428 15.928a1.315 1.315 0 01-1.856 0l-3-3a1.316 1.316 0 010-1.856 1.315 1.315 0 011.856 0l2.072 2.072 5.072-5.072c.51-.511 1.345-.511 1.856 0 .511.51.511 1.345 0 1.856l-6 6zM24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12zM12 2.25A9.749 9.749 0 002.25 12 9.749 9.749 0 0012 21.75 9.749 9.749 0 0021.75 12 9.749 9.749 0 0012 2.25z"
					fill="#000"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_1_3296">
					<Path fill="#fff" d="M0 0H24V24H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}

function CrossCircleIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<G clipPath="url(#clip0_1_3301)">
				<Path
					d="M8.203 8.203c.44-.436 1.153-.436 1.552 0l2.203 2.208 2.245-2.208c.44-.436 1.153-.436 1.552 0 .478.44.478 1.153 0 1.552l-2.166 2.203 2.166 2.245c.478.44.478 1.153 0 1.552-.399.478-1.111.478-1.552 0l-2.245-2.166-2.203 2.166c-.399.478-1.111.478-1.552 0-.436-.399-.436-1.111 0-1.552l2.208-2.245-2.208-2.203c-.436-.399-.436-1.111 0-1.552zM24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12zM12 2.25A9.749 9.749 0 002.25 12 9.749 9.749 0 0012 21.75 9.749 9.749 0 0021.75 12 9.749 9.749 0 0012 2.25z"
					fill="#000"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_1_3301">
					<Path fill="#fff" d="M0 0H24V24H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}
