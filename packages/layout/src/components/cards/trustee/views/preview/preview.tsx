import React from 'react';
import { Flex, Hr, classNames } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import {
	PhonePreview,
	EmailPreview,
	AddressPreview,
} from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

export const Preview: React.FC = () => {
	const { current, send, onCorrect, i18n } = useTrusteeContext();
	const { trustee, complete, preValidatedData } = current.context;

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
						isOpen={current.matches({ edit: 'company' })}
					>
						{i18n.preview.buttons.three}
					</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: trustee.address.addressLine1,
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
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton
						onClick={() => send('EDIT_CONTACTS')}
						isOpen={current.matches({ edit: 'contact' })}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						{trustee.telephoneNumber && (
							<PhonePreview value={trustee.telephoneNumber} />
						)}
						{trustee.emailAddress && (
							<EmailPreview value={trustee.emailAddress} />
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
