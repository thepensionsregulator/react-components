import React from 'react';
import { Hr, Flex, P, H3, Link } from '@tpr/core';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../interfaces';
import styles from './confirm.module.scss';
import { WarningText } from '../../../../../warningText/warningText';

interface ConfirmProps {
	cardType: cardType;
	cardTypeName?: cardTypeName;
	breadcrumbs: any;
	removeTitle: string;
	removeMessage1: string;
	removeMessage2?: string;
	removeBtnTitle: string;
	cancelBtnTitle: string;
	handleRemove: () => void;
	handleCancel: () => void;
	loading: boolean;
	iconFallbackText: string;
}

const Confirm: React.FC<ConfirmProps> = ({
	cardType,
	cardTypeName,
	breadcrumbs,
	removeTitle,
	removeMessage1,
	removeMessage2,
	removeBtnTitle,
	cancelBtnTitle,
	handleRemove,
	handleCancel,
	loading,
	iconFallbackText,
}) => {
	return (
		<Content type={cardType} typeName={cardTypeName} breadcrumbs={breadcrumbs}>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>{removeTitle}</H3>
			<Hr cfg={{ my: 4 }} />
			<div role="alert">
				<WarningText
					iconFallbackText={iconFallbackText}
					className={styles.confirm}
				>
					<P>{removeMessage1}</P>
					{removeMessage2 && <P>{removeMessage2}</P>}
				</WarningText>
				<Flex className={styles.actionButtons}>
					<ArrowButton
						intent="warning"
						pointsTo="right"
						iconSide="right"
						title={removeBtnTitle}
						onClick={handleRemove}
						disabled={loading}
					/>
					<Link
						underline
						onClick={handleCancel}
						className={styles.cancelButton}
					>
						{cancelBtnTitle}
					</Link>
				</Flex>
			</div>
		</Content>
	);
};

export default React.memo(Confirm);
