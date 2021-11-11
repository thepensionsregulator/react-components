import React from 'react';
import { render } from '@testing-library/react';
import { HelpLink } from '../helplink/helplink';
import { axe } from 'jest-axe';
import { formSetup } from '@tpr/forms';

describe('HelpLink', () => {
	test('displays title', () => {
		const renderOutput = render(
			<HelpLink title="HelpLink Title">This is some HelpLink content</HelpLink>,
		);
		expect(renderOutput.container.textContent).toContain('HelpLink Title');
	});
	test('display content', () => {
		const renderOutput = render(
			<HelpLink title="HelpLink Title">This is some HelpLink content</HelpLink>,
		);
		expect(renderOutput.container.textContent).toContain(
			'This is some HelpLink content',
		);
	});
	test('uses type=button', async () => {
		const renderOutput = render(
			<HelpLink title="HelpLink Title">This is some HelpLink content</HelpLink>,
		);
		const button = await renderOutput.findByText('HelpLink Title');
		expect(button).toHaveAttribute('type', 'button');
	});
	test('passes accessibility checks', async () => {
		const { container } = formSetup({
			render: (
				<HelpLink title="HelpLink Title">
					This is some HelpLink content
				</HelpLink>
			),
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
