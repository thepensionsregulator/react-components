import React from 'react';
import { Flex, H3, Hr, P } from '@tpr/core';
import styles from './card.module.scss';
import CardContentSectionHeader from './cardContentHeaderSection';

export const StyledCardToolbar: React.FC = ({ children }) => {
	return <div className={styles.cardToolbar}>{children}</div>;
};

type ToolbarProps = {
	title: string;
	subtitle?: string;
	sectionTitle?: string;
	subSectionHeaderText?: string;
	send?: Function;
};

export const Toolbar: React.FC<ToolbarProps> = ({
	title,
	subtitle,
	sectionTitle,
	subSectionHeaderText,
	send,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column', mt: 4, mb: 3 }}>
			<Flex
				cfg={{ flexDirection: 'column', pb: 2 }}
				className={styles.toolbarBottomBorder}
			>
				{subSectionHeaderText && (
					<Flex>
						<CardContentSectionHeader
							sectionHeaderText={subSectionHeaderText}
							send={send}
						/>
					</Flex>
				)}

				{sectionTitle && <P className={styles.sectionTitle}>{sectionTitle}</P>}
				<H3 cfg={{ fontWeight: 3 }}>{title}</H3>
			</Flex>
			{subtitle && (
				<Flex cfg={{ py: 3 }} className={styles.toolbarBottomBorder}>
					<P className={styles.subtitle}>{subtitle}</P>
				</Flex>
			)}
		</Flex>
	);
};

export const Footer: React.FC = ({ children }) => {
	return (
		<Flex
			cfg={{
				flex: '0 0 auto',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				width: 10,
				mt: 5,
			}}
		>
			<Hr cfg={{ mb: 6 }} />
			<Flex>{children}</Flex>
		</Flex>
	);
};

export const StatusMessage = ({ complete, icon: Icon, text }) => {
	return (
		<Flex className={styles.statusMsg}>
			<Icon size={18} fill={complete ? styles.confirmed : styles.unconfirmed} />
			<P
				className={styles.paragraph}
				cfg={{
					color: complete ? 'confirmed' : 'unconfirmed',
				}}
			>
				{text}
			</P>
		</Flex>
	);
};
