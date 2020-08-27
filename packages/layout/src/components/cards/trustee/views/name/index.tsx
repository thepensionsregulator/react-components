import React from 'react';
import { Form, FieldProps, renderFields, validate } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { TrusteeI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';
import { cardType } from '../../../common/interfaces';

const getFields = (
	fields: RecursivePartial<TrusteeI18nProps['name']['fields']>,
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

const Name: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.trustee;

	const onSubmit = (values) => {
		send('NEXT', { values });
	};

	return (
		<Content type={cardType.trustee} title="Name of the trustee">
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
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="right"
								iconSide="right"
								type="submit"
								title="Continue"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Name;
