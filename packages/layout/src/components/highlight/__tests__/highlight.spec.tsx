import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Highlight } from '../highlight';

describe('Highlight', () => {
	test('it renders correctly', () => {
		// const onClickSchemeOptions = jest.fn();
		// const onClickLogout = jest.fn();
		const { getByText } = render(<Highlight scheme="Alpha" title="Beta" />);

		expect(getByText('Scheme return')).toBeInTheDocument();
		expect(getByText('Alpha')).toBeInTheDocument();
		expect(getByText('Beta')).toBeInTheDocument();
	});
});
