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

export const clearTitleField = (findByText: any) => {
	var titleInput = (findByText('Title (optional)') as HTMLElement).nextSibling
		.firstChild as HTMLElement;
	expect(titleInput).toBeDefined();
	userEvent.clear(titleInput);
};
