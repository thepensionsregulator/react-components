import { ReactElement } from 'react';
import { CorporateGroupContextProps } from '../context';
import { CorporateGroupI18nProps } from '../i18n';
import {
	CardAddress,
	CardContactDetails,
	CardDefaultProps,
	CardPersonalDetails,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface CorporateGroup
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails {
	organisationName: string;
	address: Partial<CardAddress>;
	directorIsProfessional: boolean;
}

type RenderProps = (_: CorporateGroupContextProps) => ReactElement;

export interface CorporateGroupProviderProps extends CardProviderProps {
	/** CorporateGroup props from the API */
	corporateGroup: Partial<CorporateGroup>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<CorporateGroupI18nProps>;
	onSaveDirector: (...args: any[]) => Promise<any>;
}
