import { Address } from '../address';
import { SubmitFormProps } from './BaseProps';

export interface EditAddressProps extends SubmitFormProps {
	initialValue?: Address;
	value?: Address;
	loading: boolean;
	testId?: string;
	onChangeAddressClick: () => void;
	addressLine1Label: string;
	addressLine1RequiredMessage: string;
	addressLine2Label: string;
	addressLine3Label: string;
	townLabel: string;
	countyLabel: string;
	postcodeLabel: string;
	countryLabel: string;
	changeAddressButton: string;
}
