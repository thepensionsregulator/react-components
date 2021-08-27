import React from 'react';
import {
	CorporateGroupProvider,
	CorporateGroupProviderProps,
	useCorporateGroupContext,
} from './context';
import { Section } from '@tpr/core';
import RemovedBox from '../components/removedBox';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts/contacts';
import { NameScreen } from './views/name/name';
import { Professional } from './views/professional/professional';
import { ReasonRemove } from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { Subtitle } from '../common/views/preview/components';
import { cardTypeName } from '../common/interfaces';
import { CorporateGroupContext } from './corporateGroupMachine';
import { concatenateStrings } from '../../../utils';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { i18n, current } = useCorporateGroupContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'name' }):
			return <NameScreen subSectionHeaderText={i18n.preview.buttons.four} />;
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

const CorporateGroupBtn: React.FC<{ title: string }> = ({ title }) => (
	<UnderlinedButton isMainHeading={true}>{title}</UnderlinedButton>
);

const RemoveButton: React.FC = () => {
	const { current, send, i18n } = useCorporateGroupContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'reason' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				current.context.lastBtnClicked = 2;
				if (
					current.matches({ remove: 'reason' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
		>
			{i18n.preview.buttons.two}
		</UnderlinedButton>
	);
};

const isComplete = (context: CorporateGroupContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const CorporateGroupCard: React.FC<CorporateGroupProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		return (
			<CorporateGroupProvider {...rest}>
				{({ current: { context }, i18n }) => {
					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								context.corporateGroup.organisationName,
								i18n.preview.trusteeType,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<CorporateGroupBtn title={i18n.preview.buttons.one} />
								)}
								buttonRight={RemoveButton}
								complete={isComplete(context)}
								subtitle={() => (
									<Subtitle
										main={context.corporateGroup.organisationName}
										secondary={i18n.preview.trusteeType}
									/>
								)}
								statusText={
									isComplete(context)
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
