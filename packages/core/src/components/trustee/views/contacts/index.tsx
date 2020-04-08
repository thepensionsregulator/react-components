import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Toolbar, Footer } from '../../components/card';
import { Form, validate, FFInputText } from '@tpr/forms';

const Contacts: React.FC = () => {
	const { current, send, onSave } = useTrusteeContext();
	const state = current.context;

	const onSubmit = values => {
		send('SAVE', { values });
		onSave({ ...state, ...values });
	};

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Toolbar title="Contact details for this trustee" />
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: state.telephoneNumber,
					emailAddress: state.emailAddress,
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
						<Flex maxWidth="760px" flexDirection="column">
							<Flex maxWidth="300px">
								<FFInputText
									name="telephoneNumber"
									label="Telephone number"
									required
								/>
							</Flex>
							<FFInputText
								name="emailAddress"
								type="email"
								label="Email address"
								required
							/>
						</Flex>
						<Footer
							onSave={{
								type: 'submit',
								title: 'Save and close',
							}}
						/>
					</form>
				)}
			</Form>
		</Flex>
	);
};

export default Contacts;
