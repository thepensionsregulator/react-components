import React from 'react';
import { Flex } from '../../../../layout';
import { useTrusteeContext } from '../../../context';
import { Toolbar, Footer } from '../../../components/card';
import { H4 } from '../../../../typography';
import { Form, FFRadioButton, FFInputDate } from '@tpr/forms';
import { FORM_ERROR } from 'final-form';

const RemoveReason: React.FC = () => {
	const { send } = useTrusteeContext();

	const onSubmit = values => {
		if (Object.keys(values).filter(key => key === 'reason').length !== 1) {
			return { [FORM_ERROR]: 'Please select one of the options.' };
		} else {
			send('SELECT');
			return undefined;
		}
	};

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Toolbar title="Remove this trustee" />
			<H4 fontWeight="bold" mb={0}>
				Why are you removing this trustee?
			</H4>
			<Form onSubmit={onSubmit}>
				{({ handleSubmit, submitError, form }) => {
					const leftScheme =
						form.getState().values.reason === 'left_the_scheme';
					return (
						<form onSubmit={handleSubmit}>
							<FFRadioButton
								name="reason"
								type="radio"
								label="They have left the scheme."
								value="left_the_scheme"
							/>
							{leftScheme && (
								<Flex my={1}>
									<FFInputDate
										name="date"
										label="Date the trustee left the scheme"
										hint="For example, 31 3 2019"
									/>
								</Flex>
							)}
							<FFRadioButton
								name="reason"
								type="radio"
								label="They were never part of the scheme."
								value="not_part_of_scheme"
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
					);
				}}
			</Form>
		</Flex>
	);
};

export default RemoveReason;
