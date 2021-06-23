import { Address } from '../address';
import { SubmitFormProps } from './BaseProps';

export interface SelectAddressProps extends SubmitFormProps {
	loading: boolean;
	testId?: string;
	postcode?: string;
	addresses: Address[];
	onChangePostcodeClick: () => void;
	onAddressSelected: (address: Address) => void;
	postcodeLookupLabel: string;
	changePostcodeButton: string;
	changePostcodeAriaLabel?: string;
	selectAddressLabel: string;
	selectAddressPlaceholder?: string;
	selectAddressButton: string;
	selectAddressRequiredMessage: string;
	noAddressesFoundMessage: string;
	onValidatePostcode?: (isValid: boolean) => void | null;
}
