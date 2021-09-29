import React from 'react';
import { classNames, H2 } from '@tpr/core';
import styles from './info.module.scss';

type InfoProps = { id: string; title?: string; importantMessage?: string };
export const Info: React.FC<InfoProps> = ({
	children,
	id = 'info',
	title,
	importantMessage,
}) => {
	return (
		<section
			id={id}
			data-testid={id}
			className={classNames([
				styles.info,
				{ [styles['important']]: importantMessage ? true : false },
			])}
			aria-labelledby={importantMessage ? `${id}-important` : undefined}
		>
			{importantMessage && (
				<strong className={styles.importantMessage} id={`${id}-important`}>
					{importantMessage}
				</strong>
			)}
			{title && <H2 cfg={{ mb: 2 }}>{title}</H2>}
			{children}
		</section>
	);
};
