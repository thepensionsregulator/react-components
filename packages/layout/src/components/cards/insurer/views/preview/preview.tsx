import React, { useRef } from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, P, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInsurerContext } from '../../context';
import { AddressPreview } from '../../../common/views/preview/components';
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
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
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
				</Flex>

				{/* Insurer reference number */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton
						onClick={() => send('EDIT_INSURER')}
						isEditButton={true}
						buttonRef={insurerBtn}
						giveFocus={current.context.lastBtnClicked === 4}
					>
						{i18n.preview.buttons.four}
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
