import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFSearch } from '../elements/search/search';
import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent } from '@testing-library/react';

const values = [
	{
		organisationName: 'AAAAAA',
		addressLine1: 'address1',
		addressLine2: '',
		addressLine3: 'address13',
		postTown: 'London',
		postCounty: '',
		postcode: 'SE11 5AA',
	},
	{
		organisationName: 'BBBBBB',
		addressLine1: 'address2',
		addressLine2: 'address22',
		addressLine3: 'address23',
		postTown: 'Manchester',
		postCounty: '',
		postcode: 'SE12 5BB',
	},
	{
		organisationName: 'CCCCCC',
		addressLine1: 'address3',
		addressLine2: 'address32',
		addressLine3: 'address33',
		postTown: 'Liverpool',
		postCounty: '',
		postcode: 'SE13 5CC',
	},
];

const checkFormat = (rawObject, element) => {
	const innerContent = element.innerHTML;
	const objectFormatted = `<p>${rawObject.organisationName}</p><p>${rawObject.addressLine1}</p><p>${rawObject.addressLine2}</p><p>${rawObject.addressLine3}</p><p>${rawObject.postTown}</p><p>${rawObject.postCounty}</p><p>${rawObject.postcode}</p>`;
	return innerContent == objectFormatted;
};

const searchService = (query) => {
	const resultsFiltered = values.filter((option) => {
		return (
			option.organisationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	});
	return Promise.resolve([...resultsFiltered]);
};

const cb = jest.fn();

describe('Search input', () => {
	describe('receiving optionsArray prop', () => {
		let pickByRole, pickByText;

		beforeEach(() => {
			const { getByRole, getByText } = formSetup({
				render: (
					<FFSearch
						name="accessible-search"
						label="Organisation"
						hint="Search by organisation name."
						optionsArray={values}
						keyValue="organisationName"
						callback={cb}
					/>
				),
			});
			pickByRole = getByRole;
			pickByText = getByText;
		});

		afterAll(() => {
			cleanup();
		});

		test('renders input', () => {
			const autocomplete = pickByRole('combobox');
			expect(autocomplete).toBeInTheDocument();
			expect(autocomplete).toHaveAttribute('aria-owns');
			expect(autocomplete).toHaveAttribute('aria-autocomplete');
			expect(autocomplete).toHaveAttribute('aria-describedby');
			expect(autocomplete).toHaveAttribute('aria-expanded');

			const hint = pickByText('Search by organisation name.');
			expect(hint).toBeInTheDocument();

			const label = pickByText('Organisation');
			expect(label).toBeInTheDocument();
		});

		test('renders results correctly', () => {
			const autocomplete = pickByRole('combobox');
			userEvent.type(autocomplete, 'aaa');

			const list = pickByRole('listbox');
			expect(list).toBeInTheDocument();
			expect(autocomplete).toHaveAttribute('aria-expanded', 'true');

			const item = pickByRole('option');
			expect(item).toBeInTheDocument();
			expect(checkFormat(values[0], item)).toBeTruthy();
		});

		test('callback function called when selecting an option', () => {
			const autocomplete = pickByRole('combobox');
			userEvent.type(autocomplete, 'aaa');

			const item = pickByText('AAAAAA');
			expect(item).toBeInTheDocument();
			fireEvent.click(item);
			expect(cb).toHaveBeenCalledWith(values[0]);
		});
	});

	describe('receiving searchService prop', () => {
		let pickByRole, pickByText;

		beforeEach(() => {
			const { getByRole, getByText } = formSetup({
				render: (
					<FFSearch
						name="accessible-search"
						label="Organisation"
						hint="Search by organisation name."
						searchService={searchService}
						keyValue="organisationName"
						callback={cb}
					/>
				),
			});
			pickByRole = getByRole;
			pickByText = getByText;
		});

		afterAll(() => {
			cleanup();
		});

		test('renders results correctly', async () => {
			const autocomplete = pickByRole('combobox');
			await userEvent.type(autocomplete, 'bbbb');

			const list = pickByRole('listbox');
			expect(list).toBeInTheDocument();
			expect(autocomplete).toHaveAttribute('aria-expanded', 'true');

			const item = pickByText('BBBBBB');
			expect(item).toBeInTheDocument();
		});

		test('callback function called after selection', async () => {
			const autocomplete = pickByRole('combobox');
			await userEvent.type(autocomplete, 'bbbb');

			const item = pickByRole('option');
			expect(item).toBeInTheDocument();
			expect(checkFormat(values[1], item)).toBeTruthy();
			fireEvent.click(item);
			expect(cb).toHaveBeenCalledWith(values[1]);
		});
	});
});
