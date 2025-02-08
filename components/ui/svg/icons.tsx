import Svg, { G, Path, Defs, ClipPath, type SvgProps } from 'react-native-svg';

type Icon = keyof typeof iconMapping;

const iconMapping = {
	back: BackIcon,
	checkCircle: CheckCircleIcon,
	crossCircle: CrossCircleIcon,
	bell: BellIcon,
	fire: FireIcon,
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

function BellIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M13 1.5v.838c3.398.54 6 3.484 6 7.037v1.566c0 2.128.727 4.195 2.053 5.859l.699.872a1.125 1.125 0 01-.877 1.828H2.125a1.126 1.126 0 01-.878-1.828l.698-.872A9.388 9.388 0 004 10.94V9.376a7.128 7.128 0 016-7.037V1.5a1.5 1.5 0 113 0zm-1.875 3A4.877 4.877 0 006.25 9.375v1.566c0 2.245-.65 4.434-1.86 6.309h14.22a11.642 11.642 0 01-1.86-6.31V9.376A4.877 4.877 0 0011.875 4.5h-.75zM14.5 21c0 .755-.314 1.56-.877 2.123A3.076 3.076 0 0111.5 24c-.797 0-1.56-.314-2.123-.877A3.076 3.076 0 018.5 21h6z"
				fill="#000"
			/>
		</Svg>
	);
}

function FireIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M17.164 2.402a28.11 28.11 0 00-2.63 2.806C13.254 3.45 11.666 1.664 9.875 0 5.27 4.271 2 9.844 2 13.2 2 19.167 6.697 24 12.5 24S23 19.167 23 13.2c0-2.494-2.438-7.645-5.836-10.798zM12.5 21.75c-4.547 0-8.25-3.838-8.25-8.55 0-2.127 2.074-6.244 5.63-10.036a32.218 32.218 0 012.83 3.37l1.718 2.362 1.846-2.262c.275-.334.557-.662.844-.984 2.174 2.694 3.632 6.088 3.632 7.55 0 4.71-3.703 8.55-8.25 8.55zm4.195-10.355l-2.408 2.742S10.519 9.328 10.238 9c-1.994 2.386-2.988 3.778-2.988 5.363 0 3.182 2.41 5.137 5.367 5.137 1.184 0 2.28-.37 3.17-.99 2.016-1.412 2.49-4.155 1.371-6.295-.14-.262-.294-.538-.463-.82z"
				fill="#000"
			/>
		</Svg>
	);
}
