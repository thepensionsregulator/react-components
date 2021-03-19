import React from 'react';
import { classNames, Flex, H3, Hr } from '@tpr/core';
import { ParagraphNoMB } from '../components/paragraphNoMB';
import styles from './card.module.scss';

type StyledCardProps = { complete: boolean };
export const StyledCard: React.FC<StyledCardProps> = ({
	complete = false,
	children,
}) => {
	return (
		<div
			className={classNames([
				styles.card,
				{ [styles['card-completed']]: complete },
			])}
		>
			{children}
		</div>
	);
};

export const StyledCardToolbar: React.FC = ({ children }) => {
	return <div className={styles.cardToolbar}>{children}</div>;
};

type ToolbarProps = {
	title: string;
	subtitle?: string;
	sectionTitle?: string;
};
export const Toolbar: React.FC<ToolbarProps> = ({
	title,
	subtitle,
	sectionTitle,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column', mt: 4, mb: 3 }}>
			<Flex
				cfg={{ flexDirection: 'column', pb: 2 }}
				className={styles.toolbarBottomBorder}
			>
				{sectionTitle && (
					<ParagraphNoMB cfg={{ color: 'neutral.6', fontSize: 3 }}>
						{sectionTitle}
					</ParagraphNoMB>
				)}

				<H3 cfg={{ fontWeight: 3 }}>{title}</H3>
			</Flex>
			{subtitle && (
				<Flex cfg={{ py: 3 }} className={styles.toolbarBottomBorder}>
					<ParagraphNoMB cfg={{ color: 'neutral.6' }}>{subtitle}</ParagraphNoMB>
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
		<Flex cfg={{ alignItems: 'center' }} height="22px">
			<Icon
				size={18}
				fill={complete ? styles.confirmed : styles.unconfirmed}
				ariaLabel={text}
			/>
			<ParagraphNoMB
				cfg={{
					ml: 1,
					fontSize: 2,
					fontWeight: 3,
					color: complete ? 'confirmed' : 'unconfirmed',
				}}
			>
				{text}
			</ParagraphNoMB>
		</Flex>
	);
};
