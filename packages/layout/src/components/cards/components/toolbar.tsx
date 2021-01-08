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
	extraPB?: boolean;
	statusText: string;
};
export const Toolbar: React.FC<ToolbarProps> = ({
	complete,
	subtitle,
	buttonLeft,
	buttonRight,
	extraPB,
	statusText,
}) => {
	return (
		<div
			className={classNames([
				{ [styles.complete]: complete },
				styles.cardToolbar,
				extraPB && styles.extraPB,
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
				{complete ? (
					<StatusMessage
						complete={complete}
						icon={CheckedCircle}
						text={statusText}
					/>
				) : (
					<StatusMessage
						complete={complete}
						icon={ErrorCircle}
						text={statusText}
					/>
				)}
				<div className={styles.verticalHr} />
				<Flex cfg={{ alignItems: 'flex-start' }}>{buttonRight()}</Flex>
			</Flex>
		</div>
	);
};
