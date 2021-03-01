import React from 'react';
import {
	InsurerProvider,
	InsurerProviderProps,
	useInsurerContext,
} from './context';
import { Section, Span } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { Reference } from './views/reference';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import styles from '../cards.module.scss';
import { InsurerContext } from './insurerMachine';
import { concatenateStrings } from '../../../utils';

const CardContentSwitch: React.FC = () => {
	const { current } = useInsurerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'reference' }):
			return <Reference />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.insurer} />;
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

const isComplete = (context: InsurerContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const InsurerCard: React.FC<InsurerProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<InsurerProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Section
						cfg={cfg}
						data-testid={testId}
						className={styles.card}
						ariaLabel={concatenateStrings([
							context.insurer.organisationName,
							i18n.preview.buttons.one,
						])}
					>
						<Toolbar
							complete={isComplete(context)}
							subtitle={() => (
								<Span className={styles.styledAsH4}>
									{context.insurer.organisationName}
								</Span>
							)}
							statusText={
								isComplete(context)
									? i18n.preview.statusText.confirmed
									: i18n.preview.statusText.unconfirmed
							}
							buttonLeft={() => (
								<UnderlinedButton>{i18n.preview.buttons.one}</UnderlinedButton>
							)}
							buttonRight={() => (
								<ToolbarButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Section>
				);
			}}
		</InsurerProvider>
	);
};
