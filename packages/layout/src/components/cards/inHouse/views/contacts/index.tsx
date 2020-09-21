import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import {
	cardType,
	cardTypeName,
	RecursivePartial,
	InHouseAdminI18nProps,
} from '@tpr/core';
import ContactDetails from '../../../common/views/contactDetails/contactDetails';

const getFields = (
	fields: RecursivePartial<InHouseAdminI18nProps['contacts']['fields']>,
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
	const { current, send, i18n, onSaveContacts } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const fields = getFields(i18n?.contacts?.fields);

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			await onSaveContacts(values, inHouseAdmin);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<ContactDetails
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			title={i18n.contacts.title}
			subtitle={i18n.contacts.subtitle}
			loading={loading}
			onSubmit={onSubmit}
			initialValues={{
				telephoneNumber: inHouseAdmin.telephoneNumber,
				emailAddress: inHouseAdmin.emailAddress,
			}}
			fields={fields}
		/>
	);
};
