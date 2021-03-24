import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useCorporateGroupContext } from '../../context';
import {
	PhonePreview,
	EmailPreview,
	AddressPreview,
} from '../../../common/views/preview/components';
import styles from './preview.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useCorporateGroupContext();
	const { corporateGroup, complete, preValidatedData } = current.context;

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
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
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

					{/* Professional Trustee section: open for editing	 */}
					<Flex cfg={{ flexDirection: 'column', mt: 5 }}>
						<UnderlinedButton
							onClick={() => send('EDIT_PROFESSIONAL')}
							isOpen={current.matches({ edit: 'professional' })}
						>
							{i18n.preview.buttons.five}
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

				{/* Name & Contact details section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton
						onClick={() => send('EDIT_NAME')}
						isOpen={current.matches({ edit: 'contacts' })}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<P cfg={{ mb: 2 }}>
							{corporateGroup.title
								? `${corporateGroup.title} ${corporateGroup.firstName} ${corporateGroup.lastName}`
								: `${corporateGroup.firstName} ${corporateGroup.lastName}`}
						</P>
						{corporateGroup.telephoneNumber && (
							<PhonePreview value={corporateGroup.telephoneNumber} />
						)}
						{corporateGroup.emailAddress && (
							<EmailPreview value={corporateGroup.emailAddress} />
						)}
					</Flex>
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
					label={i18n.preview.checkboxLabel}
				/>
			</Flex>
		</div>
	);
};
