import React, { useState } from 'react';
import { useInHouseAdminContext } from '../../context';
import { AutoCompleteProps } from '../../../common/interfaces';
import AutoCompleteForm from '../../../common/views/address/AutoCompleteForm';

const AutoComplete: React.FC<AutoCompleteProps> = ({
	onClick,
	options,
	loading,
	selectedItem,
}) => {
	const [submitLoading, setSubmitLoading] = useState(false);
	const { send, i18n, current, onSaveAddress } = useInHouseAdminContext();

	const onSubmit = async (values) => {
		if (Object.values(values).length > 0) {
			setSubmitLoading(true);
			try {
				const { address, ...inHouseAdminValues } = current.context.inHouseAdmin;
				await onSaveAddress(
					values.address.value,
					Object.assign(inHouseAdminValues, address),
				);
				setSubmitLoading(false);
				send('SAVE', { values: values.address.value });
			} catch (error) {
				console.error(error);
				setSubmitLoading(false);
			}
		}
	};

	return (
		<AutoCompleteForm
			onClick={onClick}
			options={options}
			selectedItem={selectedItem}
			loading={loading}
			onSubmit={onSubmit}
			dropdown={i18n.address.auto.dropdown}
			submitLoading={submitLoading}
		/>
	);
};

export default React.memo(AutoComplete);
