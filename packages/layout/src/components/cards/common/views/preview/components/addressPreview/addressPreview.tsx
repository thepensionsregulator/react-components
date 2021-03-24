import React from 'react';
import { Flex, P } from '@tpr/core';
import { CardAddress } from '../../../../interfaces';
import styles from './addressPreview.module.scss';

interface AddressPreviewProps {
	name?: string;
	address: Partial<CardAddress>;
}

export const AddressPreview: React.FC<AddressPreviewProps> = ({
	name,
	address,
}) => {
	return (
		<Flex cfg={{ my: 2, flexDirection: 'column' }}>
			{name && <P className={styles.name}>{name}</P>}
			<P className={styles.address}>{address.addressLine1}</P>
			{address.addressLine2 && <P>{address.addressLine2}</P>}
			{address.addressLine3 && <P>{address.addressLine3}</P>}
			<P>{address.postTown}</P>
			{address.county && <P>{address.county}</P>}
			<P>{address.postcode}</P>
			{address.country && <P>{address.country}</P>}
		</Flex>
	);
};
