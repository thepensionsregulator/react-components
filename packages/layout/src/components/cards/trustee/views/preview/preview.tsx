import React, { useRef } from 'react';
import { Flex, Hr, classNames } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import {
	ContactDetailsPreview,
	AddressPreview,
} from '../../../common/views/preview/components';
import { CardContentProps } from 'components/cards/common/interfaces';
import { concatenateStrings } from '../../../../../utils';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<CardContentProps> = React.memo(
	({ enableContactDetails = true }) => {
		const { current, send, onCorrect, i18n } = useTrusteeContext();
		const { trustee, complete, preValidatedData } = current.context;

		const correspondenceBtn = useRef(null);
		const contactsBtn = useRef(null);

		return (
			<div
				className={
					preValidatedData
						? classNames([styles.content, styles.complete])
						: classNames([{ [styles.complete]: complete }, styles.content])
				}
			>
				<Flex>
					{/* Addres section: open for editing	 */}
					<Flex
						cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
					>
						<UnderlinedButton
							onClick={() => send('EDIT_ORG')}
							isEditButton={true}
							buttonRef={correspondenceBtn}
							giveFocus={current.context.lastBtnClicked === 3}
						>
							{i18n.preview.buttons.three}
						</UnderlinedButton>
						<AddressPreview
							name={trustee.address.addressLine1}
							address={{
								addressLine2: trustee.address.addressLine2,
								addressLine3: trustee.address.addressLine3,
								postTown: trustee.address.postTown,
								county: trustee.address.county,
								postcode: trustee.address.postcode,
								country: trustee.address.country,
							}}
						/>
					</Flex>

					{/* Contact details section: open for editing	 */}
					{enableContactDetails && (
						<Flex
							cfg={{
								width: 5,
								flex: '0 0 auto',
								flexDirection: 'column',
								pl: 4,
							}}
						>
							<UnderlinedButton
								onClick={() => send('EDIT_CONTACTS')}
								isEditButton={true}
								buttonRef={contactsBtn}
								giveFocus={current.context.lastBtnClicked === 4}
							>
								{i18n.preview.buttons.four}
							</UnderlinedButton>
							<ContactDetailsPreview
								phone={{ value: trustee.telephoneNumber }}
								email={{ value: trustee.emailAddress }}
							/>
						</Flex>
					)}
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
							concatenateStrings([
								trustee.title,
								trustee.firstName,
								trustee.lastName,
							]),
						)}
					/>
				</Flex>
			</div>
		);
	},
);
