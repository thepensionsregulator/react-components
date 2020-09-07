import React from 'react';
import {
	CorporateGroupProvider,
	CorporateGroupProviderProps,
	useCorporateGroupContext,
} from './context';
import { Flex, H4, P } from '@tpr/core';
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

// const CorporateGroupButton: React.FC = () => {
//   const { current, send, i18n } = useCorporateGroupContext();

//   const onOfStatesIsActive =
//     current.matches({ edit: 'name' }) ||
//     current.matches({ edit: 'contacts' }) ||
//     current.matches({ edit: 'professional' }) ||
//     current.matches({ remove: 'reason' }) ||
//     current.matches({ remove: 'confirm' }) ||
//     current.matches({ remove: 'deleted' });

//   return (
//     <UnderlinedButton
//       isOpen={onOfStatesIsActive}
//       onClick={() => {
//         onOfStatesIsActive ? send('CANCEL') : send('REMOVE');
//       }}
//     >
//       {i18n.preview.buttons.one}
//     </UnderlinedButton>
//   );
// }

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

export const CorporateGroupCard: React.FC<CorporateGroupProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<CorporateGroupProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={context.complete}
							subtitle={() => (
								<>
									<H4 cfg={{ lineHeight: 3 }}>
										{context.corporateGroup.organisationName}
									</H4>
									<P>{i18n.preview.trusteeType}</P>
								</>
							)}
							buttonLeft={() => (
								// <CorporateGroupButton />
								<UnderlinedButton>{i18n.preview.buttons.one}</UnderlinedButton>
							)}
							buttonRight={() => (
								<RemoveButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</CorporateGroupProvider>
	);
};
