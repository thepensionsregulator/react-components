import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useCorporateGroupContext } from '../../context';
import { CorporateGroupI18nProps } from '../../i18n';
import {
	RecursivePartial,
	cardType,
	cardTypeName,
} from '../../../common/interfaces';
import NameForm from '../../../common/views/nameForm/nameForm';
import textStyles from '@tpr/forms/lib/elements/text/text.module.scss';

const getFields = (
	fields: RecursivePartial<CorporateGroupI18nProps['name']['fields']>,
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
		required: true,
		testId: 'first-name',
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
	const { current, send, i18n, onSaveName } = useCorporateGroupContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.corporateGroup;

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			if (!values.title) {
				values.title = '';
			}
			await onSaveName(values, state);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<NameForm
			type={cardType.corporateGroup}
			typeName={cardTypeName.trustee}
			title={i18n.name.title}
			sectionTitle={i18n.name.sectionTitle}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={{
				title: state.title,
				firstName: state.firstName,
				lastName: state.lastName,
			}}
			loading={loading}
			nextStep={true}
			send={send}
			subSectionHeaderText={i18n.preview.buttonsAndHeadings.chairOfBoard}
		/>
	);
};
