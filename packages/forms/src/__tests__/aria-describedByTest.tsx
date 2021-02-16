export const CheckDescribedByTag = (
	inputElement: HTMLElement,
	errorElement: HTMLElement,
	name: string,
) => {
	const errorName = `${name}_error`;

	expect(errorElement).toBeInTheDocument();
	expect(errorElement).toHaveAttribute('id', errorName);
	expect(inputElement).toHaveAttribute('aria-invalid', 'true');
	expect(inputElement).toHaveAttribute('aria-describedby', errorName);
};
