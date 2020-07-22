import React from 'react';
import {
	InsurerProvider,
	InsurerProviderProps,
	useInsurerContext,
} from './context';
import { Flex } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { DateForm } from './views/remove/date/date';
import { Confirm } from './views/remove/confirm/confirm';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useInsurerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ remove: 'date' }):
			return <DateForm />;
		case current.matches({ remove: 'confirm' }):
			return <Confirm />;
		default:
			return null;
	}
};

const ToolbarButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useInsurerContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'date' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches({ remove: 'date' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
		>
			{title}
		</UnderlinedButton>
	);
};

export const Insurer: React.FC<InsurerProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<InsurerProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={context.complete}
							buttonLeft={() => (
								<UnderlinedButton>{i18n.preview.buttons.one}</UnderlinedButton>
							)}
							buttonRight={() => (
								<ToolbarButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</InsurerProvider>
	);
};
