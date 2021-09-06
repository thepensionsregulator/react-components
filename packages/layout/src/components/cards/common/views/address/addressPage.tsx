import React, { useState } from 'react';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../common/interfaces';
import {
	AddressAPIType,
	ExperianAddressLookupProvider,
	Form,
	AddressLookup,
	Address,
	I18nAddressLookup,
} from '@tpr/forms';
import { Link } from '@tpr/core/lib/components/links/links';
export type AddressPageProps = {
	onSubmit: (values: Address & { initialValue?: Address }) => void;
	initialValue?: Address;
	addressAPI: AddressAPIType;
	cardType: cardType;
	cardTypeName: cardTypeName;
	sectionTitle?: string;
	i18n: I18nAddressLookup;
	onCancelChanges?: () => void;
	onChangeAddress?: () => void;
	send?: Function;
	subSectionHeaderText?: string;
};

const AddressPage: React.FC<AddressPageProps> = ({
	onSubmit,
	initialValue,
	addressAPI,
	cardType,
	cardTypeName,
	sectionTitle,
	i18n,
	onCancelChanges,
	subSectionHeaderText,
	onChangeAddress,
}) => {
	const [loading, setLoading] = useState(false);
	const addressLookupProvider = new ExperianAddressLookupProvider(addressAPI);

	return (
		<Content
			type={cardType}
			typeName={cardTypeName}
			title={i18n.title}
			sectionTitle={sectionTitle}
			subSectionHeaderText={subSectionHeaderText}
			send={onCancelChanges}
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
									initialValue={initialValue}
									addressLookupProvider={addressLookupProvider}
									invalidPostcodeMessage={i18n.invalidPostcodeMessage}
									postcodeLookupLabel={i18n.postcodeLookupLabel}
									postcodeLookupButton={i18n.postcodeLookupButton}
									changePostcodeButton={i18n.changePostcodeButton}
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
									findAddressCancelledButton={i18n.findAddressCancelledButton}
									onFindAddressCancelled={onCancelChanges}
									onAddressChanging={onChangeAddress}
									headingLevel={4}
								/>
								<Footer>
									<ArrowButton
										appearance="secondary"
										pointsTo="up"
										iconSide="right"
										type="submit"
										title={i18n.saveAndClose}
										disabled={loading}
									/>
									<Link
										cfg={{ m: 3 }}
										underline
										onClick={() => onCancelChanges()}
									>
										Cancel
									</Link>
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
