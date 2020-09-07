import React from 'react';
import { Flex, classNames } from '@tpr/core';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import { StatusMessage } from './card';
import styles from '../cards.module.scss';

export type ToolbarProps = {
	complete: boolean;
	subtitle?: Function;
	buttonLeft: Function;
	buttonRight: Function;
};
export const Toolbar: React.FC<ToolbarProps> = ({
	complete,
	subtitle,
	buttonLeft,
	buttonRight,
}) => {
	return (
		<div
			className={classNames([
				{ [styles.complete]: complete },
				styles.cardToolbar,
			])}
		>
			<Flex
				cfg={{
					width: 5,
					flex: '0 0 auto',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					pr: 4,
				}}
			>
				{buttonLeft()}
				{subtitle && (
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>{subtitle()}</Flex>
				)}
			</Flex>
			<Flex
				cfg={{
					width: 5,
					flex: '0 0 auto',
					justifyContent: 'flex-end',
					alignItems: 'flex-start',
					pl: 4,
				}}
			>
				{/* This code will be used in case that the showing the "Error" is not needed, replacing the code below */}
				{/* {complete && <StatusMessage complete={complete} icon={CheckedCircle} />} */}
				{complete ? (
					<StatusMessage complete={complete} icon={CheckedCircle} />
				) : (
					<StatusMessage complete={complete} icon={ErrorCircle} />
				)}
				<div className={styles.verticalHr} />
				<Flex cfg={{ alignItems: 'flex-start' }}>{buttonRight()}</Flex>
			</Flex>
		</div>
	);
};
