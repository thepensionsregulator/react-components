import React from 'react';

type PostcodeLookupProps = {
	testId?: string;
};

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({ testId }) => {
	return <p data-testid={testId + '-postcode-lookup'}>Postcode lookup</p>;
};
