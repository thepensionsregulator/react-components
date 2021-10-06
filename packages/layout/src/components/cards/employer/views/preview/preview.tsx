import React, { useRef, useState } from 'react';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import { useEmployerContext } from '../../context';
import { AddressPreview } from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';
import { PreviewButton } from './previewButton';
import { EmployerTypePreview } from './employerTypePreview';

type IdentifiersItemProps = { title: string; number: string | number };
const IdentifiersItem: React.FC<IdentifiersItemProps> = ({ title, number }) => {
	return (
		<>
			<P className={styles.title}>{title}</P>
			<P className={styles.number}>{number}</P>
		</>
	);
};

export const Preview: React.FC<any> = React.memo(() => {
	const employerButtonRef = useRef(null);
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
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: employer.address.addressLine1,
							addressLine2: employer.address.addressLine2,
							addressLine3: employer.address.addressLine3,
							postTown: employer.address.postTown,
							county: employer.address.county,
							postcode: employer.address.postcode,
						}}
					/>
					<Flex cfg={{ mt: 3 }} className={styles.identifierItem}>
						<UnderlinedButton>{i18n.preview.buttons.four}</UnderlinedButton>
						{items.map((item, key) => (
							<IdentifiersItem key={key} {...item} />
						))}
					</Flex>
				</Flex>
				<Flex cfg={{ pl: 4 }} className={styles.section}>
					<PreviewButton button={employerButtonRef}>
						{i18n.preview.buttons.one}
					</PreviewButton>
					<EmployerTypePreview {...current.context} />
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
					label={i18n.preview.checkboxLabel.replace(
						'__NAME__',
						employer.organisationName,
					)}
				/>
			</Flex>
		</div>
	);
});
