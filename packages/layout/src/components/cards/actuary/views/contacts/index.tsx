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
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveContacts } = useActuaryContext();
	const { actuary } = current.context;
	const fields = getFields(i18n?.contacts?.fields);
	const onSubmit = async (values) => {
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
			sectionTitle={i18n.name.sectionTitle}
			loading={loading}
			onSubmit={onSubmit}
			initialValues={{
				telephoneNumber: actuary.telephoneNumber,
				emailAddress: actuary.emailAddress,
			}}
			fields={fields}
			send={send}
			subSectionHeaderText={i18n.preview.buttonsAndHeadings.contacts}
		/>
	);
};
