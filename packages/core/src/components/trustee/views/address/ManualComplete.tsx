import React from 'react';
import { Flex } from '../../../layout';
import { P } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Form, renderFields, validate } from '@tpr/forms';
import { Loading } from '../../components/loader';
import useLoading from '../../../../hooks/use-loading';
import fields from './fields';

const ManualComplete = () => {
	const [loading, setLoading] = useLoading();
	const { current, send, onSave } = useTrusteeContext();
	const { trustee } = current.context;

	function onSubmit(values) {
		setLoading(true);
		onSave({ ...trustee, address: values })
			.then(() => {
				send('SAVE', { address: values });
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}

	return (
		<Flex flexDirection="column">
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
