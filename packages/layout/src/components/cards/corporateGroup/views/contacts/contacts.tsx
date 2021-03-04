import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useCorporateGroupContext } from '../../context';
import { CorporateGroupI18nProps } from '../../i18n';
import {
	RecursivePartial,
	cardType,
	cardTypeName,
} from '../../../common/interfaces';
import ContactDetails from '../../../common/views/contactDetails/contactDetails';

const getFields = (
	fields: RecursivePartial<CorporateGroupI18nProps['contacts']['fields']>,
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
	const { current, send, i18n, onSaveContacts } = useCorporateGroupContext();
	const { corporateGroup } = current.context;
	const fields = getFields(i18n.contacts.fields);

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			await onSaveContacts(values, corporateGroup);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<ContactDetails
			type={cardType.corporateGroup}
			typeName={cardTypeName.trustee}
			title={i18n.contacts.title}
			loading={loading}
			onSubmit={onSubmit}
			initialValues={{
				telephoneNumber: corporateGroup.telephoneNumber,
				emailAddress: corporateGroup.emailAddress,
			}}
			fields={fields}
		/>
	);
};
