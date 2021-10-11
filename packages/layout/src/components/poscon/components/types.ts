import {
	BackgroundProps,
	ColorProps,
	ColorsFullRange,
	CursorProps,
	FlexProps,
	SpaceProps,
	TypographyProps,
} from '@tpr/core';

export type PosconCfgType = FlexProps &
	SpaceProps &
	BackgroundProps &
	ColorProps &
	CursorProps &
	TypographyProps;

export interface PersistentPosconProps {
	cfg?: PosconCfgType;
}

export type CloseButtonColor = 'white' | 'black';

export interface ClosablePosconProps extends PersistentPosconProps {
	callback?: Function;
	closeButtonColor?: CloseButtonColor;
}

export interface PosconProps {
	callback?: Function;
	cfg?: PosconCfgType;
	closeButtonColor?: CloseButtonColor;
	color?: ColorsFullRange;
	enableClose?: boolean;
}
