import React from 'react';
import { Flex, P, Hr, H4, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import styles from './preview.module.scss';
import { useEmployerContext } from '../../context';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect } = useEmployerContext();
	const { complete } = current.context;

	return (
		<div
			className={classNames([{ [styles.complete]: complete }, styles.content])}
		>
			<Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>Employer</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<H4>Starfleet Academy</H4>
						<P>Picard House</P>
						<P>Enterprice place</P>
						<P>Gamma Quadrant</P>
						<P>ABC 123</P>
						<P>United Kingdom</P>
					</Flex>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton>Companies House number</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<P>AB123456</P>
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
					label="All details are correct."
				/>
			</Flex>
		</div>
	);
};
