import React from 'react';
import { Flex } from '@tpr/core';
import { Form, FFInputText } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Toolbar } from '../../components/card';

const Name: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const state = current.context.trustee;

	const onSubmit = (values) => {
		send('NEXT', { values });
	};

	return (
		<Flex cfg={{ flex: '1 1 auto', flexDirection: 'column' }}>
			<Flex
				cfg={{ flexDirection: 'column' }}
				// maxWidth="760px"
			>
				<Toolbar title="Name of the trustee" />
				<Form
					onSubmit={onSubmit}
					initialValues={{
						title: state.title,
						forename: state.forename,
						surname: state.surname,
					}}
				>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Flex
							// maxWidth="140px"
							>
								<FFInputText name="title" label="Title" />
							</Flex>
							<FFInputText name="forename" label="First name" required />
							<FFInputText name="surname" label="Last name" required />
							<Footer
								onSave={{
									type: 'submit',
									title: 'Continue',
								}}
							/>
						</form>
					)}
				</Form>
			</Flex>
		</Flex>
	);
};

export default Name;
