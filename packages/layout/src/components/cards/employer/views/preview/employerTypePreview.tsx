import { Flex, P } from '@tpr/core';
import React, { useMemo } from 'react';
import { capitalize } from '../../../../../utils';
import { EmployerContext } from '../../employerMachine';
import styles from './employerTypePreview.module.scss';

export const EmployerTypePreview: React.FC<
	Partial<EmployerContext>
> = React.memo(
	({
		employer: { employerType, statutoryEmployer },
		showStatutoryEmployerSection,
	}) => {
		const employerTypeString = useMemo(
			() =>
				employerType
					.split('-')
					.map((word, index) => (index === 0 ? capitalize(word) : word))
					.join(' ')
					.replace('employer', '')
					.concat(` employer`),
			[employerType],
		);

		const statuaryEmployer = useMemo(
			() =>
				showStatutoryEmployerSection
					? capitalize(statutoryEmployer).concat(` employer`)
					: null,
			[statutoryEmployer],
		);

		return (
			<Flex cfg={{ flexDirection: 'column' }}>
				<P className={styles.personOrCompanyRole}>{employerTypeString}</P>
				{showStatutoryEmployerSection ? (
					<P className={styles.personOrCompanyRole}>{statuaryEmployer}</P>
				) : (
					<></>
				)}
			</Flex>
		);
	},
);
