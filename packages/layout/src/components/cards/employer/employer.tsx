import React, { useMemo } from 'react';
import { UnderlinedButton } from '../components/button';
import { Toolbar } from '../components/toolbar';
import { Section } from '@tpr/core';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { EmployerType } from './views/type/type';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import {
	capitalize,
	removeFromTabFlowIfMatches,
	concatenateStrings,
} from '../../../utils';
import {
	EmployerProvider,
	useEmployerContext,
	EmployerProviderProps,
	Employer,
} from './context';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import { EmployerContext } from './employerMachine';
import { ParagraphNoMB } from '../components/paragraphNoMB';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useEmployerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches('employerType'):
			return <EmployerType />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.employer} />;
		default:
			return null;
	}
};

const ToolbarButton: React.FC<{ title: string; tabIndex?: number }> = ({
	title,
	tabIndex,
}) => {
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
			tabIndex={tabIndex}
		>
			{title}
		</UnderlinedButton>
	);
};

const EmployerSubtitle: React.FC<Partial<Employer>> = ({
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
			<ParagraphNoMB>{title}</ParagraphNoMB>
			<ParagraphNoMB>{subtitle}</ParagraphNoMB>
		</>
	);
};

const isComplete = (context: EmployerContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const EmployerCard: React.FC<EmployerProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<EmployerProvider {...rest}>
			{({ current, i18n }) => {
				return (
					<Section
						cfg={cfg}
						data-testid={testId}
						className={styles.card}
						ariaLabel={concatenateStrings([
							current.context.employer.organisationName,
						])}
					>
						<Toolbar
							complete={isComplete(current.context)}
							subtitle={() => (
								<EmployerSubtitle {...current.context.employer} />
							)}
							statusText={
								isComplete(current.context)
									? i18n.preview.statusText.confirmed
									: i18n.preview.statusText.unconfirmed
							}
							buttonLeft={() => (
								<ToolbarButton title={i18n.preview.buttons.one} />
							)}
							buttonRight={() => (
								<ToolbarButton
									title={i18n.preview.buttons.two}
									tabIndex={removeFromTabFlowIfMatches(current, 'employerType')}
								/>
							)}
						/>
						<CardContentSwitch />
					</Section>
				);
			}}
		</EmployerProvider>
	);
};
