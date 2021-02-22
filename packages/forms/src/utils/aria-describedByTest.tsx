export const CheckDescribedByTag = (
	getByText,
	inputElement: HTMLElement,
	errorText: string,
) => {
	const name = inputElement.getAttribute('name');
	const errorName = `${name}-error`;

	inputElement.focus();
	inputElement.blur();

	const errorElement = getByText(errorText);

	expect(errorElement).toBeInTheDocument();
	expect(errorElement).toHaveAttribute('id', errorName);
	expect(inputElement).toHaveAttribute('aria-invalid', 'true');
	expect(inputElement).toHaveAttribute('aria-describedby', errorName);
};
