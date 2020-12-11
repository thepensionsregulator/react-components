import React from 'react';
import { Button, Link } from '../buttons/buttons';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Buttons', () => {
	test('Button are accessible', async () => {
		const { container } = render(<Button testId="btn">Click me</Button>);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Button renders correctly and accepts testId prop', () => {
		const { getByTestId } = render(<Button testId="btn">Click me</Button>);
		expect(getByTestId(/btn/i)).toBeDefined();
	});

	test('Button can be type of button or submit', () => {
		const { rerender, getByTestId } = render(
			<Button testId="btn">Click me</Button>,
		);
		expect(getByTestId(/btn/i)).toBeDefined();
		expect(getByTestId(/btn/i).getAttribute('type')).toEqual('button');
		rerender(
			<Button type="submit" testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i).getAttribute('type')).toEqual('submit');
	});

	test('Button can be in a loading state', () => {
		const { rerender, getByTestId, getByText } = render(
			<Button disabled testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i)).toBeDefined();
		expect(getByTestId(/btn/i).getAttribute('disabled')).toBeDefined();
		rerender(
			<Button loading testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i).getAttribute('disabled')).toBeDefined();
		expect(getByText('Loading...')).toBeDefined();
	});

	test('Button accepts a custom className', () => {
		const className = 'some-weird-class-name-here';
		const { getByTestId } = render(
			<Button className={className} testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId('btn').className.includes(className)).toBeTruthy();
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-primary intent-none size-medium some-weird-class-name-here"`,
		);
	});

	test('Button accepts a space props on cfg attr', () => {
		const { getByTestId } = render(
			<Button cfg={{ m: 2, pb: 3 }} testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i)).toBeDefined();
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-primary intent-none size-medium m-2 pb-3"`,
		);
	});

	test('Button can be of a different size', () => {
		const { rerender, getByTestId } = render(
			<Button size="small" testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i)).toBeDefined();
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-primary intent-none size-small"`,
		);
		rerender(
			<Button size="large" testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-primary intent-none size-large"`,
		);
	});

	test('Button can be of a different intent', () => {
		const { rerender, getByTestId } = render(
			<Button intent="danger" testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i)).toBeDefined();
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-primary intent-danger size-medium"`,
		);
		rerender(
			<Button intent="success" testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-primary intent-success size-medium"`,
		);
	});

	test('Button can be of a different appearance', () => {
		const { getByTestId } = render(
			<Button appearance="outlined" testId="btn">
				Click me
			</Button>,
		);
		expect(getByTestId(/btn/i)).toBeDefined();
		expect(getByTestId('btn').className).toMatchInlineSnapshot(
			`"button appearance-outlined intent-none size-medium"`,
		);
	});
});


describe('Links', () => {
	test('Link with button appearance', () => {
		const { getByTestId } = render(
			<Link 
				testId="link-anchor"
				anchorTag={true}
				buttonAppearance={true}
				href="http://www.google.com"
				target="_blank"
			>Home</Link>
		);
		expect(getByTestId('link-anchor')).toBeDefined();
		expect(getByTestId('link-anchor')).toHaveAttribute('href');
		expect(getByTestId('link-anchor')).toHaveAttribute('target');
	});
});
