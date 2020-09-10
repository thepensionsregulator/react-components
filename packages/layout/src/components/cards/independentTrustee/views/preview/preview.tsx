import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useIndependentTrusteeContext } from '../../context';
import styles from './preview.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useIndependentTrusteeContext();
	const { independentTrustee, complete } = current.context;

	return (
		<div
			className={classNames([{ [styles.complete]: complete }, styles.content])}
		>
			<Flex>
				{/* Address section: display only	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<P>{independentTrustee.address.addressLine1}</P>
						{independentTrustee.address.addressLine2 && (
							<P>{independentTrustee.address.addressLine2}</P>
						)}
						{independentTrustee.address.addressLine3 && (
							<P>{independentTrustee.address.addressLine3}</P>
						)}
						<P>{independentTrustee.address.postTown}</P>
						{independentTrustee.address.county && (
							<P>{independentTrustee.address.county}</P>
						)}
						<P>{independentTrustee.address.postcode}</P>
						{independentTrustee.address.country && (
							<P>{independentTrustee.address.country}</P>
						)}
					</Flex>
				</Flex>				

        {/* Appointed By Regulator section: open for editing	 */}
        <Flex cfg={{ flexDirection: 'column' }}>
          <UnderlinedButton onClick={() => send('EDIT_REGULATOR')}>
            {i18n.preview.buttons.four}
          </UnderlinedButton>
          <P cfg={{ pt: 3 }}>
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
					label={i18n.preview.checkboxLabel}
				/>
			</Flex>
		</div>
	);
};
