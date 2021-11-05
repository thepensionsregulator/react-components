import React from 'react';
import { Flex, SpaceProps, FlexProps } from '@tpr/core';
import { WarningCircle } from '@tpr/icons';
import styles from './warning.module.scss';

export type WarningBoxProps = {
	cfg?: SpaceProps & FlexProps;
	warningLabel?: string;
	wrapInMobile?: boolean;
};
export const WarningBox: React.FC<WarningBoxProps> = ({
	children,
	cfg,
	warningLabel = 'Warning',
	wrapInMobile = false,
}) => {
	return (
		<Flex
			cfg={Object.assign({ flexDirection: 'column', p: 4, my: 4 }, cfg)}
			className={styles.warning}
			role="alert"
		>
			<Flex
				cfg={{ flexDirection: 'row' }}
				className={wrapInMobile ? styles.innerWrapper : ''}
			>
				<WarningCircle cfg={{ mr: 4 }} alternativeText={warningLabel} />
				{children}
			</Flex>
		</Flex>
	);
};
