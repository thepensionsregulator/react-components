import { ReactElement } from "react";
import { EventData, State } from "xstate";
import { SpaceProps } from "../../../components/globals/globals";
import { TrusteeI18nProps } from "../i18n/trustee";
import { AddressAPIType, RecursivePartial } from "../interfaces";
import { RenderProps, TrusteeProps } from "../providers/trustee";


export interface TrusteeContext {
	loading: boolean;
	complete: boolean;
	preValidatedData?: boolean | null;
	trustee: TrusteeProps;
	remove?: {
		reason: null | string;
		date: null | string;
	};
}

export interface TrusteeContextProps {
	complete?: boolean;
	preValidatedData?: boolean;
	testId?: string | number;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
	i18n: RecursivePartial<TrusteeI18nProps>;
	onRemove: (...args: any[]) => Promise<any>;
	onCorrect: (...args: any[]) => void;
	send: (event: any, payload?: EventData) => Partial<State<TrusteeContext, any, any, any>>;
	addressAPI: AddressAPIType;
	current: Partial<State<TrusteeContext, any, any, any>>;
}