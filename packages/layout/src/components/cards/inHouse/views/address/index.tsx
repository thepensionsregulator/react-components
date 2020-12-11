import React, { useState } from 'react';
import { useInHouseAdminContext } from '../../context';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../common/interfaces';
import { ExperianAddressLookupProvider, Form, AddressLookup } from '@tpr/forms';

const AddressPage: React.FC = () => {
	const {
		current,
		i18n,
		send,
		addressAPI,
		onSaveAddress,
	} = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const [loading, setLoading] = useState(false);

	const onSubmit = async (values) => {
		try {
			const { address, ...inHouseAdminValues } = current.context.inHouseAdmin;
			await onSaveAddress(values, Object.assign(inHouseAdminValues, address));
			send('SAVE', { values });
		} catch (error) {
			console.log(error);
		}
	};

	const addressLookupProvider = new ExperianAddressLookupProvider(addressAPI);

	return (
		<Content
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			title={i18n.address.title}
		>
			<Form onSubmit={onSubmit}>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{
							<>
								<AddressLookup
									loading={loading}
									setLoading={(loading: boolean) => {
										setLoading(loading);
									}}
									initialValue={inHouseAdmin.address}
									addressLookupProvider={addressLookupProvider}
									invalidPostcodeMessage="Enter a valid postcode"
									postcodeLookupLabel="Postcode"
									postcodeLookupButton="Find address"
									changePostcodeButton="Change"
									changePostcodeAriaLabel="Change postcode"
									selectAddressLabel="Select an address"
									selectAddressPlaceholder="Select an address from the list"
									selectAddressButton="Select address"
									selectAddressRequiredMessage="Select an address to continue"
									noAddressesFoundMessage="No matching addresses were found"
									addressLine1Label="Address line 1"
									addressLine1RequiredMessage="You must complete this field"
									addressLine2Label="Address line 2"
									addressLine3Label="Address line 3"
									townLabel="Post town"
									countyLabel="County"
									postcodeLabel="Postcode"
									countryLabel="Country"
									changeAddressButton="I need to change the address"
									changeAddressAriaLabel={null}
								/>
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
							</>
						}
					</form>
				)}
			</Form>
		</Content>
	);
};

export default AddressPage;
