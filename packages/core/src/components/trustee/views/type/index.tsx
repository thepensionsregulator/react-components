import React from 'react';
import { Flex } from '../../../layout';
import { P } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Toolbar } from '../../components/card';
import { Form, FFRadioButton } from '@tpr/forms';
import { Loading } from '../../components/loader';
import useLoading from '../../../../hooks/use-loading';

const Type: React.FC = () => {
	const [loading, setLoading] = useLoading(false);
	const { current, send, onSave } = useTrusteeContext();
	const { trustee } = current.context;

	async function onSubmit(values) {
		const isProfessionalTrustee =
			values.isProfessionalTrustee === 'yes' ? true : false;
		setLoading(true);
		await onSave({
			...trustee,
			address: values,
			isProfessionalTrustee,
		})
			.then(() => {
				send('SAVE', {
					values: {
						...values,
						isProfessionalTrustee,
					},
				});
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			{loading && <Loading />}
			<Flex flexDirection="column">
				<Toolbar title="Type of trustee" />
				<Form
					onSubmit={onSubmit}
					initialValues={{
						trusteeType: trustee.trusteeType,
						isProfessionalTrustee: trustee.isProfessionalTrustee ? 'yes' : 'no',
					}}
				>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Flex flexDirection="column">
								<P mb={0} fontWeight={3}>
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
							<P my={0} fontWeight={3}>
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
			</Flex>
		</Flex>
	);
};

export default Type;
