import React from 'react';
import { Flex, H4, H5, Hr, P } from '@tpr/core';
import CardContentSectionHeader from './cardContentSectionHeader';
import styles from './card.module.scss';

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
					<CardContentSectionHeader
						sectionHeaderText={subSectionHeaderText}
						send={send}
					/>
				)}

				{sectionTitle && <P className={styles.sectionTitle}>{sectionTitle}</P>}
				{subSectionHeaderText ? (
					<H5
						className={`${styles.heading} ${
							!sectionTitle ? styles.noSubSection : ''
						}`}
					>
						{title}
					</H5>
				) : (
					<H4 className={styles.heading}>{title}</H4>
				)}
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
				mt: 5,
			}}
			className={styles.footer}
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
