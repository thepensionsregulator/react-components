import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ThirdPartyCard } from '../cards/thirdParty/thirdParty';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { ThirdPartyProps } from '../cards/thirdParty/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertMainHeadingExists,
	assertRemoveButtonExists,
	assertHeadingsExist,
} from '../testHelpers/testHelpers';
import {
	sampleAddress,
	disableHeadingOrder,
} from '../testHelpers/commonData/cards';
import { act } from '@testing-library/react-hooks';

const noop = () => Promise.resolve();

const thirdPartyAdmin: ThirdPartyProps = {
	id: '',
	schemeRoleId: 123,
	effectiveDate: '1997-04-01T00:00:00',
	organisationName: `McDonald's`,
	address: sampleAddress,
};

afterEach(() => {
	cleanup();
});

describe('ThirdParty Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('renders buttons correctly', () => {
		const { getByText, container, getByTestId, getAllByTestId } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		expect(container.querySelector('button')).not.toBe(null);

		assertMainHeadingExists(
			getByText,
			getByTestId,
			'Third Party Administrator',
			false,
		);

		assertRemoveButtonExists(getByText, getByTestId);

		const h4Headings = ['Address'];
		assertHeadingsExist(getAllByTestId, h4Headings);
	});

	test('renders with a section containing an aria label', () => {
		const { getByRole } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={noop}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		assertThatASectionExistsWithAnAriaLabel(
			getByRole,
			`${thirdPartyAdmin.organisationName} Third Party Administrator`,
		);
	});

	test('replaces __NAME__ in the checkbox label', () => {
		const { findByText } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={noop}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		expect(
			findByText(`Confirm '${thirdPartyAdmin.organisationName}' is correct.`),
		).toBeDefined();
	});
});

describe('ThirdParty Remove', () => {
	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container, { rules: disableHeadingOrder });
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		await act(async () => {
			userEvent.click(getByText('Remove'));
			userEvent.click(getByText('Continue'));

			expect(
				getByText('Please confirm and fill in the date fields.'),
			).toBeInTheDocument();
		});
	});

	test('Date screen date is required', async () => {
		const { getByText } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		await act(async () => {
			userEvent.click(getByText('Remove'));
			userEvent.click(getByText(/I confirm/i));
			userEvent.click(getByText('Continue'));

			expect(
				getByText('Please confirm and fill in the date fields.'),
			).toBeInTheDocument();
		});
	});

	test('Date screen checkbox is required', async () => {
		const { getByText, getByTestId } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
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

			expect(
				getByText('Please confirm and fill in the date fields.'),
			).toBeInTheDocument();
		});
	});

	test('Date screen validation passes when required fields complete', async () => {
		const { getByText, getByTestId } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
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

			expect(
				getByText('Are you sure you want to remove this third party admin?'),
			).toBeInTheDocument();
		});
	});
});
