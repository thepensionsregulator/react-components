import React, { useState } from 'react';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import { useEmployerContext } from '../../context';
import { AddressPreview } from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

type IdentifiersItemProps = { title: string; number: string | number };
const IdentifiersItem: React.FC<IdentifiersItemProps> = ({ title, number }) => {
	return (
		<>
			<P className={styles.title}>{title}</P>
			<P className={styles.number}>{number}</P>
		</>
	);
};

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useEmployerContext();
	const { employer, complete, preValidatedData } = current.context;
	const [items] = useState(
		[
			{
				title: i18n.preview.identifiers.companiesHouseNo,
				number: employer.companiesHouseNumber,
			},
			{
				title: i18n.preview.identifiers.registeredCharityNo,
				number: employer.registeredCharityNumber,
			},
			{
				title: i18n.preview.identifiers.epsrNumber,
				number: employer.epsrNumber,
			},
		].filter((item) => item.title && item.number),
	);

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			<Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<AddressPreview
						name={employer.organisationName}
						address={{
							addressLine1: employer.address.addressLine1,
							addressLine2: employer.address.addressLine2,
							addressLine3: employer.address.addressLine3,
							postTown: employer.address.postTown,
							county: employer.address.county,
							postcode: employer.address.postcode,
						}}
					/>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.four}</UnderlinedButton>
					<Flex className={styles.identifierItem}>
						{items.map((item, key) => (
							<IdentifiersItem key={key} {...item} />
						))}
					</Flex>
				</Flex>
			</Flex>
			<Flex cfg={{ flexDirection: 'column' }}>
				<Hr cfg={{ my: 4 }} />
				<Checkbox
					value={complete}
					checked={complete}
					onChange={() => {
						send('COMPLETE', { value: !complete });
						onCorrect(!complete);
					}}
					label={i18n.preview.checkboxLabel}
				/>
			</Flex>
		</div>
	);
};
