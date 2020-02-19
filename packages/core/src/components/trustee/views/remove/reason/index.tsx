import React from 'react';
import { Flex } from '../../../../layout';
import { useTrusteeContext } from '../../../context';
import { Toolbar, Footer } from '../../../components/card';
import { H4 } from '../../../../typography';
import { Form, Field, RadioButton, FFRadioButton } from '@tpr/forms';
import { FORM_ERROR } from 'final-form';

const RemoveReason: React.FC = () => {
	const { send } = useTrusteeContext();

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Toolbar title="Remove this trustee" />
			<H4 fontWeight="bold">Why are you removing this trustee?</H4>
			<Form
				onSubmit={values => {
					if (Object.keys(values).length !== 1) {
						return { [FORM_ERROR]: 'Please select one of the options.' };
					} else {
						send('SELECT');
					}
				}}
			>
				{({ handleSubmit, submitError }) => (
					<form onSubmit={handleSubmit}>
						<Field
							name="reason"
							label="They have left the scheme."
							type="radio"
							value="left_the_scheme"
							render={({ label, input }: any) => {
								return (
									<RadioButton
										name={input.name}
										label={label}
										value={input.value}
										checked={input.checked}
										onChange={evt => {
											console.log(evt.target.value);
											input.onChange(evt);
										}}
									/>
								);
							}}
						/>
						<Field
							name="reason"
							label="They were never part of the scheme."
							type="radio"
							value="not_part_of_scheme"
							render={({ label, input }: any) => {
								return (
									<RadioButton
										name={input.name}
										label={label}
										value={input.value}
										checked={input.checked}
										onChange={evt => {
											console.log(evt.target.value);
											input.onChange(evt);
										}}
									/>
								);
							}}
						/>
						{submitError && (
							<Flex color="danger.200" pt={1}>
								{submitError}
							</Flex>
						)}
						<Footer
							onContinue={{
								type: 'submit',
								title: 'Continue',
							}}
						/>
					</form>
				)}
			</Form>
		</Flex>
	);
};

export default RemoveReason;
