import React, { useState } from 'react';
import { ColorsFullRange, Flex } from '@tpr/core';
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
		<div role="alert">
			<Flex cfg={{ justifyContent: 'space-between', bg: color }}>
				<div></div>
				<div className={Styles.content}>{children}</div>
				<div className={Styles.enableClose}>
					<CrossButton
						colour={'white'}
						onClick={() => {
							setClosed(!closed);
						}}
					/>
				</div>
			</Flex>
		</div>
	) : (
		<></>
	);
};

const PersistentPoscon: React.FC<ColorProps> = ({ color, children }) => {
	return (
		<div role="alert">
			<Flex cfg={{ justifyContent: 'center', bg: color, py: 8 }}>
				{children}
			</Flex>
		</div>
	);
};
