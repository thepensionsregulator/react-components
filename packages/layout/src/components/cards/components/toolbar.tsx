import React from 'react';
import { Flex, classNames } from '@tpr/core';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import { StatusMessage } from './card';
import CardContentSectionHeader from './cardContentSectionHeader';
import styles from '../cards.module.scss';

export interface ToolbarProps {
	complete: boolean;
	subtitle?: Function;
	buttonLeft: Function;
	buttonRight: Function;
	statusText: string;
	subSectionHeaderText?: string;
}

export const Toolbar: React.FC<ToolbarProps> = React.memo(
	({
		complete,
		subtitle,
		buttonLeft,
		buttonRight,
		statusText,
		subSectionHeaderText,
	}) => {
		return (
			<div
				className={classNames([
					{ [styles.complete]: complete },
					styles.cardToolbar,
				])}
			>
				{subSectionHeaderText && (
					<CardContentSectionHeader sectionHeaderText={subSectionHeaderText} />
				)}
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
					<StatusMessage
						complete={complete}
						icon={complete ? CheckedCircle : ErrorCircle}
						text={statusText}
					/>
					<div className={styles.divider} />
					<Flex cfg={{ alignItems: 'flex-start' }}>{buttonRight()}</Flex>
				</Flex>
			</div>
		);
	},
);
