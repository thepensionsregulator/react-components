export interface PostcodeLookupProps {
	loading: boolean;
	testId?: string;
	postcode?: string;
	onPostcodeChanged: (postcode: string) => void;
	invalidPostcodeMessage: string;
	postcodeLookupLabel: string;
	postcodeLookupButton: string;
	findAddressCancelledButton?: string;
	onFindAddressCancelled?: () => void;
}
