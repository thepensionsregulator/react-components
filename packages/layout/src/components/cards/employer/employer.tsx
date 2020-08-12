import React, { useMemo } from 'react';
import { UnderlinedButton } from '../components/button';
import { Toolbar } from '../components/toolbar';
import { Flex, P } from '@tpr/core';
import { Preview } from './views/preview/preview';
import { DateForm } from './views/remove/date/date';
import { EmployerType } from './views/type/type';
import { Confirm } from './views/remove/confirm/confirm';
import { capitalize } from '../../../utils';
import {
	EmployerProvider,
	useEmployerContext,
	EmployerProviderProps,
	EmployerProps,
} from './context';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useEmployerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches('employerType'):
			return <EmployerType />;
		case current.matches({ remove: 'date' }):
			return <DateForm />;
		case current.matches({ remove: 'confirm' }):
			return <Confirm />;
		default:
			return null;
	}
};

const ToolbarButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useEmployerContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches('employerType') ||
				current.matches({ remove: 'date' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches('employerType') ||
					current.matches({ remove: 'date' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send(title === 'Remove' ? 'REMOVE' : 'CHANGE_TYPE');
				}
			}}
		>
			{title}
		</UnderlinedButton>
	);
};

const EmployerSubtitle: React.FC<Partial<EmployerProps>> = ({
	employerType,
	statutoryEmployer,
}) => {
	if (!employerType || !statutoryEmployer) return null;

	const title = useMemo(
		() =>
			employerType
				.split('-')
				.map((word, index) => (index === 0 ? capitalize(word) : word))
				.join(' ')
				.replace('employer', '')
				.concat(` employer`),
		[employerType],
	);

	const subtitle = useMemo(
		() => capitalize(statutoryEmployer).concat(` employer`),
		[statutoryEmployer],
	);

	return (
		<>
			<P>{title}</P>
			<P>{subtitle}</P>
		</>
	);
};

export const EmployerCard: React.FC<EmployerProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<EmployerProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={context.complete}
							subtitle={() => <EmployerSubtitle {...context.employer} />}
							buttonLeft={() => (
								<ToolbarButton title={i18n.preview.buttons.one} />
							)}
							buttonRight={() => (
								<ToolbarButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</EmployerProvider>
	);
};
