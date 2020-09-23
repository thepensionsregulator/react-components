import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, H4, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInsurerContext } from '../../context';
import styles from './preview.module.scss';

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
						<P>{insurer.address.addressLine1}</P>
						{insurer.address.addressLine2 && (
							<P>{insurer.address.addressLine2}</P>
						)}
						{insurer.address.addressLine3 && (
							<P>{insurer.address.addressLine3}</P>
						)}
						<P>{insurer.address.postTown}</P>
						{insurer.address.county && <P>{insurer.address.county}</P>}
						<P>{insurer.address.postcode}</P>
						{insurer.address.country && <P>{insurer.address.country}</P>}
					</Flex>
				</Flex>

				{/* Contact details block: display only	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.four}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						{insurer.telephoneNumber && (
							<>
								<H4 cfg={{ lineHeight: 3 }}>Phone</H4>
								<P>{insurer.telephoneNumber}</P>
							</>
						)}
						{insurer.emailAddress && (
							<>
								<H4 cfg={{ lineHeight: 3 }}>Email</H4>
								<P cfg={{ wordBreak: 'all' }}>{insurer.emailAddress}</P>
							</>
						)}
					</Flex>

					{/* Contact details block: display only	 */}
					<UnderlinedButton isOpen={false} onClick={() => send('EDIT_INSURER')}>
						{i18n.preview.buttons.five}
					</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<P>{insurer.insurerCompanyReference}</P>
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
