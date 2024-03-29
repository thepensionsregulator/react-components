import React from 'react';
import { FieldProps } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { TrusteeI18nProps } from '../../i18n';
import {
	cardType,
	cardTypeName,
	RecursivePartial,
} from '../../../common/interfaces';
import ContactDetails from '../../../common/views/contactDetails/contactDetails';

const getFields = (
	fields: RecursivePartial<TrusteeI18nProps['contacts']['fields']>,
): FieldProps[] => [
	{
		type: 'phone',
		name: 'telephoneNumber',
		label: fields.telephone.label,
		cfg: { mb: 3 },
		required: true,
		errorEmptyValue: fields.telephone.error.empty,
		errorInvalidValue: fields.telephone.error.invalid,
	},
	{
		type: 'email',
		name: 'emailAddress',
		label: fields.email.label,
		required: true,
		errorEmptyValue: fields.email.error.empty,
		errorInvalidValue: fields.email.error.invalid,
	},
];

export const Contacts: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const { trustee, loading } = current.context;
	const fields = getFields(i18n?.contacts?.fields);

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	return (
		<ContactDetails
			type={cardType.trustee}
			typeName={cardTypeName.trustee}
			title={i18n.contacts.title}
			subtitle={i18n.contacts.subtitle}
			sectionTitle={i18n.contacts.sectionTitle}
			loading={loading}
			onSubmit={onSubmit}
			initialValues={{
				telephoneNumber: trustee.telephoneNumber,
				emailAddress: trustee.emailAddress,
			}}
			fields={fields}
			send={send}
			subSectionHeaderText={i18n.preview.buttonsAndHeadings.contacts}
		/>
	);
};
