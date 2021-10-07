import React from 'react';
import { AddressComparer } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import {
	cardType,
	cardTypeName,
	IAddressViewProps,
} from '../../../common/interfaces';
import Address from '../../../common/views/address/addressPage';

const AddressView: React.FC<IAddressViewProps> = ({ onChangeAddress }) => {
	const {
		current,
		i18n,
		send,
		addressAPI,
		onSaveAddress,
	} = useInHouseAdminContext();

	return (
		<Address
			onSubmit={async (values) => {
				try {
					const {
						address,
						...inHouseAdminValues
					} = current.context.inHouseAdmin;

					if (AddressComparer.areEqual(values.initialValue, values)) {
						send('CANCEL');
					} else {
						await onSaveAddress(
							values,
							Object.assign(inHouseAdminValues, address),
						);
						send('SAVE', { values });
					}
				} catch (error) {
					console.log(error);
				}
			}}
			initialValue={current.context.inHouseAdmin.address}
			addressAPI={addressAPI}
			cardType={cardType.inHouseAdmin}
			cardTypeName={cardTypeName.inHouseAdmin}
			sectionTitle={i18n.address.sectionTitle}
			i18n={i18n.address}
			onCancelChanges={() => send('CANCEL')}
			subSectionHeaderText={i18n.preview.buttonsAndHeadings.address}
			onChangeAddress={onChangeAddress}
		/>
	);
};

export default React.memo(AddressView);
