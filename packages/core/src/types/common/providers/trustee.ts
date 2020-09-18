import { SpaceProps } from "../../../components/globals/globals";
import { ReactElement } from "react";
import { TrusteeContextProps } from "../context/trustee";
import { TrusteeI18nProps } from "../i18n/trustee";
import { AddressAPIType, CardAddress, CardContactDetails, CardDefaultProps, CardPersonalDetails, RecursivePartial } from "../interfaces";


export interface Trustee
extends Omit<TrusteeProps, 'address'>, CardAddress {
trusteeType: string;
isProfessionalTrustee: boolean;
[key: string]: any;
}

export type RenderProps = (_: TrusteeContextProps) => ReactElement;

export interface TrusteeCardProps {
	trustee: Trustee;
	complete?: boolean;
	preValidatedData?: boolean;
	i18n?: RecursivePartial<TrusteeI18nProps>;
	onCorrect: (...args: any[]) => void;
	onRemove: (...args: any[]) => Promise<any>;
	onDetailsSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	onContactSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	onAddressSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	addressAPI: AddressAPIType;
	/** depending on your network lib, provide a path to the addressAPI results array */
	testId?: string | number;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
}

export interface TrusteeProps 
extends CardDefaultProps,
  CardPersonalDetails,
  CardContactDetails,
  CardAddress {
trusteeType: string;
isProfessionalTrustee: boolean;
//
address: Partial<CardAddress>;
//
[key: string]: any;
}