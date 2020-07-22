import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, H4, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInsurerContext } from '../../context';
import styles from './preview.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useInsurerContext();
	const { insurer, complete } = current.context;

	return (
		<div
			className={classNames([{ [styles.complete]: complete }, styles.content])}
		>
			<Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<H4 cfg={{ lineHeight: 3 }}>{insurer.organisationName}</H4>
						<P>{insurer.addressLine1}</P>
						{insurer.addressLine2 && <P>{insurer.addressLine2}</P>}
						{insurer.addressLine3 && <P>{insurer.addressLine3}</P>}
						<P>{insurer.postTown}</P>
						<P>{insurer.postCode}</P>
					</Flex>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton isOpen={false} onClick={() => {}}>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<P>Ref {insurer.insurerCompanyReference}</P>
					</Flex>
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
					label={i18n.preview.checkboxLabel}
				/>
			</Flex>
		</div>
	);
};
