import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Button } from '../../../buttons';
import { Form, FFSelect } from '@tpr/forms';

type AutoCompleteProps = {
	onClick: (evt: any) => void;
	options: any;
};
const AutoComplete: React.FC<AutoCompleteProps> = ({ onClick, options }) => {
	const { current, send } = useTrusteeContext();
	const { loading } = current.context;

	const onSubmit = (values) => {
		if (Object.values(values).length > 0) {
			send('SAVE', { values });
		} else {
			Promise.reject('Address has not been selected...');
		}
	};

	return (
		<Flex flexDirection="column">
			<Form onSubmit={onSubmit}>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FFSelect
							name="postcode"
							placeholder="Please select the address from the dropdown"
							options={options}
						/>
						<Button appearance="link" onClick={onClick} mt={0}>
							I can't find my address in the list
						</Button>
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

export default AutoComplete;
