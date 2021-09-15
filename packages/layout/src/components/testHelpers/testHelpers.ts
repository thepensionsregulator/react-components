import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

export const assertThatButtonHasAriaExpanded = (
	findByText: any,
	buttonText: string,
	expectedAriaExpandedValue,
) => {
	expect(
		(findByText(buttonText) as HTMLElement).closest('button'),
	).toHaveAttribute('aria-expanded', expectedAriaExpandedValue.toString());
};

export const assertThatButtonHasBeenRemovedFromTheTabFlow = (
	findByText: any,
	buttonText: string,
) => {
	expect(
		(findByText(buttonText) as HTMLElement).closest('button'),
	).toHaveAttribute('tabIndex', '-1');
};

export const assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged = async (
	component: any,
	originalName: any,
	updatedName: any,
) => {
	const results = await axe(component);
	expect(results).toHaveNoViolations();

	expect(updatedName.title).toBeNull();
	expect(updatedName.firstName).toEqual(originalName.firstName);
	expect(updatedName.lastName).toEqual(originalName.lastName);
};

export const assertThatASectionExistsWithAnAriaLabel = (
	findByRole,
	expectedAriaLabel,
) => {
	const section = findByRole('region');
	expect(section).toBeDefined();
	expect(section).toHaveAttribute('aria-label', expectedAriaLabel);
};

export const clearTitleField = (findByText: any) => {
	var titleInput = (findByText('Title (optional)') as HTMLElement).nextSibling
		.firstChild as HTMLElement;
	expect(titleInput).toBeDefined();
	userEvent.clear(titleInput);
};

//  Card Headings

export const assertMainHeadingExists = (
	findByText: any,
	findByTestId: any,
	heading: string,
	isButton: boolean,
) => {
	expect(findByText(heading)).toBeDefined();
	expect(
		findByTestId(isButton ? 'card-main-heading-button' : 'card-main-heading'),
	).toBeDefined();
	isButton && assertThatButtonHasAriaExpanded(findByText, heading, false);
};

export const assertRemoveButtonExists = (
	findByText: any,
	findByTestId: any,
) => {
	expect(findByText('Remove')).toBeDefined();
	expect(findByTestId('card-not-heading')).toBeDefined();
	assertThatButtonHasAriaExpanded(findByText, 'Remove', false);
};

export const assertHeadingButtonsExist = (
	findAllByTestId: any,
	findByText: any,
	buttons: string[],
) => {
	const cardButtons = findAllByTestId('card-heading-button');
	expect(cardButtons).toBeDefined();
	expect(cardButtons.length).toBe(buttons.length);
	if (buttons.length > 0) {
		for (let i = 0; i < buttons.length; i++) {
			expect(cardButtons[i]).toHaveTextContent(buttons[i]);
			assertThatButtonHasAriaExpanded(findByText, buttons[i], false);
		}
	}
};

export const assertHeadingsExist = (
	findAllByTestId: any,
	headings: string[],
) => {
	const cardHeadings = findAllByTestId('card-heading');
	expect(cardHeadings).toBeDefined();
	expect(cardHeadings.length).toBe(headings.length);
	if (headings.length > 0) {
		for (let i = 0; i < headings.length; i++) {
			expect(cardHeadings[i]).toHaveTextContent(headings[i]);
		}
	}
};
