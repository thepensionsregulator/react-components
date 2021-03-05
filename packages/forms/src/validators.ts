export const composeValidators = (...validators: any[]) => (...values: any[]) =>
	validators
		.filter(Boolean)
		.reduceRight(
			(error, validator) => error || validator(...values),
			undefined,
		);

export const validateEmail = (email: string) => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return String(email).length <= 50 && regex.test(String(email).toLowerCase());
};

export const validateUkPhone = (phone: string) => {
	const regex = /^(?=[\w\d\+\(])([a-zA-Z\d+\s()+.-]){10,20}$/;
	return regex.test(String(phone).slice().toLowerCase());
};

export const isEmailValid = (
	empty: string = 'email cannot be empty',
	invalid: string = 'Invalid email format',
	required: boolean = false,
) => (email: string) => {
	if (!email || email == '') {
		return required ? empty : undefined;
	} else {
		return validateEmail(email) ? undefined : invalid;
	}
};

export const isPhoneValid = (
	empty: string = 'phone number cannot be empty',
	invalid: string = 'Invalid phone number format',
	required: boolean = false,
) => (phone: string) => {
	if (!phone || phone == '') {
		return required ? empty : undefined;
	} else {
		return validateUkPhone(phone) ? undefined : invalid;
	}
};

export const executeClientValidation = (validate: Function | void) => (
	email: string,
	allValues: any,
) => validate && validate(email, allValues);
