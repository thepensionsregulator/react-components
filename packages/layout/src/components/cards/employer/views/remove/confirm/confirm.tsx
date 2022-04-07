import React, { useState } from 'react';
import { useEmployerContext } from '../../../context';
import { EmployerI18nProps } from '../../../i18n';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';
import Confirm from '../../../../common/views/remove/confirm/confirm';
import { cardType, cardTypeName } from '../../../../common/interfaces';

const getBreadcrumbLinks = (
	labels: Partial<EmployerI18nProps['remove']['confirm']['breadcrumbs']>,
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

export const ConfirmRemove: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove, i18n } = useEmployerContext();
	const breadcrumbLinks = getBreadcrumbLinks(
		i18n?.remove?.confirm?.breadcrumbs,
	);
	const { employer, remove } = current.context;

	const handleRemove = async () => {
		setLoading(true);
		await onRemove(
			{
				schemeRoleId: employer.schemeRoleId,
				effectiveDate: employer.effectiveDate,
				date: remove.date,
			},
			employer,
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
			cardType={cardType.employer}
			cardTypeName={cardTypeName.employer}
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
			removeTitle={i18n.remove.confirm.title}
			removeMessage1={i18n.remove.confirm.dialog.message1}
			removeMessage2={i18n.remove.confirm.dialog.message2}
			removeBtnTitle={i18n.remove.confirm.buttons.remove}
			cancelBtnTitle={i18n.remove.confirm.buttons.cancel}
			iconFallbackText={i18n.remove.confirm.iconFallbackText}
			handleRemove={handleRemove}
			handleCancel={() => send('CANCEL')}
			loading={loading}
		/>
	);
};
