import { ReactElement } from 'react';
import { InHouseAdminContextProps } from '../context';
import { InHouseAdminI18nProps } from '../i18n';
import {
	AddressAPIType,
	CardAddress,
	CardContactDetails,
	CardDefaultProps,
	CardPersonalDetails,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface InHouseAdmin
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails {
	addressAPI: AddressAPIType;
	address: Partial<CardAddress>;
}

type RenderProps = (_props: InHouseAdminContextProps) => ReactElement;

export interface InHouseAdminNoApi extends Omit<InHouseAdmin, 'addressAPI'> {}

export interface InHouseAdminProviderProps extends CardProviderProps {
	/** inHouseAdmin props from the API */
	inHouseAdmin: Partial<InHouseAdmin>;
	children?: RenderProps | ReactElement;
	addressAPI: AddressAPIType;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InHouseAdminI18nProps>;
}
