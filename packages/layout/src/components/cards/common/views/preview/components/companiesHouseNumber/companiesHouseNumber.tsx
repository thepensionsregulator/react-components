import React from 'react';
import { Flex, P } from '@tpr/core';
import { UnderlinedButton } from '../../../../../components/button';

interface ICompaniesHouseNumberProps {
	heading: string;
	companiesHouseNumber: number | string;
}

export const CompaniesHouseNumber: React.FC<ICompaniesHouseNumberProps> = React.memo(
	({ heading, companiesHouseNumber }) => {
		return (
			<>
				{companiesHouseNumber && (
					<Flex cfg={{ flexDirection: 'column', mt: 6 }}>
						<UnderlinedButton>{heading}</UnderlinedButton>
						<P>{companiesHouseNumber}</P>
					</Flex>
				)}
			</>
		);
	},
);
