import React from 'react';
import { Flex } from '../../../layout';
import { P } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Form, renderFields, validate } from '@tpr/forms';
import fields from './fields';

const ManualComplete = () => {
	const { current, send, onSave } = useTrusteeContext();
	const state = current.context;

	function onSubmit(values) {
		send('SAVE', { values });
		onSave({ ...state, ...values });
	}

	return (
		<Flex flexDirection="column">
			<P>Enter the trustee’s correspondence address manually.</P>
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					postCode: state.postCode,
				}}
			>
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

export default ManualComplete;
