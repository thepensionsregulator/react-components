import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useThirdPartyContext } from '../../context';
import styles from './preview.module.scss';

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
						<P className={styles.noMarginBottom}>
							{thirdParty.address.addressLine1}
						</P>
						{thirdParty.address.addressLine2 && (
							<P className={styles.noMarginBottom}>
								{thirdParty.address.addressLine2}
							</P>
						)}
						{thirdParty.address.addressLine3 && (
							<P className={styles.noMarginBottom}>
								{thirdParty.address.addressLine3}
							</P>
						)}
						<P className={styles.noMarginBottom}>
							{thirdParty.address.postTown}
						</P>
						{thirdParty.address.county && (
							<P className={styles.noMarginBottom}>
								{thirdParty.address.county}
							</P>
						)}
						<P className={styles.noMarginBottom}>
							{thirdParty.address.postcode}
						</P>
						{thirdParty.address.country && (
							<P className={styles.noMarginBottom}>
								{thirdParty.address.country}
							</P>
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
