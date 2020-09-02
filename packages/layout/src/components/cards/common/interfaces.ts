import { SpaceProps } from '@tpr/core';

export const addressFields = [
	'addressLine1',
	'addressLine2',
	'addressLine3',
	'postTown',
	'county',
	'country',
	'postCode',
	'countryId',
];

export enum cardType {
	actuary = 'actuary',
	employer = 'employer',
	inHouseAdmin = 'inHouseAdmin',
	insurer = 'insurer',
	thirdParty = 'thirdParty',
	trustee = 'trustee',
}

export enum cardTypeName {
	actuary = 'Actuary',
	employer = 'Employer',
	inHouseAdmin = 'In House Administrator',
	insurer = 'Insurer',
	thirdParty = 'Third Party',
	trustee = 'Trustee',
}

export interface CardAddress {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postCode: string;
	country: string;
	countryId: string;
}

export interface CardPersonalDetails {
	title: string;
	firstname: string;
	lastname: string;
}

export interface CardContactDetails {
	telephoneNumber: string;
	emailAddress: string;
}

export interface CardDefaultProps {
	id: string;
	schemeRoleId: string | number;
	effectiveDate: string;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export interface CardProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveAddress?: (...args: any[]) => Promise<any>;
	onSaveContacts?: (...args: any[]) => Promise<any>;
	onSaveName?: (...args: any[]) => Promise<any>;
	testId?: string;
	/** cfg space props */
	cfg?: SpaceProps;
}

export interface PostcodeProps {
	lookup: boolean;
	postCode: string;
	loading: boolean;
	setPostcode: Function;
	showLookup: Function;
	setLoading: Function;
	setOptions: Function;
	addressAPI: any;
	i18n: any;
}

export interface addressLabelsFields {
	addressLine1: {
		label: string;
		emptyError?: string;
		invalidError: string;
	};
	addressLine2: { label: string; error?: string };
	addressLine3: { label: string; error?: string };
	postTown: { label: string; error?: string };
	postCode: {
		label: string;
		invalidError?: string;
		emptyError?: string;
	};
	county: { label: string; error?: string };
}

export type AutoCompleteProps = {
	onClick: (evt: any) => void;
	options: any[];
	loading: boolean;
};

export type AddressAPIType = {
	/** API instance with auth to get a list of addresses */
	get: (endpoint: string) => Promise<any>;
	/** limit of items to display per search */
	limit: number;
};
