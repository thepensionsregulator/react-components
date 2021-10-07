import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useThirdPartyContext } from '../../context';
import {
	AddressPreview,
	CompaniesHouseNumber,
} from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
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
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton>
						{i18n.preview.buttonsAndHeadings.address}
					</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: thirdParty.address.addressLine1,
							addressLine2: thirdParty.address.addressLine2,
							addressLine3: thirdParty.address.addressLine3,
							postTown: thirdParty.address.postTown,
							county: thirdParty.address.county,
							postcode: thirdParty.address.postcode,
							country: thirdParty.address.country,
						}}
					/>
					<CompaniesHouseNumber
						heading={i18n.preview.buttonsAndHeadings.companiesHouseNumber}
						companiesHouseNumber={thirdParty.companiesHouseNumber}
					/>
				</Flex>
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
					label={i18n.preview.checkboxLabel.replace(
						'__NAME__',
						thirdParty.organisationName,
					)}
				/>
			</Flex>
		</div>
	);
});
