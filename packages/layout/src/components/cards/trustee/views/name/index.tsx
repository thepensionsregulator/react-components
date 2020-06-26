import React from 'react';
import { Form, FieldProps, renderFields, validate } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';

const getFields = ({ fields }: any): FieldProps[] => [
	{
		name: 'title',
		type: 'text',
		label: fields.title,
		inputWidth: 1,
		cfg: { mb: 4 },
	},
	{
		name: 'forename',
		type: 'text',
		label: fields.firstName,
		error: 'field is required',
		inputWidth: 6,
		cfg: { mb: 4 },
	},
	{
		name: 'surname',
		type: 'text',
		label: fields.lastName,
		error: 'field is required',
		inputWidth: 6,
	},
];

const Name: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const fields = getFields(i18n.name);
	const state = current.context.trustee;

	const onSubmit = (values) => {
		send('NEXT', { values });
	};

	return (
		<Content type="trustee" title="Name of the trustee">
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					title: state.title,
					forename: state.forename,
					surname: state.surname,
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
