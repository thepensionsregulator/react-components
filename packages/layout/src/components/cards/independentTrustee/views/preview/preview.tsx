import React, { useRef } from 'react';
import { Flex, classNames, P } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { CardFooter } from '../../../components/footer';
import { useIndependentTrusteeContext } from '../../context';
import {
	AddressPreview,
	CompaniesHouseNumber,
} from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useIndependentTrusteeContext();
	const { independentTrustee, complete, preValidatedData } = current.context;

	const regulatorBtn = useRef(null);

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			<Flex>
				{/* Address section: display only	 */}
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton>
						{i18n.preview.buttonsAndHeadings.address}
					</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: independentTrustee.address.addressLine1,
							addressLine2: independentTrustee.address.addressLine2,
							addressLine3: independentTrustee.address.addressLine3,
							postTown: independentTrustee.address.postTown,
							county: independentTrustee.address.county,
							postcode: independentTrustee.address.postcode,
							country: independentTrustee.address.country,
						}}
					/>

					{/* Companies House Number: display only	 */}
					<CompaniesHouseNumber
						heading={i18n.preview.buttonsAndHeadings.companiesHouseNumber}
						companiesHouseNumber={independentTrustee.companiesHouseNumber}
					/>
				</Flex>

				{/* Appointed By Regulator section: open for editing	 */}
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton
						onClick={() => send('EDIT_REGULATOR')}
						isOpen={current.matches({ edit: 'regulator' })}
						isEditButton={true}
						buttonRef={regulatorBtn}
						giveFocus={current.context.lastBtnClicked === 5}
					>
						{i18n.preview.buttonsAndHeadings.appointedByRegulator}
					</UnderlinedButton>
					<P className={styles.appointedByRegulator}>
						{independentTrustee.appointedByRegulator
							? i18n.regulator.fields.appointedByRegulator.labels
									.isAppointedByRegulatorYes
							: i18n.regulator.fields.appointedByRegulator.labels
									.isAppointedByRegulatorNo}
					</P>
				</Flex>
			</Flex>

			{/*  All details correct - Checkbox	 */}
			<CardFooter
				complete={complete}
				onChange={() => {
					send('COMPLETE', { value: !complete });
					onCorrect(!complete);
				}}
				label={i18n.preview.checkboxLabel.replace(
					'__NAME__',
					independentTrustee.organisationName,
				)}
			/>
		</div>
	);
});
