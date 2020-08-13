export const composeValidators = (...validators: any[]) => (...values: any[]) =>
	validators
		.filter(Boolean)
		.reduceRight(
			(error, validator) => error || validator(...values),
			undefined,
		);

export const validateEmail = (email: string) => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
};

export const validateUkPhone = (phone: string) => {
	const regex = /^(?=\w*\d)([a-zA-Z\d+\s()+.-]){10,20}$/; 
	return regex.test(String(phone).slice().toLowerCase());
};

export const isEmailValid = (
	errorMessage: string = 'Invalid email address',
) => (email: string) => (validateEmail(email) ? undefined : errorMessage);

export const isPhoneValid = (errorMessage: string = 'Invalid phone number') => (
	phone: string,
) => (validateUkPhone(phone) ? undefined : errorMessage);

export const executeClientValidation = (validate: Function | void) => (
	email: string,
	allValues: any,
) => validate && validate(email, allValues);
