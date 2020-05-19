import React from 'react';
import { Flex, P } from '@tpr/core';
import { Form, FFRadioButton } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Content } from '../../components/content';

const Type: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { trustee, loading } = current.context;

	const onSubmit = (values) => {
		send('SAVE', {
			values: {
				...values,
				isProfessionalTrustee:
					values.isProfessionalTrustee === 'yes' ? true : false,
			},
		});
	};

	return (
		<Content title="Type of trustee" loading={loading}>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					trusteeType: trustee.trusteeType,
					isProfessionalTrustee: trustee.isProfessionalTrustee ? 'yes' : 'no',
				}}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Flex cfg={{ flexDirection: 'column' }}>
							<P cfg={{ mb: 1, fontWeight: 3 }}>
								Select the option that best describes the type of trustee.
							</P>
							<FFRadioButton
								name="trusteeType"
								type="radio"
								value="member-nominated"
								label="Member-nominated trustee"
							/>
							<FFRadioButton
								name="trusteeType"
								type="radio"
								value="employer-appointed"
								label="Employer-appointed trustee"
							/>
							<FFRadioButton
								name="trusteeType"
								type="radio"
								value="regulator-appointed"
								label="Regulator-appointed trustee"
							/>
						</Flex>
						<P cfg={{ my: 1, fontWeight: 3 }}>
							Is this individual a professional trustee?
						</P>
						<Flex>
							<FFRadioButton
								name="isProfessionalTrustee"
								type="radio"
								value="yes"
								label="Yes"
							/>
							<Flex ml={1}>
								<FFRadioButton
									name="isProfessionalTrustee"
									type="radio"
									value="no"
									label="No"
								/>
							</Flex>
						</Flex>
						<Footer
							isDisabled={loading}
							onSave={{
								type: 'submit',
								title: 'Save and close',
							}}
						/>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Type;
