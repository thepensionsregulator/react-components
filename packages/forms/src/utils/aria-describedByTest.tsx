import { toKebabCase } from '@tpr/core';

export const CheckDescribedByTag = (
	getByText,
	inputElement: HTMLElement,
	errorText: string,
	hintText: string,
) => {
	const name = inputElement.getAttribute('name');
	const errorName = `${toKebabCase(name)}-error`;

	inputElement.focus();
	inputElement.blur();

	const errorElement = getByText(errorText);

	expect(errorElement).toBeInTheDocument();
	expect(errorElement).toHaveAttribute('id', errorName);

	var describedBy = errorName;
	if (hintText) {
		const hintName = hintText ? `${toKebabCase(name)}-hint` : '';
		const hintElement = hintText ? getByText(hintText) : null;
		expect(hintElement).toBeInTheDocument();
		expect(hintElement).toHaveAttribute('id', hintName);
		describedBy = `${hintName} ${errorName}`;
	}

	expect(inputElement).toHaveAttribute('aria-invalid', 'true');
	expect(inputElement).toHaveAttribute('aria-describedby', describedBy);
};
