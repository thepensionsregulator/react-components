import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import { InHouseAdminI18nProps } from '../../i18n';
import {
	cardType,
	cardTypeName,
	RecursivePartial,
} from '../../../common/interfaces';
import ContactDetails from '../../../common/views/contactDetails/contactDetails';

const getFields = (
	fields: RecursivePartial<InHouseAdminI18nProps['contacts']['fields']>,
): FieldProps[] => [
	{
		type: 'phone',
		name: 'telephoneNumber',
		label: fields.telephone.label,
		inputWidth: 2,
		cfg: { mb: 3 },
		required: true,
		errorEmptyValue: fields.telephone.error.empty,
		errorInvalidValue: fields.telephone.error.invalid,
	},
	{
		type: 'email',
		name: 'emailAddress',
		label: fields.email.label,
		inputWidth: 6,
		required: true,
		errorEmptyValue: fields.email.error.empty,
		errorInvalidValue: fields.email.error.invalid,
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
			sectionTitle={i18n.contacts.sectionTitle}
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
