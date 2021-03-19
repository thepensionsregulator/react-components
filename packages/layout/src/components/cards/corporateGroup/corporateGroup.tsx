import React from 'react';
import {
	CorporateGroupProvider,
	CorporateGroupProviderProps,
	useCorporateGroupContext,
} from './context';
import { Section, Span } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import RemovedBox from '../components/removedBox';
import { Preview } from './views/preview/preview';
import { NameScreen } from './views/name/name';
import { Contacts } from './views/contacts/contacts';
import { Professional } from './views/professional/professional';
import { ReasonRemove } from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { cardTypeName } from '../common/interfaces';
import { CorporateGroupContext } from './corporateGroupMachine';
import { concatenateStrings } from '../../../utils';
import { ParagraphNoMB } from '../components/paragraphNoMB';
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

const RemoveButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useCorporateGroupContext();

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'reason' }) ||
				current.matches({ remvve: 'confirm' })
			}
			onClick={() => {
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
			{title}
		</UnderlinedButton>
	);
};

const isComplete = (context: CorporateGroupContext) => {
	return context.preValidatedData ? true : context.complete;
};
export const CorporateGroupCard: React.FC<CorporateGroupProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
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
							complete={isComplete(context)}
							subtitle={() => (
								<>
									<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
										{context.corporateGroup.organisationName}
									</Span>
									<ParagraphNoMB>{i18n.preview.trusteeType}</ParagraphNoMB>
								</>
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
								<RemoveButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Section>
				);
			}}
		</CorporateGroupProvider>
	);
};
