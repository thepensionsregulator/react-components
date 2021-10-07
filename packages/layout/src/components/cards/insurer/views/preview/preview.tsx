import React, { useRef } from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, P, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInsurerContext } from '../../context';
import {
	AddressPreview,
	CompaniesHouseNumber,
} from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useInsurerContext();
	const { insurer, complete, preValidatedData } = current.context;

	const insurerBtn = useRef(null);

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			<Flex>
				{/* Address block: display only	 */}
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton>
						{i18n.preview.buttonsAndHeadings.address}
					</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: insurer.address.addressLine1,
							addressLine2: insurer.address.addressLine2,
							addressLine3: insurer.address.addressLine3,
							postTown: insurer.address.postTown,
							county: insurer.address.county,
							postcode: insurer.address.postcode,
							country: insurer.address.country,
						}}
					/>

					{/* Companies House Number: display only	 */}
					<CompaniesHouseNumber
						heading={i18n.preview.buttonsAndHeadings.companiesHouseNumber}
						companiesHouseNumber={insurer.companiesHouseNumber}
					/>
				</Flex>

				{/* Insurer reference number */}
				<Flex cfg={{ pl: 4 }} className={styles.section}>
					<UnderlinedButton
						onClick={() => send('EDIT_INSURER')}
						isOpen={current.matches('edit')}
						isEditButton={true}
						buttonRef={insurerBtn}
						giveFocus={current.context.lastBtnClicked === 5}
					>
						{i18n.preview.buttonsAndHeadings.insurerReferenceNumber}
					</UnderlinedButton>
					<P className={styles.insurerCompanyRef}>
						{insurer.insurerCompanyReference}
					</P>
				</Flex>
			</Flex>

			{/*  All details correct - Checkbox	 */}
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
						insurer.organisationName,
					)}
				/>
			</Flex>
		</div>
	);
});
