import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Toolbar, Footer } from '../../components/card';
import { Loading } from '../../components/loader';
import { Form, validate, FFInputText } from '@tpr/forms';
import useLoading from '../../../../hooks/use-loading';

const Contacts: React.FC = () => {
	const [loading, setLoading] = useLoading();
	const { current, send, onSave } = useTrusteeContext();
	const state = current.context.trustee;

	const onSubmit = (values) => {
		setLoading(true);
		onSave({ ...state, ...values })
			.then(() => {
				setLoading(false);
				send('SAVE', { values });
			})
			.catch(() => {
				setLoading(false);
			});
	};

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			{loading && <Loading />}
			<Toolbar title="Contact details for this trustee" />
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: state.telephoneNumber,
					emailAddress: state.emailAddress,
				}}
				validate={validate([
					{
						name: 'telephoneNumber',
						error:
							'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
					},
					{
						name: 'emailAddress',
						error: 'Cannot be empty',
					},
				])}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Flex maxWidth="760px" flexDirection="column">
							<Flex maxWidth="300px">
								<FFInputText
									name="telephoneNumber"
									label="Telephone number"
									required
								/>
							</Flex>
							<FFInputText
								name="emailAddress"
								type="email"
								label="Email address"
								required
							/>
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
	);
};

export default Contacts;
