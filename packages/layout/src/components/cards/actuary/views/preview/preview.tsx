import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useActuaryContext } from '../../context';
import { PhonePreview, EmailPreview } from '../../../common/views/preview/components';
import styles from './preview.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useActuaryContext();
	const { actuary, complete, preValidatedData } = current.context;

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			{/* Actuary's Organisation name: display only	 */}
			<P cfg={{ mb: 4 }}>{actuary.organisationName}</P>

			<Flex>
				{/* Address section: display only	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<P>{actuary.address.addressLine1}</P>
						{actuary.address.addressLine2 && (
							<P>{actuary.address.addressLine2}</P>
						)}
						{actuary.address.addressLine3 && (
							<P>{actuary.address.addressLine3}</P>
						)}
						<P>{actuary.address.postTown}</P>
						{actuary.address.county && <P>{actuary.address.county}</P>}
						<P>{actuary.address.postcode}</P>
						{actuary.address.country && <P>{actuary.address.country}</P>}
					</Flex>
				</Flex>

				{/* Contact details section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton onClick={() => send('EDIT_CONTACTS')}>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						{actuary.telephoneNumber && <PhonePreview value={actuary.telephoneNumber} />}
						{actuary.emailAddress && <EmailPreview value={actuary.emailAddress} />}
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
