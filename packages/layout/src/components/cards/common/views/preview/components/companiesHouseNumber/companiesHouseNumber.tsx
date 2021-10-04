import React from 'react';
import { Flex, P } from '@tpr/core';
import { UnderlinedButton } from '../../../../../components/button';

interface ICompaniesHouseNumberProps {
	heading: string;
	houseNumber: number | string;
}

export const CompaniesHouseNumber: React.FC<ICompaniesHouseNumberProps> = React.memo(
	({ heading, houseNumber }) => {
		return (
			<Flex cfg={{ flexDirection: 'column', mt: 5 }}>
				<UnderlinedButton>{heading}</UnderlinedButton>
				<P cfg={{ mt: 2 }}>{houseNumber}</P>
			</Flex>
		);
	},
);
