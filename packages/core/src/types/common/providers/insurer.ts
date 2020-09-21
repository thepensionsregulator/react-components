import { ReactElement } from 'react';
import { InsurerContextProps } from '../context';
import { InsurerI18nProps } from '../i18n';
import {
	CardAddress,
	CardContactDetails,
	CardDefaultProps,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface Insurer extends CardDefaultProps, CardContactDetails {
	organisationReference: number;
	organisationName: string;
	insurerCompanyReference: string;
	address: Partial<CardAddress>;
}

type RenderProps = (_props: InsurerContextProps) => ReactElement;

export interface InsurerProviderProps extends CardProviderProps {
	onSaveRef?: (...args: any[]) => Promise<any>;
	/** insurer props from the API */
	insurer: Partial<Insurer>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InsurerI18nProps>;
}
