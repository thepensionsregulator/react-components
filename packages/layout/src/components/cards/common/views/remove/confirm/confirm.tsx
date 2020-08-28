import React from 'react';
import { Hr, Flex, P, H3, Link } from '@tpr/core';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { WarningBox } from '../../../../../warning/warning';
import { cardType, cardTypeName } from '../../../interfaces';

interface ConfirmProps {
	cardType: cardType;
	cardTypeName?: cardTypeName;
	breadcrumbs: any;
	removeTitle: string;
	removeMessage1: string;
	removeMessage2?: string;
	removeBtnTitle: string;
	cancelBtnTitle: string;
	handleRemove: any;
	handleCancel: any;
	loading: boolean;
}

const Confirm: React.FC<ConfirmProps> = ({
	cardType,
	cardTypeName,
	breadcrumbs,
	removeTitle,
	removeMessage1,
	removeBtnTitle,
	cancelBtnTitle,
	handleRemove,
	handleCancel,
	loading,
}) => {
	return (
		<Content type={cardType} typeName={cardTypeName} breadcrumbs={breadcrumbs}>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>{removeTitle}</H3>
			<Hr cfg={{ my: 4 }} />
			<WarningBox>
				<P cfg={{ mb: 6 }}>{removeMessage1}</P>
				<Flex>
					<ArrowButton
						intent="danger"
						pointsTo="right"
						iconSide="right"
						title={removeBtnTitle}
						onClick={handleRemove}
						disabled={loading}
					/>
					<Link cfg={{ m: 3 }} underline onClick={handleCancel}>
						{cancelBtnTitle}
					</Link>
				</Flex>
			</WarningBox>
		</Content>
	);
};

export default React.memo(Confirm);
