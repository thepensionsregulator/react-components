import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Toolbar } from '../../components/card';
import { Form, FFInputText } from '@tpr/forms';

const Name: React.FC = () => {
	const { send } = useTrusteeContext();

	const onSubmit = values => {
		send('NEXT', {
			name: Object.keys(values)
				.filter(key => values[key])
				.map(key => values[key])
				.join(' '),
		});
	};

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex flexDirection="column" maxWidth="760px">
				<Toolbar title="Name of the trustee" />
				<Form onSubmit={onSubmit}>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Flex maxWidth="140px">
								<FFInputText name="title" label="Title" />
							</Flex>
							<FFInputText name="firstName" label="First name" required />
							<FFInputText name="lastName" label="Last name" required />
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
