import { SpaceProps } from '@tpr/core';
import { MutableRefObject } from 'react';
import { EventData, State } from 'xstate';

export const addressFields = [
	'addressLine1',
	'addressLine2',
	'addressLine3',
	'postTown',
	'county',
	'country',
	'postcode',
	'countryId',
];

export enum cardType {
	actuary = 'actuary',
	employer = 'employer',
	inHouseAdmin = 'inHouseAdmin',
	insurer = 'insurer',
	thirdParty = 'thirdParty',
	trustee = 'trustee',
	corporateGroup = 'corporateGroup',
	independent = 'independent',
}

export enum cardTypeName {
	actuary = 'Actuary',
	employer = 'Employer',
	inHouseAdmin = 'In House Administrator',
	insurer = 'Insurer',
	thirdParty = 'Third Party',
	trustee = 'Trustee',
	corporateGroup = 'Corporate Group Trustee',
	independent = 'Professional / Independent Trustee',
}

export interface CardAddress {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postcode: string;
	country: string;
	countryId: number;
}

export interface CardPersonalDetails {
	title: string;
	firstName: string;
	lastName: string;
}

export interface CardContactDetails {
	telephoneNumber: string;
	emailAddress: string;
}

export interface CardDefaultProps {
	id: string;
	schemeRoleId: number;
	effectiveDate: string;
	companiesHouseNumber?: number | string;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export interface CardProviderProps {
	complete?: boolean;
	preValidatedData?: boolean | null;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveAddress?: (...args: any[]) => Promise<any>;
	onSaveContacts?: (...args: any[]) => Promise<any>;
	onSaveName?: (...args: any[]) => Promise<any>;
	onChangeAddress?: (...args: any[]) => Promise<any>;
	testId?: string | number;
	/** cfg space props */
	cfg?: SpaceProps;
	lastBtnClicked?: number | null;
}

export interface RemoveReasonProps {
	reason: null | string;
	date: null | string;
}

export interface RemoveConfirmProps {
	confirm: boolean;
	date: string;
}

export interface CommonCardMachineContext {
	complete: boolean;
	preValidatedData?: boolean | null;
	lastBtnClicked?: number | null;
}

type PropertyFunction<T> = () => T;

/*	--------------------------------
					i18n common props
		--------------------------------	*/
export interface I18nPreviewViewCommonProps {
	mainHeadingSubtitle: {
		main: string;
		secondary?: string;
	};
	statusText: {
		confirmed: string;
		unconfirmed: string;
	};
	checkboxLabel: string;
}

export interface I18nNameView {
	title: string;
	sectionTitle?: string;
	fields: {
		title: {
			label: string;
			error: string | PropertyFunction<string | undefined>;
			maxlength: number;
		};
		firstName: {
			label: string;
			error: string | PropertyFunction<string | undefined>;
			maxlength: number;
		};
		lastName: {
			label: string;
			error: string | PropertyFunction<string | undefined>;
			maxlength: number;
		};
	};
}

export interface I18nContactsView {
	title: string;
	subtitle?: string;
	sectionTitle?: string;
	fields: {
		telephone: {
			label: string;
			error: InputErrorMessages;
		};
		email: {
			label: string;
			error: InputErrorMessages;
		};
	};
}

export interface I18nRemoveViewDateAndConfirm {
	date: {
		title: string;
		fields: {
			confirm: {
				label: string;
			};
			date: {
				label: string;
				hint: string;
				error: string;
			};
		};
		errors: {
			confirmMissing: string;
			formIncomplete: string;
			dateAddedBeforeEffectiveDate: string;
			dateAddedInTheFuture: string;
		};
	};
	confirm: {
		breadcrumbs: {
			link1: string;
			link2: string;
		};
		title: string;
		dialog: {
			message1: string;
			message2?: string;
		};
		buttons: {
			remove: string;
			cancel: string;
		};
	};
}

export interface I18nRemoveReason {
	title?: string;
	subtitle?: string;
	fields?: {
		leftTheScheme?: {
			label?: string;
		};
		date?: {
			label?: string;
		};
		neverPartOfTheScheme?: {
			label?: string;
		};
	};
	errors?: {
		pristine?: string;
		pristineDate?: string;
		dateAddedBeforeEffectiveDate?: string;
		dateAddedInTheFuture?: string;
	};
}

export interface I18nRemoveViewReasonAndConfirm {
	reason: I18nRemoveReason;
	confirm: {
		title: string;
		subtitle: string;
		breadcrumbs: {
			link1: string;
			link2: string;
		};
		dialog?: {
			message1: string;
		};
		buttons: {
			remove: string;
			cancel: string;
		};
	};
}

// -----------------------------------------

export interface InputErrorMessages {
	empty: string;
	invalid: string;
}

export const defaultEmailErrorMessages: InputErrorMessages = {
	empty: 'Email cannot be empty',
	invalid: 'Invalid email format',
};

export const defaultPhoneErrorMessages: InputErrorMessages = {
	empty: 'Phone number cannot be empty',
	invalid: 'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
};

// -----------------------------------------

export interface IAddressViewProps {
	onChangeAddress?: (...args: any[]) => Promise<any>;
}

export interface CardContentProps extends IAddressViewProps {
	enableContactDetails?: boolean;
}

/*	--------------------------------
						Card Buttons
		--------------------------------	*/
export interface IToolbarButtonProps {
	remove?: boolean;
	button: MutableRefObject<any>;
	text?: string;
}

export interface ICardMainHeadingButtonProps {
	button: MutableRefObject<any>;
	current?: Partial<State<any, any, any, any>>;
	onClick: any;
}

export interface IPreviewButtonProps {
	button: MutableRefObject<any>;
}

export interface ICardRemoveButtonProps {
	button: MutableRefObject<any>;
	send: (event: any, payload?: EventData) => Partial<State<any, any, any, any>>;
	current?: Partial<State<any, any, any, any>>;
	tabIndex?: number;
}
