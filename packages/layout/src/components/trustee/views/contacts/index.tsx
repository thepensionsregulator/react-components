import React from 'react';
import { Flex } from '@tpr/core';
import { Form, validate, FFInputText } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Toolbar, Footer } from '../../components/card';
import { Loading } from '../../components/loader';

const Contacts: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { trustee, loading } = current.context;

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	return (
		<Flex cfg={{ flex: '1 1 auto', flexDirection: 'column' }}>
			{loading && <Loading />}
			<Toolbar title="Contact details for this trustee" />
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
						<Flex
							cfg={{ flexDirection: 'column' }}
							//  maxWidth="760px"
						>
							<Flex
							// maxWidth="300px"
							>
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
							isDisabled={loading}
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
