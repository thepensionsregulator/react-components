import React, { useRef } from 'react';
import {
	InHouseAdminProvider,
	InHouseAdminProviderProps,
	useInHouseAdminContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { NameScreen } from './views/name';
import AddressView from './views/address';
import RemovedBox from '../components/removedBox';
import { cardTypeName, IToolbarButtonProps } from '../common/interfaces';
import { InHouseAdminContext } from './inHouseMachine';
import {
	CardMainHeadingButton,
	CardRemoveButton,
	Subtitle,
} from '../common/views/preview/components';
import { removeFromTabFlowIfMatches, concatenateStrings } from '../../../utils';
import styles from '../cards.module.scss';

export interface ICardContentSwitchProps {
	onChangeAddress?: (...args: any[]) => Promise<any>;
}

const CardContentSwitch: React.FC<ICardContentSwitchProps> = ({
	onChangeAddress,
}) => {
	const { current } = useInHouseAdminContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'address' }):
			return <AddressView onChangeAddress={onChangeAddress} />;
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
			return <RemovedBox type={cardTypeName.inHouseAdmin} />;
		default:
			return null;
	}
};

const ToolbarButton: React.FC<IToolbarButtonProps> = React.memo(
	({ remove = false, button }) => {
		const { current, send, i18n } = useInHouseAdminContext();

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
						{i18n.preview.buttonsAndHeadings.remove}
					</CardRemoveButton>
				) : (
					<CardMainHeadingButton
						button={button}
						current={current}
						onClick={() => send('EDIT_NAME')}
					>
						{concatenateStrings([
							current.context.inHouseAdmin.title,
							current.context.inHouseAdmin.firstName,
							current.context.inHouseAdmin.lastName,
						])}
					</CardMainHeadingButton>
				)}
			</>
		);
	},
);

const isComplete = (context: InHouseAdminContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const InHouseCard: React.FC<InHouseAdminProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		const inHouseButtonRef = useRef(null);
		const removeButtonRef = useRef(null);

		return (
			<InHouseAdminProvider {...rest}>
				{({ current, i18n }) => {
					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								current.context.inHouseAdmin.title,
								current.context.inHouseAdmin.firstName,
								current.context.inHouseAdmin.lastName,
								i18n.preview.mainHeadingSubtitle.main,
							])}
						>
							<Toolbar
								buttonLeft={() => <ToolbarButton button={inHouseButtonRef} />}
								buttonRight={() => (
									<ToolbarButton button={removeButtonRef} remove={true} />
								)}
								complete={isComplete(current.context)}
								subtitle={() => (
									<Subtitle main={i18n.preview.mainHeadingSubtitle.main} />
								)}
								statusText={
									isComplete(current.context)
										? i18n.preview.statusText.confirmed
										: i18n.preview.statusText.unconfirmed
								}
							/>
							<CardContentSwitch onChangeAddress={rest.onChangeAddress} />
						</Section>
					);
				}}
			</InHouseAdminProvider>
		);
	},
);
