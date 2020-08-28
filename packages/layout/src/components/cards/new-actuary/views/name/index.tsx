import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useNewActuaryContext } from '../../context';
import { NewActuaryI18nProps } from '../../i18n';
import { RecursivePartial, cardType, cardTypeName } from '../../../common/interfaces';
import NameForm from '../../../common/views/name/name'

const getFields = (
	fields: RecursivePartial<NewActuaryI18nProps['name']['fields']>,
): FieldProps[] => [
	{
		name: 'title',
		type: 'text',
		label: fields.title.label,
		inputWidth: 1,
		cfg: { mb: 4 },
	},
	{
		name: 'firstname',
		type: 'text',
		label: fields.firstName.label,
		error: fields.firstName.error,
		inputWidth: 6,
		cfg: { mb: 4 },
	},
	{
		name: 'lastname',
		type: 'text',
		label: fields.lastName.label,
		error: fields.lastName.error,
		inputWidth: 6,
	},
];

export const NameScreen: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveName } = useNewActuaryContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.actuary;

	const onSubmit = async (values) => {
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
			type={cardType.actuary}
			typeName={cardTypeName.actuary}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={{ 
				title: state.title,
				firstname: state.firstname,
				lastname: state.lastname
			 }}
			loading={loading}
		/>
	)
};
