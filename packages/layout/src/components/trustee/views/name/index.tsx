import React from 'react';
import { Form, FieldProps, renderFields, validate } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer, FooterButton } from '../../components/card';
import { Content } from '../../components/content';

const fields: FieldProps[] = [
	{
		name: 'title',
		type: 'text',
		label: 'Title',
		inputWidth: 1,
		cfg: { mb: 4 },
	},
	{
		name: 'forename',
		type: 'text',
		label: 'First name',
		error: 'field is required',
		inputWidth: 6,
		cfg: { mb: 4 },
	},
	{
		name: 'surname',
		type: 'text',
		label: 'Last name',
		error: 'field is required',
		inputWidth: 6,
	},
];

const Name: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const state = current.context.trustee;

	const onSubmit = (values) => {
		send('NEXT', { values });
	};

	return (
		<Content title="Name of the trustee">
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
							<FooterButton type="submit" title="Continue" />
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Name;
