import React from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { useEmployerContext } from '../../context';
import { ArrowButton } from '../../../../buttons/buttons';

const fields: FieldProps[] = [
	{
		type: 'radio',
		hint:
			"The employer who is named in the scheme's latest trust deed and rules and any subsequently amending deeds and usually has powers, eg the power to appoint trustees, amend the scheme rules or wind up the scheme.",
		name: 'employerType',
		value: 'principal',
		label: 'Principal',
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		hint:
			'An employer who is the principal employer but also has employees who can participate in the scheme.',
		name: 'employerType',
		value: 'principal-and-participating',
		label: 'Principal and participating employer',
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		hint: 'Any employer whose employees can participate in the scheme.',
		name: 'employerType',
		value: 'participating',
		label: 'Participating',
		cfg: { mb: 4 },
	},
];

export const EmployerType = () => {
	const { send } = useEmployerContext();

	function onSubmit(values) {
		send('SAVE', { values });
	}

	return (
		<Content
			type="employer"
			title="Type of employer"
			subtitle="A scheme can only have one principal employer at any point in time. Not all schemes will have a principal employer. If the employer type has defaulted to 'Participating’, but this employer is actually the principal employer, you will need to correct the employer recorded as principal before you can correct this employer."
		>
			<Form onSubmit={onSubmit} validate={validate(fields)}>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="up"
								iconSide="right"
								title="Save and close"
								type="submit"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
