import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useThirdPartyContext } from '../../context';
import { ParagraphNoMB } from '../../../components/paragraphNoMB';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useThirdPartyContext();
	const { thirdParty, complete, preValidatedData } = current.context;

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			<Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<ParagraphNoMB>{thirdParty.address.addressLine1}</ParagraphNoMB>
						{thirdParty.address.addressLine2 && (
							<ParagraphNoMB>{thirdParty.address.addressLine2}</ParagraphNoMB>
						)}
						{thirdParty.address.addressLine3 && (
							<ParagraphNoMB>{thirdParty.address.addressLine3}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{thirdParty.address.postTown}</ParagraphNoMB>
						{thirdParty.address.county && (
							<ParagraphNoMB>{thirdParty.address.county}</ParagraphNoMB>
						)}
						<ParagraphNoMB>{thirdParty.address.postcode}</ParagraphNoMB>
						{thirdParty.address.country && (
							<ParagraphNoMB>{thirdParty.address.country}</ParagraphNoMB>
						)}
					</Flex>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				></Flex>
			</Flex>
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
