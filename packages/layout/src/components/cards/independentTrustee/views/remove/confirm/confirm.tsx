import React, { useState } from 'react';
import { useIndependentTrusteeContext } from '../../../context';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';
import Confirm from '../../../../common/views/remove/confirm/confirm';
import { cardType, cardTypeName } from '../../../../common/interfaces';

const getBreadcrumbLinks = ({ link1, link2 }: any): BreadcrumbLink[] => [
	{
		to: 'BACK',
		underline: true,
		name: link1,
	},
	{
		name: link2,
		disabled: true,
	},
];

export const ConfirmRemove: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove, i18n } = useIndependentTrusteeContext();
	const breadcrumbLinks = getBreadcrumbLinks(
		i18n?.remove?.confirm?.breadcrumbs,
	);
	const { independentTrustee, remove } = current.context;

	const handleRemove = async () => {
		setLoading(true);
		await onRemove(
			{
				schemeRoleId: independentTrustee.schemeRoleId,
				date: remove.date,
			},
			independentTrustee,
		)
			.then(() => {
				setLoading(false);
				send('DELETE');
			})
			.catch(() => {
				setLoading(false);
			});
	};

	return (
		<Confirm
			cardType={cardType.actuary}
			cardTypeName={cardTypeName.actuary}
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
			removeTitle={i18n.remove.confirm.title}
			removeMessage1={i18n.remove.confirm.subtitle}
			removeBtnTitle={i18n.remove.confirm.buttons.remove}
			cancelBtnTitle={i18n.remove.confirm.buttons.cancel}
			handleRemove={handleRemove}
			handleCancel={() => send('CANCEL')}
			loading={loading}
		/>
	);
};
