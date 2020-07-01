import React from 'react';
import { Flex, P } from '@tpr/core';
import { Form, renderFields, validate } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Loading } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { getFields } from './fields';

const ManualComplete = () => {
	const { current, send, i18n } = useTrusteeContext();
	const { trustee, loading } = current.context;
	const fields = getFields(i18n.address.manual.fields);

	const onSubmit = (values) => {
		send('SAVE', { address: values });
	};

	return (
		<Flex cfg={{ flexDirection: 'column' }}>
			{loading && <Loading />}
			<P cfg={{ my: 3 }}>
				Enter the trustee’s correspondence address manually.
			</P>
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
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="up"
								iconSide="right"
								type="submit"
								title="Save and close"
								disabled={loading}
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Flex>
	);
};

export default ManualComplete;
