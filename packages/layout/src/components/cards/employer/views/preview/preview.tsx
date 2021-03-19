import React, { useState } from 'react';
import { Flex, P, Hr, classNames, Span } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import { useEmployerContext } from '../../context';
import styles from './preview.module.scss';

type IdentifiersItemProps = { title: string; number: string | number };
const IdentifiersItem: React.FC<IdentifiersItemProps> = ({ title, number }) => {
	return (
		<>
			<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
				{title}
			</Span>
			<P className={styles.noMarginBottom}>{number}</P>
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
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
							{employer.organisationName}
						</Span>
						<P className={styles.noMarginBottom}>
							{employer.address.addressLine1}
						</P>
						{employer.address.addressLine2 && (
							<P className={styles.noMarginBottom}>
								{employer.address.addressLine2}
							</P>
						)}
						{employer.address.addressLine3 && (
							<P className={styles.noMarginBottom}>
								{employer.address.addressLine3}
							</P>
						)}
						<P className={styles.noMarginBottom}>{employer.address.postTown}</P>
						{employer.address.county && <P>{employer.address.county}</P>}
						<P className={styles.noMarginBottom}>{employer.address.postcode}</P>
					</Flex>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.four}</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
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
