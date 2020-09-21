import { ReactElement } from 'react';
import { IndependentTrusteeContextProps } from '../context';
import { IndependentTrusteeI18nProps } from '../i18n';
import {
	CardAddress,
	CardDefaultProps,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface IndependentTrustee extends CardDefaultProps {
	organisationName: string;
	address: Partial<CardAddress>;
	appointedByRegulator: boolean;
}

type RenderProps = (_: IndependentTrusteeContextProps) => ReactElement;

export interface IndependentTrusteeProviderProps extends CardProviderProps {
	/** IndependentTrustee props from the API */
	independentTrustee: Partial<IndependentTrustee>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<IndependentTrusteeI18nProps>;
	onSaveAppointed: (...args: any[]) => Promise<any>;
}
