import React from 'react';
import { Flex, SpaceProps, FlexProps } from '@tpr/core';
import styles from './warning.module.scss';

export type WarningBoxProps = {
	cfg?: SpaceProps & FlexProps;
};
export const WarningBox: React.FC<WarningBoxProps> = ({ children, cfg }) => {
	return (
		<Flex
			cfg={Object.assign({ flexDirection: 'column', p: 4, my: 4 }, cfg)}
			className={styles.warning}
			role="alert"
		>
			{children}
		</Flex>
	);
};
