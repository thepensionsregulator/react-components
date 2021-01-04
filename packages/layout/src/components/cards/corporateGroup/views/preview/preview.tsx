import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useCorporateGroupContext } from '../../context';
import {
	PhonePreview,
	EmailPreview,
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
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<P>{corporateGroup.address.addressLine1}</P>
						{corporateGroup.address.addressLine2 && (
							<P>{corporateGroup.address.addressLine2}</P>
						)}
						{corporateGroup.address.addressLine3 && (
							<P>{corporateGroup.address.addressLine3}</P>
						)}
						<P>{corporateGroup.address.postTown}</P>
						{corporateGroup.address.county && (
							<P>{corporateGroup.address.county}</P>
						)}
						<P>{corporateGroup.address.postcode}</P>
						{corporateGroup.address.country && (
							<P>{corporateGroup.address.country}</P>
						)}
					</Flex>

					{/* Professional Trustee section: open for editing	 */}
					<Flex cfg={{ flexDirection: 'column', mt: 5 }}>
						<UnderlinedButton onClick={() => send('EDIT_PROFESSIONAL')}>
							{i18n.preview.buttons.five}
						</UnderlinedButton>
						<P cfg={{ pt: 3 }}>
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
					<UnderlinedButton onClick={() => send('EDIT_NAME')}>
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
