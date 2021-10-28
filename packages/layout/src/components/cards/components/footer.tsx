import React from 'react';
import { Flex, Hr } from '@tpr/core';
import { Checkbox } from '@tpr/forms';

interface ICardFooterProps {
	complete: boolean;
	onChange: any;
	label: string;
}

export const CardFooter: React.FC<ICardFooterProps> = React.memo(
	({ complete, onChange, label }) => {
		return (
			<Flex cfg={{ flexDirection: 'column' }}>
				<Hr cfg={{ my: 4 }} />
				<Checkbox
					value={complete}
					checked={complete}
					onChange={onChange}
					label={label}
				/>
			</Flex>
		);
	},
);
