import React from 'react';
import { render } from '@testing-library/react';
import { Highlight } from '../highlight/highlight';

describe('Highlight', () => {
	test('it renders correctly', () => {
		const { getByText } = render(
			<Highlight title="Scheme return" name="Alpha" psr="12014314" />,
		);

		expect(getByText(/Scheme return/g)).toBeInTheDocument();
		expect(getByText('Alpha')).toBeInTheDocument();
		expect(getByText(/12014314/g)).toBeInTheDocument();
	});
});
