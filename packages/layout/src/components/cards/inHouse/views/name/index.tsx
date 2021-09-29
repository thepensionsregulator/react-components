import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import { InHouseAdminI18nProps } from '../../i18n';
import {
	RecursivePartial,
	cardType,
	cardTypeName,
} from '../../../common/interfaces';
import NameForm from '../../../common/views/nameForm/nameForm';
import { RestoreMissingNullValues } from '../../../../../services/NullValueFieldRestorer';
import textStyles from '@tpr/forms/lib/elements/text/text.module.scss';

const getFields = (
	fields: RecursivePartial<InHouseAdminI18nProps['name']['fields']>,
): FieldProps[] => [
	{
		name: 'title',
		type: 'text',
		autoComplete: 'honorific-prefix',
		label: fields.title.label,
		error: fields.title.error,
		maxLength: fields.title.maxlength,
		inputClassName: textStyles.namePrefixInput,
		testId: 'title',
		cfg: { mb: 4 },
	},
	{
		name: 'firstName',
		type: 'text',
		autoComplete: 'given-name',
		label: fields.firstName.label,
		error: fields.firstName.error,
		maxLength: fields.firstName.maxlength,
		inputClassName: textStyles.nameInput,
		testId: 'first-name',
		required: true,
		cfg: { mb: 4 },
	},
	{
		name: 'lastName',
		type: 'text',
		autoComplete: 'family-name',
		label: fields.lastName.label,
		error: fields.lastName.error,
		maxLength: fields.lastName.maxlength,
		inputClassName: textStyles.nameInput,
		required: true,
		testId: 'last-name',
	},
];

export const NameScreen: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveName } = useInHouseAdminContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.inHouseAdmin;

	const originalValues = {
		title: state.title,
		firstName: state.firstName,
		lastName: state.lastName,
	};

	const onSubmit = async (values) => {
		RestoreMissingNullValues(originalValues, values);
		setLoading(true);

		try {
			await onSaveName(values, state);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<NameForm
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			title={i18n.name.title}
			sectionTitle={i18n.name.sectionTitle}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={originalValues}
			loading={loading}
			send={send}
		/>
	);
};
