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
		<Flex cfg={{ flexDirection: 'column' }}>
			{name && <P className={styles.name}>{name}</P>}

			<P className={styles.address} data-testid="address-preview">
				{address.addressLine1 && (
					<>
						{address.addressLine1}
						<br />
					</>
				)}
				{address.addressLine2 && (
					<>
						{address.addressLine2}
						<br />
					</>
				)}
				{address.addressLine3 && (
					<>
						{address.addressLine3}
						<br />
					</>
				)}
				{address.postTown && (
					<>
						{address.postTown}
						<br />
					</>
				)}
				{address.county && (
					<>
						{address.county}
						<br />
					</>
				)}
				{address.postcode && (
					<>
						{address.postcode}
						<br />
					</>
				)}
				{address.country && <>{address.country}</>}
			</P>
		</Flex>
	);
};
