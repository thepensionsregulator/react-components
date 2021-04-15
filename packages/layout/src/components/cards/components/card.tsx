import React from 'react';
import { classNames, Flex, H3, Hr, P } from '@tpr/core';
import styles from './card.module.scss';
import { UnderlinedButton } from './button';
import { useTrusteeContext } from '../trustee/context';

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

const CardContentSectionHeader:React.FC =()=>{
	const { current, i18n, send } = useTrusteeContext();
	if(current === undefined || current.context===undefined){
		return(<></>);
	}

	let sectionHeader = '';
	let canDisplay = false;
	if(current.context.openSection==='edit.address'){
		sectionHeader = i18n.preview.buttons.three;
		canDisplay = true;
	}else if(current.context.openSection==='edit.contact'){
		sectionHeader = i18n.preview.buttons.four;
		canDisplay = true;
	}

	if(canDisplay){
		return (
			<UnderlinedButton
				onClick={() => {
					send("CANCEL");
					console.log(current.context)
				}}
				isOpen={true}
			>
				{sectionHeader}
			</UnderlinedButton>
		);
	}else{
		return (<></>);
	}
}

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
				<CardContentSectionHeader />

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
			<Icon
				size={18}
				fill={complete ? styles.confirmed : styles.unconfirmed}
				ariaLabel={text}
			/>
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
