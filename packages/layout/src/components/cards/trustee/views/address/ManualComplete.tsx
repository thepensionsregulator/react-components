import React from 'react';
import { useTrusteeContext } from '../../context';
import { getFields } from '../../../common/views/address/fields';
import ManualCompleteForm from '../../../common/views/address/ManualCompleteForm';
import { cardTypeName } from '@tpr/core';

const ManualComplete: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const { trustee, loading } = current.context;
	const fields = getFields(i18n?.address?.manual?.fields);

	const onSubmit = (values) => {
		send('SAVE', { address: values });
	};

	return (
		<ManualCompleteForm
			loading={loading}
			title={i18n.address.auto.title}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={{
				postcode: trustee.address.postcode,
			}}
			cardTypeName={cardTypeName.trustee}
		/>
	);
};

export default ManualComplete;
