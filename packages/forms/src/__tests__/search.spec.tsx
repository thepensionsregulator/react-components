import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFSearch } from '../elements/search/search';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

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

const cb = jest.fn();

describe('Search input', () => {
  test('renders input', async () => {
    const { getByRole, getByText } = formSetup({
			render: (
				<FFSearch
          name="accessible-search"
          label="Organisation"
          hint="Search by organisation name."
          optionsArray={values}
          keyValue="organisationName"
          inputWidth={5}
          callback={cb}
        />
			),
		});
		const autocomplete = getByRole('combobox');
		expect(autocomplete).toBeInTheDocument();
    expect(autocomplete).toHaveAttribute('aria-owns');
    expect(autocomplete).toHaveAttribute('aria-autocomplete');
    expect(autocomplete).toHaveAttribute('aria-describedby');
    expect(autocomplete).toHaveAttribute('aria-expanded');

    const hint = getByText('Search by organisation name.');
		expect(hint).toBeInTheDocument();

    const label = getByText('Organisation');
		expect(label).toBeInTheDocument();
  });
  
  test('renders results correctly', async () => {
    const { getByRole, getByText } = formSetup({
			render: (
				<FFSearch
          name="accessible-search"
          label="Organisation"
          hint="Search by organisation name."
          optionsArray={values}
          keyValue="organisationName"
          inputWidth={5}
          callback={cb}
        />
			),
		});
		const autocomplete = getByRole('combobox');
		userEvent.type(autocomplete, 'aaa');

    const list = getByRole('listbox');
		expect(list).toBeInTheDocument();
    expect(autocomplete).toHaveAttribute('aria-expanded', "true");

    const item = getByText('AAAAAA');
    expect(item).toBeInTheDocument();
  });
  
  test('callback function called when selecting an option', async () => {
    const { getByRole, getByText } = formSetup({
			render: (
				<FFSearch
          name="accessible-search"
          label="Organisation"
          hint="Search by organisation name."
          optionsArray={values}
          keyValue="organisationName"
          inputWidth={5}
          callback={cb}
        />
			),
		});
		const autocomplete = getByRole('combobox');
		userEvent.type(autocomplete, 'aaa');

    const item = getByText('AAAAAA');
    expect(item).toBeInTheDocument();
		fireEvent.click(item);
    expect(cb).toHaveBeenCalledWith(values[0]);
  });
});
