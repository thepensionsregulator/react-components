import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useActuaryContext } from '../../context';
import {
	PhonePreview,
	EmailPreview,
} from '../../../common/views/preview/components';
import { ParagraphNoMB } from '../../../components/paragraphNoMB';
import styles from '../../../cards.module.scss';

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
			<Flex>
				{/* Address section: display only	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<ParagraphNoMB>{actuary.address.addressLine1}</ParagraphNoMB>
						{actuary.address.addressLine2 && (
							<ParagraphNoMB>{actuary.address.addressLine2}</ParagraphNoMB>
						)}
						{actuary.address.addressLine3 && (
							<ParagraphNoMB>{actuary.address.addressLine3}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{actuary.address.postTown}</ParagraphNoMB>
						{actuary.address.county && (
							<ParagraphNoMB>{actuary.address.county}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{actuary.address.postcode}</ParagraphNoMB>
						{actuary.address.country && (
							<ParagraphNoMB>{actuary.address.country}</ParagraphNoMB>
						)}
					</Flex>
				</Flex>

				{/* Contact details section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton
						onClick={() => send('EDIT_CONTACTS')}
						isOpen={current.matches({ edit: 'contacts' })}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						{actuary.telephoneNumber && (
							<PhonePreview value={actuary.telephoneNumber} />
						)}
						{actuary.emailAddress && (
							<EmailPreview value={actuary.emailAddress} />
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
