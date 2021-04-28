import React from 'react';
import { render } from '@testing-library/react';
import { InHouseCard } from '../cards/inHouse/inHouse';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { InHouseAdminNoApi } from '../cards/inHouse/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasAriaExpanded,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
	assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged,
	clearTitleField,
} from '../testHelpers/testHelpers';

const noop = () => Promise.resolve();

const inHouseAdmin: InHouseAdminNoApi = {
	id: '',
	schemeRoleId: 123,
	title: 'Mr',
	firstName: 'John',
	lastName: 'Smoth',
	effectiveDate: '1997-04-01T00:00:00',
	address: {
		addressLine1: 'Napier House',
		addressLine2: 'Trafalgar Pl',
		addressLine3: '',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'West Sussex',
		countryId: 2,
	},
	telephoneNumber: '01273 222 111',
	emailAddress: 'john.wick@warnerbros.com',
};

describe('InHouse Preview', () => {
	let component, findByText, findByTestId, findByRole;
	let updatedInHouseAdmin = null;

	beforeEach(async () => {
		const { container, getByText, getByTestId, getByRole } = render(
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
		findByRole = getByRole;
	});

	test('is accessible', async () => {
		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});

	test('it renders preview correctly', () => {
		expect(findByText('In House Administrator')).toBeDefined();
		expect(findByText('Remove')).toBeDefined();
		expect(findByText('Address')).toBeDefined();
		assertThatButtonHasAriaExpanded(findByText, 'Address', false);
		expect(findByText('Contact details')).toBeDefined();
		assertThatButtonHasAriaExpanded(findByText, 'Contact details', false);
	});

	test('editing in house name', () => {
		findByText('In House Administrator').click();
		expect(findByTestId('inHouseAdmin-name-form')).not.toBe(null);
		var titleHtmlElement = findByText('Title (optional)') as HTMLElement;
		var firstNameHtmlElement = findByText('First name') as HTMLElement;
		var lastNameHtmlElement = findByText('Last name') as HTMLElement;

		expect(titleHtmlElement).toBeDefined();
		expect(titleHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
			'maxlength',
			'35',
		);
		expect(firstNameHtmlElement).toBeDefined();
		expect(firstNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
			'maxlength',
			'70',
		);
		expect(lastNameHtmlElement).toBeDefined();
		expect(lastNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
			'maxlength',
			'70',
		);
		expect(findByText('Save and close')).toBeDefined();

		assertThatButtonHasBeenRemovedFromTheTabFlow(findByText, 'Remove');
	});

	test('in house title can be left empty when name is updated', async () => {
		await act(async () => {
			findByText(/In House Administrator/).click();
			await axe(component);
			clearTitleField(findByText);
			findByText(/Save and close/).click();
		});

		await assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged(
			component,
			inHouseAdmin,
			updatedInHouseAdmin,
		);
	});

	test('renders with a section containing an aria label', () => {
		assertThatASectionExistsWithAnAriaLabel(
			findByRole,
			`${inHouseAdmin.title} ${inHouseAdmin.firstName} ${inHouseAdmin.lastName} In House Administrator`,
		);
	});
});

describe('InHouse Remove', () => {
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
			getByText('Please confirm and fill in the date fields.'),
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
;
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
		const cancelButtons = 	getAllByText(/Cancel/);
		cancelButtons[0].click();
		cancelButtons[1].click();

		const results = await axe(container);

		expect(results).toHaveNoViolations();
		expect(getByText('Address')).toBeInTheDocument();
	});
});
