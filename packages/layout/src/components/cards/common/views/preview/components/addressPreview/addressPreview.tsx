import React from 'react';
import { Flex, P } from '@tpr/core';
import { CardAddress } from '../../../../interfaces';
import { capitalizeEachWord } from '../../../../../../../services';
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

			<P className={styles.address} data-testid="address-preview">
				{address.addressLine1 && (
					<>
						{capitalizeEachWord(address.addressLine1)}
						<br />
					</>
				)}
				{address.addressLine2 && (
					<>
						{capitalizeEachWord(address.addressLine2)}
						<br />
					</>
				)}
				{address.addressLine3 && (
					<>
						{capitalizeEachWord(address.addressLine3)}
						<br />
					</>
				)}
				{address.postTown && (
					<>
						{capitalizeEachWord(address.postTown)}
						<br />
					</>
				)}
				{address.county && (
					<>
						{capitalizeEachWord(address.county)}
						<br />
					</>
				)}
				{address.postcode && (
					<>
						{address.postcode.toUpperCase()}
						<br />
					</>
				)}
				{address.country && <>{address.country}</>}
			</P>
		</Flex>
	);
};
