import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Header } from '../';

describe('Header', () => {
	test('it renders correctly', () => {
		const { getByText } = render(<Header title="TPR" />);
		expect(getByText('TPR')).toBeInTheDocument();
	});
});
