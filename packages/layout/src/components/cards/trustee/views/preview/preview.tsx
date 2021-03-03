import React from 'react';
import { Flex, P, Hr, classNames, Span } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import { capitalize } from '../../../../../utils';
import {
	PhonePreview,
	EmailPreview,
} from '../../../common/views/preview/components';
import styles from './preview.module.scss';

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
			<P cfg={{ mb: 4 }}>{capitalize(trustee.trusteeType)} trustee</P>
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
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
							{trustee.address.addressLine1}
						</Span>
						{trustee.address.addressLine2 && (
							<P>{trustee.address.addressLine2}</P>
						)}
						{trustee.address.addressLine3 && (
							<P>{trustee.address.addressLine3}</P>
						)}
						<P>{trustee.address.postTown}</P>
						{trustee.address.county && <P>{trustee.address.county}</P>}
						<P>{trustee.address.postcode}</P>
					</Flex>
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
