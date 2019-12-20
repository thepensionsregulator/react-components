import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Button } from '../';

describe('Button', () => {
	test('it renders correctly', () => {
		const { container } = render(<Button />);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<button
		  class="sc-bdVaJa cksgKV"
		  type="button"
		>
		  <span />
		</button>
	`);
	});
});
