import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { InsurerCard } from '../cards/insurer/insurer';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Insurer } from '../cards/insurer/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertMainHeadingExists,
	assertRemoveButtonExists,
	assertHeadingButtonsExist,
	assertHeadingsExist,
} from '../testHelpers/testHelpers';
import { sampleAddress } from '../testHelpers/commonData/cards';
import { act } from '@testing-library/react-hooks';

const noop = () => Promise.resolve();

const insurer: Insurer = {
	id: '',
	schemeRoleId: 123,
	effectiveDate: '1997-04-01T00:00:00',
	organisationReference: 456,
	organisationName: 'Some Organisation Name',
	insurerCompanyReference: '12345678',
	address: sampleAddress,
	telephoneNumber: '',
	emailAddress: '',
	companiesHouseNumber: '0012345',
};

describe('Insurer Preview', () => {
	test('is accessible', async () => {
		const { container, getByText, getByTestId, getAllByTestId } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();

		assertMainHeadingExists(
			getByText,
			getByTestId,
			insurer.organisationName,
			false,
		);

		assertRemoveButtonExists(getByText, getByTestId);

		const h4Headings = ['Address', 'Companies House Number'];
		assertHeadingsExist(getAllByTestId, h4Headings);

		const h4Buttons = ['Insurer reference number'];
		assertHeadingButtonsExist(getAllByTestId, getByText, h4Buttons);
	});

	test('renders with a section containing an aria label', () => {
		const { getByRole } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={noop}
				complete={true}
				insurer={insurer}
			/>,
		);

		assertThatASectionExistsWithAnAriaLabel(
			getByRole,
			`${insurer.organisationName} Insurer administrator`,
		);
	});

	test('replaces __NAME__ in the checkbox label', () => {
		const { findByText } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={noop}
				complete={true}
				insurer={insurer}
			/>,
		);

		expect(
			findByText(`Confirm '${insurer.organisationName}' is correct.`),
		).toBeDefined();
	});
});

describe('Insurer Remove', () => {
	afterEach(() => {
		cleanup();
	});

	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		await act(async () => {
			getByText('Remove').click();
		});

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		await act(async () => {
			userEvent.click(getByText('Remove'));
			userEvent.click(getByText('Continue'));
		});
		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen date is required', async () => {
		const { getByText } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		await act(async () => {
			userEvent.click(getByText('Remove'));
			userEvent.click(getByText(/I confirm/i));
			userEvent.click(getByText('Continue'));
		});

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen checkbox is required', async () => {
		const { getByText, getByTestId } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		await act(async () => {
			// go to remove screen
			userEvent.click(getByText('Remove'));
			// enter date
			userEvent.type(getByTestId('dd-field'), '10');
			userEvent.type(getByTestId('mm-field'), '10');
			userEvent.type(getByTestId('yyyy-field'), '2010');
			// click Continue and check validation
			userEvent.click(getByText('Continue'));
		});

		expect(
			getByText('Confirm this employer is no longer associated'),
		).toBeInTheDocument();
	});

	test('Date screen validation passes when required fields complete', async () => {
		const { getByText, getByTestId } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		await act(async () => {
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
		});

		expect(
			getByText('Are you sure you want to remove this insurer?'),
		).toBeInTheDocument();
	});
});
