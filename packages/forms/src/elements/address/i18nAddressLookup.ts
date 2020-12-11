export interface I18nAddressLookup {
  title?: string;
  invalidPostcodeMessage?: string;
	postcodeLookupLabel?: string;
	postcodeLookupButton?: string;
	changePostcodeButton?: string;
	changePostcodeAriaLabel?: string;
	selectAddressLabel?: string;
	selectAddressPlaceholder?: string;
	selectAddressButton?: string;
	selectAddressRequiredMessage?: string;
	noAddressesFoundMessage?: string;
	addressLine1Label?: string;
	addressLine1RequiredMessage?: string;
	addressLine2Label?: string;
	addressLine3Label?: string;
	townLabel?: string;
	countyLabel?: string;
	postcodeLabel?: string;
	countryLabel?: string;
	changeAddressButton?: string;
	changeAddressAriaLabel?: string;
}

export const i18n: I18nAddressLookup = {
  invalidPostcodeMessage: "Enter a valid postcode",
  postcodeLookupLabel: "Postcode",
  postcodeLookupButton: "Find address",
  changePostcodeButton: "Change",
  changePostcodeAriaLabel: "Change postcode",
  selectAddressLabel: "Select an address",
  selectAddressPlaceholder: "Select an address from the list",
  selectAddressButton: "Select address",
  selectAddressRequiredMessage: "Select an address to continue",
  noAddressesFoundMessage: "No matching addresses were found",
  addressLine1Label: "Address line 1",
  addressLine1RequiredMessage: "You must complete this field",
  addressLine2Label: "Address line 2",
  addressLine3Label: "Address line 3",
  townLabel: "Post town",
  countyLabel: "County",
  postcodeLabel: "Postcode",
  countryLabel: "Country",
  changeAddressButton: "I need to change the address"
}