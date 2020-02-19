import React, { useState } from 'react';
import { Flex } from '../../../layout';
import { H4, P } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Footer, Toolbar } from '../../components/card';
import { Button } from '../../../buttons';
import { Form, renderFields, validate, InputText } from '@tpr/forms';
import fields from './fields';

const ManualComplete = () => {
	const { send, onSave } = useTrusteeContext();

	function onSubmit(values) {
		/** could do optimistic update by updating the machine context */
		send('SAVE');
		onSave(values);
	}

	return (
		<Flex flexDirection="column">
			<P>Enter the trustee’s correspondence address manually.</P>
			<Form onSubmit={onSubmit} validate={validate(fields)}>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
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

const AutoComplete = ({ onClick }) => {
	const { send } = useTrusteeContext();

	return (
		<Flex flexDirection="column">
			<InputText
				name="field"
				type="text"
				meta={{}}
				input={{
					name: '',
					value: '',
					onChange: () => {},
					onBlur: () => {},
					onFocus: () => {},
				}}
			/>
			<Flex>
				<Button appearance="link" onClick={onClick}>
					I can't find my address in the list
				</Button>
			</Flex>
			<Footer onSave={{ title: 'Save and close', fn: () => send('SAVE') }} />
		</Flex>
	);
};

const AddressPage: React.FC = () => {
	const [manual, setManual] = useState(false);

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex flexDirection="column">
				<Toolbar title="What is this trustee’s address?" />
				<Flex flexDirection="column" bg="neutral.100" p={1} mb={2}>
					<H4 mb={0}>Find the trustee's correspondence address</H4>
					<P fontWeight="bold">Postcode</P>
				</Flex>
				<Flex flexDirection="column" maxWidth="760px">
					<H4 fontWeight="bold" mb={0}>
						Address
					</H4>
					{manual ? (
						<ManualComplete />
					) : (
						<AutoComplete onClick={() => setManual(true)} />
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AddressPage;
