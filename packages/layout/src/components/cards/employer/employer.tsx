import React, { useMemo, useRef } from 'react';
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
} from './context';
import RemovedBox from '../components/removedBox';
import { cardTypeName, IToolbarButtonProps } from '../common/interfaces';
import { EmployerContext } from './employerMachine';
import {
	CardMainHeadingButton,
	CardRemoveButton,
	Subtitle,
} from '../common/views/preview/components';
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

const ToolbarButton: React.FC<IToolbarButtonProps> = React.memo(
	({ remove = false, button }) => {
		const { current, send, i18n } = useEmployerContext();

		return (
			<>
				{remove ? (
					<CardRemoveButton
						button={button}
						send={send}
						current={current}
						tabIndex={removeFromTabFlowIfMatches(current, 'employerType')}
					>
						{i18n.preview.buttons.two}
					</CardRemoveButton>
				) : (
					<CardMainHeadingButton
						button={button}
						current={current}
						onClick={() => send('CHANGE_TYPE')}
					>
						{i18n.preview.buttons.one}
					</CardMainHeadingButton>
				)}
			</>
		);
	},
);

const EmployerSubtitle: React.FC<Partial<EmployerContext>> = React.memo(
	({
		employer: { employerType, statutoryEmployer },
		showStatutoryEmployerSection,
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
			() =>
				showStatutoryEmployerSection
					? capitalize(statutoryEmployer).concat(` employer`)
					: null,
			[statutoryEmployer],
		);

		return <Subtitle main={title} secondary={subtitle} mainBold={false} />;
	},
);

const isComplete = (context: EmployerContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const EmployerCard: React.FC<EmployerProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		const employerButtonRef = useRef(null);
		const removeButtonRef = useRef(null);

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
								buttonLeft={() => <ToolbarButton button={employerButtonRef} />}
								buttonRight={() => (
									<ToolbarButton button={removeButtonRef} remove={true} />
								)}
								complete={isComplete(current.context)}
								subtitle={() => <EmployerSubtitle {...current.context} />}
								statusText={
									isComplete(current.context)
										? i18n.preview.statusText.confirmed
										: i18n.preview.statusText.unconfirmed
								}
							/>
							<CardContentSwitch />
						</Section>
					);
				}}
			</EmployerProvider>
		);
	},
);
