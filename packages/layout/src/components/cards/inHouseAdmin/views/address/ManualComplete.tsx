import React, { useState } from 'react';
import { Flex, P } from '@tpr/core';
import { Form, renderFields, validate } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import { Footer } from '../../../components/card';
import { Loading } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { getFields } from './fields';

const ManualComplete = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveAddress } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const fields = getFields(i18n?.address?.manual?.fields);

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			const { address, ...inHouseAdminValues } = current.context.inHouseAdmin;
			await onSaveAddress(values, Object.assign(inHouseAdminValues, address));
			send('SAVE', { values });
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<Flex cfg={{ flexDirection: 'column' }}>
			{loading && <Loading />}
			<P cfg={{ fontWeight: 3 }}>{i18n.address.auto.title}</P>
			<P cfg={{ my: 3 }}>
				Enter the in house admin’s correspondence address manually.
			</P>
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					postcode: inHouseAdmin.address.postCode,
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
