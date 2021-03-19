import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useIndependentTrusteeContext } from '../../context';
import { ParagraphNoMB } from '../../../components/paragraphNoMB';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useIndependentTrusteeContext();
	const { independentTrustee, complete, preValidatedData } = current.context;

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
						<ParagraphNoMB>
							{independentTrustee.address.addressLine1}
						</ParagraphNoMB>
						{independentTrustee.address.addressLine2 && (
							<ParagraphNoMB>
								{independentTrustee.address.addressLine2}
							</ParagraphNoMB>
						)}
						{independentTrustee.address.addressLine3 && (
							<ParagraphNoMB>
								{independentTrustee.address.addressLine3}
							</ParagraphNoMB>
						)}
						<ParagraphNoMB>{independentTrustee.address.postTown}</ParagraphNoMB>
						{independentTrustee.address.county && (
							<ParagraphNoMB>{independentTrustee.address.county}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{independentTrustee.address.postcode}</ParagraphNoMB>
						{independentTrustee.address.country && (
							<ParagraphNoMB>
								{independentTrustee.address.country}
							</ParagraphNoMB>
						)}
					</Flex>
				</Flex>

				{/* Appointed By Regulator section: open for editing	 */}
				<Flex cfg={{ flexDirection: 'column' }}>
					<UnderlinedButton
						onClick={() => send('EDIT_REGULATOR')}
						isOpen={current.matches({ edit: 'regulator' })}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<ParagraphNoMB cfg={{ pt: 3 }}>
						{independentTrustee.appointedByRegulator
							? i18n.regulator.fields.appointedByRegulator.labels
									.isAppointedByRegulatorYes
							: i18n.regulator.fields.appointedByRegulator.labels
									.isAppointedByRegulatorNo}
					</ParagraphNoMB>
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
