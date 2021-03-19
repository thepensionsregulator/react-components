import React from 'react';
import {
	TrusteeProvider,
	useTrusteeContext,
	TrusteeCardProps,
} from './context';
import { Section, Span } from '@tpr/core';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview';
import { Toolbar } from '../components/toolbar';
import Name from './views/name';
import Type from './views/type/type';
import Address from '../common/views/address/addressPage';
import { Contacts } from './views/contacts';
import RemoveReason from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm';
import RemovedBox from '../components/removedBox';
import { cardType, cardTypeName } from '../common/interfaces';
import { AddressComparer } from '@tpr/forms';
import { TrusteeContext } from './trusteeMachine';
import {
	concatenateStrings,
	removeFromTabFlowIfMatches,
	capitalize,
} from '../../../utils';
import { ParagraphNoMB } from '../components/paragraphNoMB';
import styles from '../cards.module.scss';

const CardContent: React.FC = () => {
	const { current, i18n, send, addressAPI } = useTrusteeContext();
	const { trustee } = current.context;

	if (current.matches('preview')) {
		return <Preview />;
	} else if (current.matches({ edit: { trustee: 'name' } })) {
		return <Name />;
	} else if (
		current.matches({ edit: { trustee: 'kind' } }) ||
		current.matches({ edit: { trustee: 'save' } })
	) {
		return <Type />;
	} else if (
		current.matches({ edit: { company: 'address' } }) ||
		current.matches({ edit: { company: 'save' } })
	) {
		return (
			<Address
				onSubmit={(values) => {
					const comparer = new AddressComparer();
					if (comparer.areEqual(values.initialValue, values)) {
						send('CANCEL');
					} else {
						send('SAVE', { address: values || {} });
					}
				}}
				initialValue={trustee.address}
				addressAPI={addressAPI}
				cardType={cardType.trustee}
				cardTypeName={cardTypeName.trustee}
				sectionTitle={i18n.address.sectionTitle}
				i18n={i18n.address}
				onCancelChanges={() => send('CANCEL')}
			/>
		);
	} else if (
		current.matches({ edit: { contact: 'details' } }) ||
		current.matches({ edit: { contact: 'save' } })
	) {
		return <Contacts />;
	} else if (current.matches({ remove: 'reason' })) {
		return <RemoveReason />;
	} else if (current.matches({ remove: 'confirm' })) {
		return <ConfirmRemove />;
	} else if (current.matches({ remove: 'deleted' })) {
		// message to show when successfuly deleted.
		return <RemovedBox type={cardTypeName.trustee} />;
	} else {
		return null;
	}
};

const TrusteeButton: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ edit: { trustee: 'name' } }) ||
				current.matches({ edit: { trustee: 'kind' } }) ||
				current.matches({ edit: { trustee: 'save' } }) ||
				current.matches({ edit: { company: 'address' } }) ||
				current.matches({ edit: { company: 'save' } }) ||
				current.matches({ edit: { contact: 'details' } }) ||
				current.matches({ edit: { contact: 'save' } }) ||
				current.matches({ remove: 'reason' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches({ edit: { trustee: 'name' } }) ||
					current.matches({ edit: { trustee: 'kind' } }) ||
					current.matches({ edit: { company: 'address' } }) ||
					current.matches({ edit: { contact: 'details' } }) ||
					current.matches({ remove: 'reason' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('EDIT_TRUSTEE');
				}
			}}
		>
			{i18n.preview.buttons.one}
		</UnderlinedButton>
	);
};

const RemoveButton: React.FC<{ tabIndex?: number }> = ({ tabIndex }) => {
	const { current, send, i18n } = useTrusteeContext();

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'reason' }) ||
				current.matches({ remove: 'confirm' })
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
			tabIndex={tabIndex}
		>
			{i18n.preview.buttons.two}
		</UnderlinedButton>
	);
};

const isComplete = (context: TrusteeContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const TrusteeCard: React.FC<Omit<TrusteeCardProps, 'children'>> = ({
	cfg,
	...props
}) => {
	return (
		<TrusteeProvider {...props}>
			{({ current, i18n }) => (
				<Section
					cfg={cfg}
					data-testid={props.testId}
					className={styles.card}
					ariaLabel={concatenateStrings([
						current.context.trustee.title,
						current.context.trustee.firstName,
						current.context.trustee.lastName,
						current.context.trustee.trusteeType,
						i18n.preview.buttons.one,
					])}
				>
					<Toolbar
						complete={isComplete(current.context)}
						buttonLeft={() => <TrusteeButton />}
						buttonRight={() => (
							<RemoveButton
								tabIndex={removeFromTabFlowIfMatches(current, {
									edit: { trustee: 'name' },
								})}
							/>
						)}
						subtitle={() => (
							<>
								<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
									{concatenateStrings([
										current.context.trustee.title,
										current.context.trustee.firstName,
										current.context.trustee.lastName,
									])}
								</Span>
								<ParagraphNoMB>
									{capitalize(current.context.trustee.trusteeType)} trustee
								</ParagraphNoMB>
							</>
						)}
						statusText={
							isComplete(current.context)
								? i18n.preview.statusText.confirmed
								: i18n.preview.statusText.unconfirmed
						}
					/>
					<CardContent />
				</Section>
			)}
		</TrusteeProvider>
	);
};
