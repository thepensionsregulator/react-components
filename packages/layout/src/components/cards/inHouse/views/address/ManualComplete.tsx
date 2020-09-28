import React, { useState } from 'react';
import { useInHouseAdminContext } from '../../context';
import { getFields } from '../../../common/views/address/fields';
import ManualCompleteForm from '../../../common/views/address/ManualCompleteForm';
import { cardTypeName } from '../../../common/interfaces';

const ManualComplete: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveAddress } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const fields = getFields(i18n?.address?.manual?.fields);

	const onSubmit = async values => {
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
		<ManualCompleteForm
			loading={loading}
			title={i18n.address.auto.title}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={{
				postcode: inHouseAdmin.address.postcode,
			}}
			cardTypeName={cardTypeName.inHouseAdmin}
		/>
	);
};

export default ManualComplete;
