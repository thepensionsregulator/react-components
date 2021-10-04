import React, { useRef } from 'react';
import {
	ActuaryProvider,
	ActuaryProviderProps,
	useActuaryContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { NameScreen } from './views/name';
import RemovedBox from '../components/removedBox';
import { cardTypeName, IToolbarButtonProps } from '../common/interfaces';
import { ActuaryContext } from './actuaryMachine';
import {
	Subtitle,
	CardRemoveButton,
	CardMainHeadingButton,
} from '../common/views/preview/components';
import { removeFromTabFlowIfMatches, concatenateStrings } from '../../../utils';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useActuaryContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'contacts' }):
			return <Contacts />;
		case current.matches({ edit: 'name' }):
			return <NameScreen />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.actuary} />;
		default:
			return null;
	}
};

const ToolbarButton: React.FC<IToolbarButtonProps> = React.memo(
	({ remove = false, button }) => {
		const { current, send, i18n } = useActuaryContext();

		return (
			<>
				{remove ? (
					<CardRemoveButton
						button={button}
						send={send}
						current={current}
						tabIndex={removeFromTabFlowIfMatches(current, {
							edit: 'name',
						})}
					>
						{i18n.preview.buttons.two}
					</CardRemoveButton>
				) : (
					<CardMainHeadingButton
						button={button}
						current={current}
						onClick={() => send('EDIT_NAME')}
					>
						{concatenateStrings([
							current.context.actuary.title,
							current.context.actuary.firstName,
							current.context.actuary.lastName,
						])}
					</CardMainHeadingButton>
				)}
			</>
		);
	},
);

const isComplete = (context: ActuaryContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const ActuaryCard: React.FC<ActuaryProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		const actuaryButtonRef = useRef(null);
		const removeButtonRef = useRef(null);

		return (
			<ActuaryProvider {...rest}>
				{({ current, i18n }) => {
					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								current.context.actuary.title,
								current.context.actuary.firstName,
								current.context.actuary.lastName,
								i18n.preview.buttons.one,
							])}
						>
							<Toolbar
								buttonLeft={() => <ToolbarButton button={actuaryButtonRef} />}
								buttonRight={() => (
									<ToolbarButton button={removeButtonRef} remove={true} />
								)}
								complete={isComplete(current.context)}
								subtitle={() => (
									<Subtitle
										main={i18n.preview.buttons.one}
										secondary={current.context.actuary.organisationName}
									/>
								)}
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
			</ActuaryProvider>
		);
	},
);
