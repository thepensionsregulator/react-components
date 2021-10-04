import React, { useRef } from 'react';
import {
	CorporateGroupProvider,
	CorporateGroupProviderProps,
	useCorporateGroupContext,
} from './context';
import { Section } from '@tpr/core';
import RemovedBox from '../components/removedBox';
import { Toolbar } from '../components/toolbar';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts/contacts';
import { NameScreen } from './views/name/name';
import { Professional } from './views/professional/professional';
import { ReasonRemove } from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import {
	CardRemoveButton,
	Subtitle,
	CardMainHeadingTitle,
} from '../common/views/preview/components';
import { cardTypeName } from '../common/interfaces';
import { CorporateGroupContext } from './corporateGroupMachine';
import { concatenateStrings } from '../../../utils';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useCorporateGroupContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'name' }):
			return <NameScreen />;
		case current.matches({ edit: 'contacts' }):
			return <Contacts />;
		case current.matches({ edit: 'professional' }):
			return <Professional />;
		case current.matches({ remove: 'reason' }):
			return <ReasonRemove />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			return <RemovedBox type={cardTypeName.corporateGroup} />;
		default:
			return null;
	}
};

const isComplete = (context: CorporateGroupContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const CorporateGroupCard: React.FC<CorporateGroupProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		const removeButtonRef = useRef(null);

		return (
			<CorporateGroupProvider {...rest}>
				{({ current, send, i18n }) => {
					const RemoveButton = () => (
						<CardRemoveButton
							button={removeButtonRef}
							send={send}
							current={current}
						>
							{i18n.preview.buttons.two}
						</CardRemoveButton>
					);

					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								current.context.corporateGroup.organisationName,
								i18n.preview.trusteeType,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<CardMainHeadingTitle
										title={current.context.corporateGroup.organisationName}
									/>
								)}
								buttonRight={RemoveButton}
								complete={isComplete(current.context)}
								subtitle={() => (
									<Subtitle secondary={i18n.preview.trusteeType} />
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
			</CorporateGroupProvider>
		);
	},
);
