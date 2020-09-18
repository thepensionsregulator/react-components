import React from 'react';
import { useTrusteeContext } from '../../context';
import { AutoCompleteProps } from '@tpr/core';
import AutoCompleteForm from '../../../common/views/address/AutoCompleteForm';

const AutoComplete: React.FC<AutoCompleteProps> = ({
	onClick,
	options,
	loading,
}) => {
	const { send, i18n } = useTrusteeContext();

	const onSubmit = (values) => {
		if (Object.values(values).length > 0) {
			send('SAVE', { address: values.address.value });
		}
	};

	return (
		<AutoCompleteForm
			onClick={onClick}
			options={options}
			loading={loading}
			onSubmit={onSubmit}
			dropdown={i18n.address.auto.dropdown}
		/>
	);
};

export default React.memo(AutoComplete);
