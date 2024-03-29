import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { InHouseCard } from '../cards/inHouse/inHouse';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { InHouseAdminNoApi } from '../cards/inHouse/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
	assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged,
	clearTitleField,
	assertMainHeadingExists,
	assertRemoveButtonExists,
	assertHeadingButtonsExist,
} from '../testHelpers/testHelpers';
import { sampleAddress } from '../testHelpers/commonData/cards';
import { concatenateStrings } from '../../utils';

const noop = () => Promise.resolve();

const inHouseAdmin: InHouseAdminNoApi = {
	id: '',
	schemeRoleId: 123,
	title: 'Mr',
	firstName: 'John',
	lastName: 'Smoth',
	effectiveDate: '1997-04-01T00:00:00',
	address: sampleAddress,
	telephoneNumber: '01273 222 111',
	emailAddress: 'john.wick@warnerbros.com',
};

describe('InHouse Preview', () => {
	let component, findByText, findByRole, findByTestId, findAllByTestId;

	beforeEach(async () => {
		const {
			container,
			getByText,
			getByRole,
			getByTestId,
			getAllByTestId,
		} = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpoint) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		component = container;
		findByText = getByText;
		findByRole = getByRole;
		findByTestId = getByTestId;
		findAllByTestId = getAllByTestId;
	});

	test('is accessible', async () => {
		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});

	test('it renders preview correctly', () => {
		assertMainHeadingExists(
			findByText,
			findByTestId,
			concatenateStrings([
				inHouseAdmin.title,
				inHouseAdmin.firstName,
				inHouseAdmin.lastName,
			]),
			true,
		);

		assertRemoveButtonExists(findByText, findByTestId);

		const h4Buttons = ['Address', 'Contact details'];
		assertHeadingButtonsExist(findAllByTestId, findByText, h4Buttons);
	});

	test('replaces __NAME__ in the checkbox label', () => {
		expect(findByText(`Confirm 'Mr John Smoth' is correct.`)).toBeDefined();
	});

	test('renders with a section containing an aria label', () => {
		assertThatASectionExistsWithAnAriaLabel(
			findByRole,
			`${inHouseAdmin.title} ${inHouseAdmin.firstName} ${inHouseAdmin.lastName} In House Administrator`,
		);
	});
});

describe('Update in-house trustee name', () => {
	let component, findByText, findByTestId;
	let updatedInHouseAdmin = null;

	beforeEach(async () => {
		const { container, getByText, getByTestId } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={(values) => {
					updatedInHouseAdmin = values;
					return noop();
				}}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		component = container;
		findByText = getByText;
		findByTestId = getByTestId;
		const buttonText = concatenateStrings([
			inHouseAdmin.title,
			inHouseAdmin.firstName,
			inHouseAdmin.lastName,
		]);

		findByText(buttonText).click();
	});

	afterEach(() => {
		cleanup();
	});

	test('is accessible', async () => {
		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});

	test('renders name fields', () => {
		expect(findByTestId('inHouseAdmin-name-form')).not.toBe(null);
		const titleHtmlElement = findByTestId('title') as HTMLElement;
		const firstNameHtmlElement = findByTestId('first-name') as HTMLElement;
		const lastNameHtmlElement = findByTestId('last-name') as HTMLElement;

		expect(titleHtmlElement).toBeDefined();
		expect(titleHtmlElement).toHaveAttribute('maxlength', '35');
		expect(titleHtmlElement).toHaveAttribute(
			'autocomplete',
			'honorific-prefix',
		);
		expect(titleHtmlElement).toHaveAttribute('value', inHouseAdmin.title);
		expect(firstNameHtmlElement).toBeDefined();
		expect(firstNameHtmlElement).toHaveAttribute('maxlength', '70');
		expect(firstNameHtmlElement).toHaveAttribute('autocomplete', 'given-name');
		expect(firstNameHtmlElement).toHaveAttribute(
			'value',
			inHouseAdmin.firstName,
		);
		expect(firstNameHtmlElement).toHaveAttribute('required');
		expect(lastNameHtmlElement).toBeDefined();
		expect(lastNameHtmlElement).toHaveAttribute('maxlength', '70');
		expect(lastNameHtmlElement).toHaveAttribute('autocomplete', 'family-name');
		expect(lastNameHtmlElement).toHaveAttribute('value', inHouseAdmin.lastName);
		expect(lastNameHtmlElement).toHaveAttribute('required');
		expect(findByText('Save and close')).toBeDefined();

		assertThatButtonHasBeenRemovedFromTheTabFlow(findByText, 'Remove');
	});

	test('in house title can be left empty when name is updated', async () => {
		await act(async () => {
			clearTitleField(findByText);
			findByText(/Save and close/).click();
		});

		await assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged(
			component,
			inHouseAdmin,
			updatedInHouseAdmin,
		);
	});
});

describe('Update in-house trustee contact details', () => {
	let component, findByText;

	beforeEach(async () => {
		const { container, getByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpoint) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		component = container;
		findByText = getByText;

		findByText('Contact details').click();
	});

	afterEach(() => {
		cleanup();
	});

	test('is accessible', async () => {
		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});

	test('renders contact fields', () => {
		const telHtmlElement = findByText('Telephone number');
		expect(telHtmlElement).toBeDefined();
		expect(telHtmlElement.nextSibling.firstChild).toHaveAttribute(
			'type',
			'tel',
		);
		expect(telHtmlElement.nextSibling.firstChild).toHaveAttribute(
			'autocomplete',
			'tel',
		);
		expect(telHtmlElement.nextSibling.firstChild).toHaveAttribute(
			'value',
			inHouseAdmin.telephoneNumber,
		);

		const emailHtmlElement = findByText('Email address');
		expect(emailHtmlElement).toBeDefined();
		expect(emailHtmlElement.nextSibling.firstChild).toHaveAttribute(
			'type',
			'email',
		);
		expect(emailHtmlElement.nextSibling.firstChild).toHaveAttribute(
			'autocomplete',
			'email',
		);
		expect(emailHtmlElement.nextSibling.firstChild).toHaveAttribute(
			'value',
			inHouseAdmin.emailAddress,
		);
		expect(findByText('Save and close')).toBeDefined();
	});
});

describe('InHouse Remove', () => {
	afterEach(() => {
		cleanup();
	});

	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		userEvent.click(getByText('Remove'));
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen date is required', async () => {
		const { getByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		userEvent.click(getByText('Remove'));
		userEvent.click(getByText(/I confirm/i));
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen checkbox is required', async () => {
		const { getByText, getByTestId } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		// go to remove screen
		userEvent.click(getByText('Remove'));
		// enter date
		userEvent.type(getByTestId('dd-field'), '10');
		userEvent.type(getByTestId('mm-field'), '10');
		userEvent.type(getByTestId('yyyy-field'), '2010');
		// click Continue and check validation
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Confirm this employer is no longer associated'),
		).toBeInTheDocument();
	});

	test('Date screen validation passes when required fields complete', async () => {
		const { getByText, getByTestId } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		// go to remove screen
		userEvent.click(getByText('Remove'));
		// confirm checkbox
		userEvent.click(getByText(/I confirm/i));
		// enter date
		userEvent.type(getByTestId('dd-field'), '10');
		userEvent.type(getByTestId('mm-field'), '10');
		userEvent.type(getByTestId('yyyy-field'), '2010');
		// click Continue and check validation
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Are you sure you want to remove this in house admin?'),
		).toBeInTheDocument();
	});
});

describe('In house admin correspondence address', () => {
	afterEach(() => {
		cleanup();
	});

	test('Change address is accessible', async () => {
		const { container, getByText, getAllByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		getByText('Address').click();
		getByText(/I need to change the address/).click();

		const results = await axe(container);

		expect(results).toHaveNoViolations();
		expect(getByText('Find address')).toBeInTheDocument();
		const cancelButtons = getAllByText(/Cancel/);
		expect(cancelButtons[0]).toBeInTheDocument();
		expect(cancelButtons[1]).toBeInTheDocument();
	});

	test('Cancel change address returns to preview', async () => {
		const { container, getByText, getAllByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		getByText('Address').click();
		getByText(/I need to change the address/).click();
		const cancelButtons = getAllByText(/Cancel/);
		cancelButtons[0].click();
		cancelButtons[1].click();

		const results = await axe(container);

		expect(results).toHaveNoViolations();
		expect(getByText('Address')).toBeInTheDocument();
	});
});
