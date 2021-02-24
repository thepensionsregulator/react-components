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
