import React from 'react';
import { AddressComparer } from '@tpr/forms';
import Address from '../../../common/views/address/addressPage';
import {
	cardType,
	cardTypeName,
	IAddressViewProps,
} from '../../../common/interfaces';
import { useTrusteeContext } from '../../context';

const AddressView: React.FC<IAddressViewProps> = ({ onChangeAddress }) => {
	const { current, i18n, send, addressAPI } = useTrusteeContext();

	return (
		<Address
			onSubmit={(values) => {
				if (AddressComparer.areEqual(values.initialValue, values)) {
					send('CANCEL');
				} else {
					send('SAVE', { address: values || {} });
				}
			}}
			initialValue={current.context.trustee.address}
			addressAPI={addressAPI}
			cardType={cardType.trustee}
			cardTypeName={cardTypeName.trustee}
			sectionTitle={i18n.address.sectionTitle}
			i18n={i18n.address}
			onCancelChanges={() => send('CANCEL')}
			subSectionHeaderText={
				i18n.preview.buttonsAndHeadings.correspondenceAddress
			}
			onChangeAddress={onChangeAddress}
		/>
	);
};

export default React.memo(AddressView);
