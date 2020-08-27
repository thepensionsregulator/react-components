import React, { useState } from 'react';
import { useNewActuaryContext } from '../../../context';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';
import Confirm from '../../../../common/views/remove/confirm/confirm';
import { cardType, cardTypeName } from '../../../../common/interfaces';
import { NewActuaryI18nProps } from '../../../i18n';

const getBreadcrumbLinks = (
	labels: Partial<NewActuaryI18nProps['remove']['confirm']['breadcrumbs']>,
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
	const { current, send, onRemove, i18n } = useNewActuaryContext();
	const breadcrumbLinks = getBreadcrumbLinks(
		i18n?.remove?.confirm?.breadcrumbs,
	);
	const { actuary, remove } = current.context;

	async function handleRemove() {
		setLoading(true);
		await onRemove(
			{
				schemeRoleId: actuary.schemeRoleId,
				date: remove.date,
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
	}

	return (
		<Confirm
      cardType={cardType.actuary}
      cardTypeName={cardTypeName.actuary}
      breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
      removeTitle={i18n.remove.confirm.title}
      removeMessage1={i18n.remove.confirm.dialog.message1}
      removeBtnTitle={i18n.remove.confirm.buttons.remove}
      cancelBtnTitle={i18n.remove.confirm.buttons.cancel}
      handleRemove={handleRemove}
      handleCancel={() => send('CANCEL')}
      loading={loading}
    />
	);
};
