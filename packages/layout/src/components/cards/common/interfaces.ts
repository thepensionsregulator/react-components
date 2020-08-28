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
	trustee = 'trustee',
	employer = 'employer',
	insurer = 'insurer',
	inHouseAdmin = 'inHouseAdmin',
	thirdParty = 'thirdParty',
	actuary = 'actuary',
}

export enum cardTypeName {
	trustee = 'Trustee',
	employer = 'Employer',
	insurer = 'Insurer',
	inHouseAdmin = 'In House Administrator',
	thirdParty = 'Third Party',
	actuary = 'Actuary',
}

export interface CardAddress {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postCode: string;
	country: string;
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
	schemeRoleId: string;
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
	/** Actuary props from the API */
	//actuary: Partial<ActuaryProps>;
	//children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	//i18n?: RecursivePartial<ActuaryI18nProps>;
	/** cfg space props */
	cfg?: SpaceProps;
}
