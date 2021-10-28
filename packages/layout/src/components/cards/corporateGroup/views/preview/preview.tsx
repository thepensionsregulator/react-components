import React, { useRef } from 'react';
import { Flex, P, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { CardFooter } from '../../../components/footer';
import { useCorporateGroupContext } from '../../context';
import {
	ContactDetailsPreview,
	AddressPreview,
	CompaniesHouseNumber,
} from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useCorporateGroupContext();
	const { corporateGroup, complete, preValidatedData } = current.context;

	const directorBtn = useRef(null);
	const chairBtn = useRef(null);

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
							addressLine1: corporateGroup.address.addressLine1,
							addressLine2: corporateGroup.address.addressLine2,
							addressLine3: corporateGroup.address.addressLine3,
							postTown: corporateGroup.address.postTown,
							county: corporateGroup.address.county,
							postcode: corporateGroup.address.postcode,
							country: corporateGroup.address.country,
						}}
					/>

					{/* Companies House Number: display only	 */}
					<CompaniesHouseNumber
						heading={i18n.preview.buttonsAndHeadings.companiesHouseNumber}
						companiesHouseNumber={corporateGroup.companiesHouseNumber}
					/>
				</Flex>

				{/* Name & Contact details section: open for editing	 */}
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton
						onClick={() => send('EDIT_NAME')}
						isOpen={current.matches({ edit: 'contacts' })}
						isEditButton={true}
						buttonRef={chairBtn}
						giveFocus={current.context.lastBtnClicked === 5}
					>
						{i18n.preview.buttonsAndHeadings.chairOfBoard}
					</UnderlinedButton>
					<ContactDetailsPreview
						name={
							corporateGroup.title
								? `${corporateGroup.title} ${corporateGroup.firstName} ${corporateGroup.lastName}`
								: `${corporateGroup.firstName} ${corporateGroup.lastName}`
						}
						phone={{ value: corporateGroup.telephoneNumber }}
						email={{ value: corporateGroup.emailAddress }}
					/>

					{/* Professional Trustee section: open for editing	 */}
					<Flex cfg={{ flexDirection: 'column', mt: 5 }}>
						<UnderlinedButton
							onClick={() => send('EDIT_PROFESSIONAL')}
							isOpen={current.matches({ edit: 'professional' })}
							isEditButton={true}
							buttonRef={directorBtn}
							giveFocus={current.context.lastBtnClicked === 6}
						>
							{i18n.preview.buttonsAndHeadings.directorProfessional}
						</UnderlinedButton>
						<P className={styles.isProfessional}>
							{corporateGroup.directorIsProfessional
								? i18n.professional.fields.isProfessional.labels
										.isProfessionalYes
								: i18n.professional.fields.isProfessional.labels
										.isProfessionalNo}
						</P>
					</Flex>
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
					corporateGroup.organisationName,
				)}
			/>
		</div>
	);
});
