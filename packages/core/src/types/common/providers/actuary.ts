import { ReactElement } from 'react';
import { ActuaryContextProps } from '../context';
import { ActuaryI18nProps } from '../i18n';
import {
	CardAddress,
	CardContactDetails,
	CardDefaultProps,
	CardPersonalDetails,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface Actuary
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails {
	organisationName: string;
	address: Partial<CardAddress>;
}

export type ActuaryRenderProps = (_props: ActuaryContextProps) => ReactElement;

export interface ActuaryProviderProps extends CardProviderProps {
	/** Actuary props from the API */
	actuary: Partial<Actuary>;
	children?: ActuaryRenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<ActuaryI18nProps>;
}
