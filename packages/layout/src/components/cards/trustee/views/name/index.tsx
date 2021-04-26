import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { TrusteeI18nProps } from '../../i18n';
import {
	RecursivePartial,
	cardType,
	cardTypeName,
} from '../../../common/interfaces';
import NameForm from '../../../common/views/nameForm/nameForm';
import { RestoreMissingNullValues } from '../../../common/services/NullValueFieldRestorer';

const getFields = (
	fields: RecursivePartial<TrusteeI18nProps['name']['fields']>,
): FieldProps[] => [
	{
		name: 'title',
		type: 'text',
		label: fields.title.label,
		error: fields.title.error,
		maxLength: fields.title.maxlength,
		inputWidth: 1,
		cfg: { mb: 4 },
	},
	{
		name: 'firstName',
		type: 'text',
		label: fields.firstName.label,
		error: fields.firstName.error,
		maxLength: fields.firstName.maxlength,
		inputWidth: 6,
		cfg: { mb: 4 },
	},
	{
		name: 'lastName',
		type: 'text',
		label: fields.lastName.label,
		error: fields.lastName.error,
		maxLength: fields.lastName.maxlength,
		inputWidth: 6,
	},
];

const Name: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n } = useTrusteeContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.trustee;

	const originalValues = {
		title: state.title,
		firstName: state.firstName,
		lastName: state.lastName,
	};

	const onSubmit = (values) => {
		RestoreMissingNullValues(originalValues, values);
		setLoading(true);

		try {
			send('NEXT', { values });
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<NameForm
			type={cardType.trustee}
			typeName={cardTypeName.trustee}
			title={i18n.name.title}
			sectionTitle={i18n.name.sectionTitle}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={originalValues}
			loading={loading}
			nextStep={true}
			send = {send}
		/>
	);
};

export default Name;
