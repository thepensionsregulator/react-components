import React, { useState } from 'react';
import { ColorsFullRange, Flex, ValuesFullRange } from '@tpr/core';
import { CrossButton } from '../buttons/buttons';
import Styles from './poscon.module.scss';

export type PosconProps = {
	color?: ColorsFullRange;
	enableClose?: boolean;
};

export type ColorProps = {
	color?: ColorsFullRange;
};

export const Poscon: React.FC<PosconProps> = ({
	color = 'success.1',
	enableClose = false,
	children,
}) => {
	return enableClose ? (
		<ClosablePoscon color={color}>{children}</ClosablePoscon>
	) : (
		<PersistentPoscon color={color}>{children}</PersistentPoscon>
	);
};

const ClosablePoscon: React.FC<ColorProps> = ({ color, children }) => {
	const [closed, setClosed] = useState<boolean>(false);
	return !closed ? (
		<PersistentPoscon color={color} pt={4}>
			<div className={Styles.enableClose}>
				<CrossButton
					colour={'white'}
					onClick={() => {
						setClosed(!closed);
					}}
				/>
			</div>
			{children}
		</PersistentPoscon>
	) : (
		<></>
	);
};

export type PersistentPosconProps = {
	color?: ColorsFullRange;
	pt?: ValuesFullRange;
};

const PersistentPoscon: React.FC<PersistentPosconProps> = ({
	color,
	pt = 8,
	children,
}) => {
	return (
		<Flex
			cfg={{
				alignItems: 'center',
				justifyContent: 'center',
				bg: color,
				pb: 6,
				pt: pt,
				flexDirection: 'column',
				textAlign: 'center',
			}}
			role="alert"
		>
			{children}
		</Flex>
	);
};
