import { Address } from './Address';
import { AddressLookupProvider } from '../addressLookupProvider';
import { SubmitButtonProps } from './BaseProps';

export interface AddressProps extends SubmitButtonProps {
	initialValue?: Address;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	testId?: string;
	addressLookupProvider: AddressLookupProvider;
	invalidPostcodeMessage: string;
	postcodeLookupLabel: string;
	postcodeLookupButton: string;
	changePostcodeButton: string;
	changePostcodeAriaLabel?: string;
	addressSelectedStatus: string;
	selectAddressLabel: string;
	selectAddressPlaceholder?: string;
	selectAddressButton: string;
	selectAddressRequiredMessage: string;
	noAddressesFoundMessage: string;
	headingLevel?: number;
	addressLine1Label: string;
	addressLine1RequiredMessage: string;
	addressLine2Label: string;
	addressLine3Label: string;
	townLabel: string;
	countyLabel: string;
	postcodeLabel: string;
	countryLabel: string;
	changeAddressButton: string;
	findAddressCancelledButton?: string;
	onFindAddressCancelled?: () => void;
	onValidatePostcode?: (isValid: boolean) => void | null;
	onAddressChanging?: (isValid: boolean) => void | null;
}
