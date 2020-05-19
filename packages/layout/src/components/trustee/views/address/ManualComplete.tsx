import React from 'react';
import { Flex, P } from '@tpr/core';
import { Form, renderFields, validate } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Loading } from '../../components/content';
import fields from './fields';

const ManualComplete = () => {
	const { current, send } = useTrusteeContext();
	const { trustee, loading } = current.context;

	const onSubmit = (values) => {
		send('SAVE', { address: values });
	};

	return (
		<Flex cfg={{ flexDirection: 'column' }}>
			{loading && <Loading />}
			<P>Enter the trustee’s correspondence address manually.</P>
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					postcode: trustee.address.postcode,
				}}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
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

export default ManualComplete;
