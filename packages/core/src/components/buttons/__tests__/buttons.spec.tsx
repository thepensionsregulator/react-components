import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Button } from '../';

describe('Button', () => {
	test('it renders correctly', () => {
		const { getByText } = render(<Button />);
		expect(getByText('button')).toBeInTheDocument();
	});
});
