import React from 'react';
import { Form, validate, FFInputText } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Content } from '../../components/content';

const Contacts: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { trustee, loading } = current.context;

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	return (
		<Content title="Contact details for this trustee" loading={loading}>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: trustee.telephoneNumber,
					emailAddress: trustee.emailAddress,
				}}
				validate={validate([
					{
						name: 'telephoneNumber',
						error:
							'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
					},
					{
						name: 'emailAddress',
						error: 'Cannot be empty',
					},
				])}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FFInputText
							name="telephoneNumber"
							label="Telephone number"
							inputWidth={2}
							required
						/>
						<FFInputText
							name="emailAddress"
							type="email"
							label="Email address"
							inputWidth={6}
							required
						/>
						<Footer
							isDisabled={loading}
							onSave={{
								type: 'submit',
								title: 'Save and close',
							}}
						/>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Contacts;
