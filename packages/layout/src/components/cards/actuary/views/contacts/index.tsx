import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useActuaryContext } from '../../context';
import { ActuaryI18nProps } from '../../i18n';
import {
	cardType,
	cardTypeName,
	RecursivePartial,
} from '../../../common/interfaces';
import ContactDetails from '../../../common/views/contactDetails/contactDetails';

const getFields = (
	fields: RecursivePartial<ActuaryI18nProps['contacts']['fields']>,
): FieldProps[] => [
	{
		type: 'phone',
		name: 'telephoneNumber',
		label: fields.telephone.label,
		inputWidth: 2,
		error: fields.telephone.error,
		cfg: { mb: 3 },
		required: true,
	},
	{
		type: 'email',
		name: 'emailAddress',
		label: fields.email.label,
		inputWidth: 6,
		error: fields.email.error,
		required: true,
	},
];

export const Contacts: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveContacts } = useActuaryContext();
	const { actuary } = current.context;
	const fields = getFields(i18n?.contacts?.fields);

	const onSubmit = async values => {
		setLoading(true);
		try {
			await onSaveContacts(
				{
					...values,
					schemeRoleId: actuary.schemeRoleId,
					title: actuary.title,
					firstName: actuary.firstName,
					lastName: actuary.lastName,
				},
				actuary,
			);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<ContactDetails
			type={cardType.actuary}
			typeName={cardTypeName.actuary}
			title={i18n.contacts.title}
			subtitle={i18n.contacts.subtitle}
			loading={loading}
			onSubmit={onSubmit}
			initialValues={{
				telephoneNumber: actuary.telephoneNumber,
				emailAddress: actuary.emailAddress,
			}}
			fields={fields}
		/>
	);
};
