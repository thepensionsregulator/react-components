import React, { useState } from 'react';
import { useActuaryContext } from '../../../context';
import { ActuaryI18nProps } from '../../../i18n';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';
import Confirm from '../../../../common/views/remove/confirm/confirm';
import { cardType, cardTypeName } from '../../../../common/interfaces';

const getBreadcrumbLinks = (
	labels: Partial<ActuaryI18nProps['remove']['confirm']['breadcrumbs']>,
): BreadcrumbLink[] => [
	{
		to: 'BACK',
		underline: true,
		name: labels.link1,
	},
	{
		name: labels.link2,
		disabled: true,
	},
];

export const ConfirmRemove = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove, i18n } = useActuaryContext();
	const breadcrumbLinks = getBreadcrumbLinks(
		i18n?.remove?.confirm?.breadcrumbs,
	);
	const { actuary, remove } = current.context;

	const handleRemove = async () => {
		setLoading(true);
		await onRemove(
			{
				schemeRoleId: actuary.schemeRoleId,
				date: remove.date,
				effectiveDate: actuary.effectiveDate,
			},
			actuary,
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
			removeMessage1={i18n.remove.confirm.dialog.message1}
			removeBtnTitle={i18n.remove.confirm.buttons.remove}
			cancelBtnTitle={i18n.remove.confirm.buttons.cancel}
			iconFallbackText={i18n.remove.confirm.iconFallbackText}
			handleRemove={handleRemove}
			handleCancel={() => send('CANCEL')}
			loading={loading}
		/>
	);
};
