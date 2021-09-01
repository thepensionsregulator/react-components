import React, { useRef, MutableRefObject } from 'react';
import {
	ActuaryProvider,
	ActuaryProviderProps,
	useActuaryContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { NameScreen } from './views/name';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import { ActuaryContext } from './actuaryMachine';
import { Subtitle } from '../common/views/preview/components';
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

const ActuaryButton: React.FC<{ button: MutableRefObject<any> }> = ({
	button,
}) => {
	const { current, send, i18n } = useActuaryContext();

	const onCollapseActuary = () => {
		current.context.lastBtnClicked === 1 && button.current.focus();
	};

	const onOfStatesIsActive =
		current.matches({ edit: 'contacts' }) ||
		current.matches({ edit: 'name' }) ||
		current.matches({ remove: 'date' }) ||
		current.matches({ remove: 'confirm' }) ||
		current.matches({ remove: 'deleted' });

	return (
		<UnderlinedButton
			isOpen={onOfStatesIsActive}
			onClick={() => {
				current.context.lastBtnClicked = 1;
				if (onOfStatesIsActive) {
					send('CANCEL');
				} else {
					send('EDIT_NAME');
				}
			}}
			isEditButton={true}
			isMainHeading={true}
			buttonRef={button}
			onCollapseCallback={onCollapseActuary}
		>
			{i18n.preview.buttons.one}
		</UnderlinedButton>
	);
};

const RemoveButton: React.FC<{ button: MutableRefObject<any> }> = ({
	button,
}) => {
	const { current, send, i18n } = useActuaryContext();

	const onCollapseRemove = () => {
		current.context.lastBtnClicked === 2 && button.current.focus();
	};

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'date' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				current.context.lastBtnClicked = 2;
				if (
					current.matches({ remove: 'date' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
			tabIndex={removeFromTabFlowIfMatches(current, {
				edit: 'name',
			})}
			notHeading={true}
			buttonRef={button}
			onCollapseCallback={onCollapseRemove}
		>
			{i18n.preview.buttons.two}
		</UnderlinedButton>
	);
};

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
								buttonLeft={() => <ActuaryButton button={actuaryButtonRef} />}
								buttonRight={() => <RemoveButton button={removeButtonRef} />}
								complete={isComplete(current.context)}
								subtitle={() => (
									<Subtitle
										main={concatenateStrings([
											current.context.actuary.title,
											current.context.actuary.firstName,
											current.context.actuary.lastName,
										])}
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
