import React from 'react';

type SelectAddressProps = {
	testId?: string;
};

export const SelectAddress: React.FC<SelectAddressProps> = ({ testId }) => {
	return <p data-testid={testId + '-select-address'}>Select address</p>;
};
