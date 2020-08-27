import React, { useState } from 'react';
import { Form, FieldProps, renderFields, validate } from '@tpr/forms';
import { useNewActuaryContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { NewActuaryI18nProps } from '../../i18n';
import { RecursivePartial, cardType, cardTypeName } from '../../../common/interfaces';

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
		<Content type={cardType.actuary} typeName={cardTypeName.actuary} title="Name of the actuary">
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					title: state.title,
					firstname: state.firstname,
					lastname: state.lastname,
				}}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit} data-testid="actuary-name-form">
						{renderFields(fields)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="up"
								iconSide="right"
								disabled={loading}
								type="submit"
								title="Save and Close"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
