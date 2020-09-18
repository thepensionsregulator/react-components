import { ReactElement } from 'react';
import { EmployerContextProps } from '../context/employer';
import { EmployerI18nProps } from '../i18n/employer';
import {
	CardAddress,
	CardDefaultProps,
	CardProviderProps,
	RecursivePartial,
} from '../interfaces';

export interface Employer extends CardDefaultProps {
	employerType:
		| 'participating-employer'
		| 'principal-employer'
		| 'principal-and-participating';
	organisationReference: number;
	organisationName: string;
	companiesHouseNumber: number | string;
	registeredCharityNumber: number | string;
	epsrNumber: number | string;
	statutoryEmployer: 'statutory' | 'non-statutory';
	address: Partial<CardAddress>;
}

type RenderProps = (_: EmployerContextProps) => React.ReactElement;

export interface EmployerProviderProps extends CardProviderProps {
	onSaveType?: (...args: any[]) => Promise<any>;
	/** employer props from the API */
	employer: Partial<Employer>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<EmployerI18nProps>;
}
