import React, { useState } from 'react';
import { Flex } from '@tpr/core';
import { CrossButton } from '../buttons/buttons';
import Styles from './poscon.module.scss';

export type PosconProps = {
	colour?: ColourProps;
	enableClose: boolean;
};

export type ColourProps = {
	colour?: string;
};

export const Poscon: React.FC<PosconProps> = ({
	colour,
	enableClose,
	children,
}) => {
	const bgColour = colour ? colour : 'green';
	const e = enableClose;
	console.log(bgColour, e);
	return enableClose ? (
		<ClosablePoscon>{children}</ClosablePoscon>
	) : (
		<PersistentPoscon>{children}</PersistentPoscon>
	);
};

const ClosablePoscon: React.FC<ColourProps> = ({ children }) => {
	const [closed, setClosed] = useState<boolean>(false);
	return !closed ? (
		<div className={Styles.root} role="alert">
			<div></div>
			<div className={Styles.content}>{children}</div>
			<div className={Styles.enableClose}>
				<CrossButton
					colour={'white'}
					onClick={() => {
						setClosed(!closed);
						console.log('clicked');
					}}
				/>
			</div>
		</div>
	) : (
		<></>
	);
};

const PersistentPoscon: React.FC<ColourProps> = ({ children }) => {
	return (
		<div role="alert">
			<Flex cfg={{ justifyContent: 'center', bg: 'success.1', py: 8 }}>
				{children}
			</Flex>
		</div>
	);
};

// type CrossButtonProps = {
// 	colour?: ColourProps;
// 	handleClick: () => void;
// };

// const CrossButton: React.FC<CrossButtonProps> = ({ colour, handleClick }) => {
// 	return (
// 		<div className={Styles.crossButton_root}>
// 			<Cross colour={'white'} />
// 			<button
// 				type={'button'}
// 				className={Styles.crossButton}
// 				onClick={handleClick}
// 			></button>
// 		</div>
// 	);
// };
