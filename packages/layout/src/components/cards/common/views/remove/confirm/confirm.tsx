import React from 'react';
import { Hr, Flex, P, H3, Link } from '@tpr/core';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { WarningBox } from '../../../../../warning/warning';
import { cardType, cardTypeName } from '../../../interfaces';
import styles from './confirm.module.scss';

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
	warningLabel?: string;
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
	warningLabel,
}) => {
	return (
		<Content type={cardType} typeName={cardTypeName} breadcrumbs={breadcrumbs}>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>{removeTitle}</H3>
			<Hr cfg={{ my: 4 }} />
			<WarningBox warningLabel={warningLabel} wrapInMobile={true}>
				<Flex className={styles.confirm}>
					<P className={styles.paragraph1}>{removeMessage1}</P>
					{removeMessage2 && (
						<P className={styles.paragraph2}>{removeMessage2}</P>
					)}
					<Flex cfg={{ mt: 3 }} className={styles.actionButtons}>
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
				</Flex>
			</WarningBox>
		</Content>
	);
};

export default React.memo(Confirm);
