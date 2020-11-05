import React from 'react';

type EditAddressProps = {
	testId?: string;
};

export const EditAddress: React.FC<EditAddressProps> = ({ testId }) => {
	return <p data-testid={testId + '-edit-address'}>Edit address</p>;
};
