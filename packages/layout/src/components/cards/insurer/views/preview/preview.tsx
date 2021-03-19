import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInsurerContext } from '../../context';
import { ParagraphNoMB } from '../../../components/paragraphNoMB';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useInsurerContext();
	const { insurer, complete, preValidatedData } = current.context;

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
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<ParagraphNoMB>{insurer.address.addressLine1}</ParagraphNoMB>
						{insurer.address.addressLine2 && (
							<ParagraphNoMB>{insurer.address.addressLine2}</ParagraphNoMB>
						)}
						{insurer.address.addressLine3 && (
							<ParagraphNoMB>{insurer.address.addressLine3}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{insurer.address.postTown}</ParagraphNoMB>
						{insurer.address.county && (
							<ParagraphNoMB>{insurer.address.county}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{insurer.address.postcode}</ParagraphNoMB>
						{insurer.address.country && (
							<ParagraphNoMB>{insurer.address.country}</ParagraphNoMB>
						)}
					</Flex>
				</Flex>

				{/* Insurer reference number */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton
						isOpen={current.matches({ edit: 'reference' })}
						onClick={() => send('EDIT_INSURER')}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<ParagraphNoMB>{insurer.insurerCompanyReference}</ParagraphNoMB>
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
