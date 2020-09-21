import { ReactElement } from 'react';
import { ThirdPartyContextProps } from '../context';
import { ThirdPartyI18nProps } from '../i18n';
import {
	CardAddress,
	CardDefaultProps,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface ThirdPartyProps extends CardDefaultProps {
	organisationName: string;
	address: Partial<CardAddress>;
}

type RenderProps = (_props: ThirdPartyContextProps) => ReactElement;

export interface ThirdPartyProviderProps extends CardProviderProps {
	/** thirdParty props from the API */
	thirdParty: Partial<ThirdPartyProps>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<ThirdPartyI18nProps>;
}
