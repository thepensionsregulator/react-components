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
						justifyContent: 'flex-start',
						pr: 4,
					}}
					className={styles.section}
				>
					{buttonLeft()}
					{subtitle && (
						<Flex cfg={{ flexDirection: 'column' }}>{subtitle()}</Flex>
					)}
				</Flex>
				<Flex
					cfg={{
						pl: 4,
					}}
					className={styles.section + ' ' + styles.removeSection}
				>
					<StatusMessage
						complete={complete}
						icon={complete ? CheckedCircle : ErrorCircle}
						text={statusText}
					/>
					<div className={styles.divider} />
					<Flex className={styles.removeBtnWrapper}>{buttonRight()}</Flex>
				</Flex>
			</div>
		);
	},
);
