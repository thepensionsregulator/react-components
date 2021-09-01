import React, { useRef } from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames, P } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useIndependentTrusteeContext } from '../../context';
import { AddressPreview } from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useIndependentTrusteeContext();
	const { independentTrustee, complete, preValidatedData } = current.context;

	const regulatorBtn = useRef(null);

	const onClickRegulatorBtn = () => {
		current.context.lastBtnClicked = 4;
		send('EDIT_REGULATOR');
	};

	const onCollapseRegulator = () => {
		current.context.lastBtnClicked === 4 && regulatorBtn.current.focus();
	};

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
					<AddressPreview
						address={{
							addressLine1: independentTrustee.address.addressLine1,
							addressLine2: independentTrustee.address.addressLine2,
							addressLine3: independentTrustee.address.addressLine3,
							postTown: independentTrustee.address.postTown,
							county: independentTrustee.address.county,
							postcode: independentTrustee.address.postcode,
							country: independentTrustee.address.country,
						}}
					/>
				</Flex>

				{/* Appointed By Regulator section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton
						onClick={onClickRegulatorBtn}
						isOpen={current.matches({ edit: 'regulator' })}
						isEditButton={true}
						buttonRef={regulatorBtn}
						onCollapseCallback={onCollapseRegulator}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<P className={styles.appointedByRegulator}>
						{independentTrustee.appointedByRegulator
							? i18n.regulator.fields.appointedByRegulator.labels
									.isAppointedByRegulatorYes
							: i18n.regulator.fields.appointedByRegulator.labels
									.isAppointedByRegulatorNo}
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
						independentTrustee.organisationName,
					)}
				/>
			</Flex>
		</div>
	);
});
