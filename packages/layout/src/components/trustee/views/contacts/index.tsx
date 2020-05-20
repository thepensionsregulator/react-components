import React from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer, FooterButton } from '../../components/card';
import { Content } from '../../components/content';

const fields: FieldProps[] = [
	{
		type: 'text',
		name: 'telephoneNumber',
		label: 'Telephone number',
		inputWidth: 2,
		error: 'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
		cfg: { mb: 3 },
	},
	{
		type: 'email',
		name: 'emailAddress',
		label: 'Email address',
		inputWidth: 6,
		error: 'Cannot be empty',
	},
];

const Contacts: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { trustee, loading } = current.context;

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	return (
		<Content
			title="Contact details for this trustee"
			subtitle="Provide contact details for the trustee, not a third-party such as an administrator."
			loading={loading}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: trustee.telephoneNumber,
					emailAddress: trustee.emailAddress,
				}}
				validate={validate(fields)}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
						<Footer>
							<FooterButton
								disabled={loading}
								type="submit"
								title="Save and close"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Contacts;
