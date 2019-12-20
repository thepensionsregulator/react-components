import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Toolbar } from '..';

describe('Toolbar', () => {
	test('it renders correctly', () => {
		const { getByText } = render(<Toolbar title="TPR" />);
		expect(getByText('TPR')).toBeInTheDocument();
	});
});
