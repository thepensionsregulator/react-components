import React, { useState } from 'react';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { ArrowButton } from '../../../../buttons/buttons';
import {
	cardType,
	AddressAPIType,
	cardTypeName,
} from '../../../common/interfaces';
import {
	ExperianAddressLookupProvider,
	Form,
	AddressLookup,
	Address,
	I18nAddressLookup,
} from '@tpr/forms';

export type AddressPageProps = {
	onSubmit: (values: Address & { initialValue?: Address }) => void;
	initialValue?: Address;
	addressAPI: AddressAPIType;
	cardType: cardType;
	cardTypeName: cardTypeName;
	i18n: I18nAddressLookup;
};

const AddressPage: React.FC<AddressPageProps> = ({
	onSubmit,
	initialValue,
	addressAPI,
	cardType,
	cardTypeName,
	i18n,
}) => {
	const [loading, setLoading] = useState(false);

	const addressLookupProvider = new ExperianAddressLookupProvider(addressAPI);

	return (
		<Content type={cardType} typeName={cardTypeName} title={i18n.title}>
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
									initialValue={initialValue}
									addressLookupProvider={addressLookupProvider}
									invalidPostcodeMessage={i18n.invalidPostcodeMessage}
									postcodeLookupLabel={i18n.postcodeLookupLabel}
									postcodeLookupButton={i18n.postcodeLookupButton}
									changePostcodeButton={i18n.changeAddressButton}
									changePostcodeAriaLabel={i18n.changePostcodeAriaLabel}
									selectAddressLabel={i18n.selectAddressLabel}
									selectAddressPlaceholder={i18n.selectAddressPlaceholder}
									selectAddressButton={i18n.selectAddressButton}
									selectAddressRequiredMessage={
										i18n.selectAddressRequiredMessage
									}
									noAddressesFoundMessage={i18n.noAddressesFoundMessage}
									addressLine1Label={i18n.addressLine1Label}
									addressLine1RequiredMessage={i18n.addressLine1RequiredMessage}
									addressLine2Label={i18n.addressLine2Label}
									addressLine3Label={i18n.addressLine3Label}
									townLabel={i18n.townLabel}
									countyLabel={i18n.countyLabel}
									postcodeLabel={i18n.postcodeLabel}
									countryLabel={i18n.countryLabel}
									changeAddressButton={i18n.changeAddressButton}
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
