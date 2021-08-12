import React from 'react';
import {
	TrusteeProvider,
	useTrusteeContext,
	TrusteeCardProps,
} from './context';
import { Section } from '@tpr/core';
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
import { CardContentProps, cardType, cardTypeName } from '../common/interfaces';
import { AddressComparer } from '@tpr/forms';
import { TrusteeContext } from './trusteeMachine';
import { Subtitle } from '../common/views/preview/components';
import {
	concatenateStrings,
	removeFromTabFlowIfMatches,
	capitalize,
} from '../../../utils';
import styles from '../cards.module.scss';

const CardContent: React.FC<CardContentProps> = ({
	enableContactDetails = true,
	onChangeAddress
}) => {
	const { current, i18n, send, addressAPI } = useTrusteeContext();
	const { trustee } = current.context;

	if (current.matches('preview')) {
		return <Preview enableContactDetails={enableContactDetails} />;
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
				subSectionHeaderText={i18n.preview.buttons.three}
				onChangeAddress={onChangeAddress}
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
				current.matches({ edit: { trustee: 'save' } })
			}
			onClick={() => {
				if (
					current.matches({ edit: { trustee: 'name' } }) ||
					current.matches({ edit: { trustee: 'kind' } })
				) {
					send('CANCEL');
				} else {
					send('EDIT_TRUSTEE');
				}
			}}
			isEditButton={true}
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
	enableContactDetails = true,
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
							<Subtitle
								main={concatenateStrings([
									current.context.trustee.title,
									current.context.trustee.firstName,
									current.context.trustee.lastName,
								])}
								secondary={`${capitalize(
									current.context.trustee.trusteeType,
								)} trustee`}
							/>
						)}
						statusText={
							isComplete(current.context)
								? i18n.preview.statusText.confirmed
								: i18n.preview.statusText.unconfirmed
						}
					/>
					<CardContent onChangeAddress={props.onChangeAddress} enableContactDetails={enableContactDetails} />
				</Section>
			)}
		</TrusteeProvider>
	);
};
