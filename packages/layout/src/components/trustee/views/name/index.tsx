import React from 'react';
import { Form, FFInputText } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';
import { Content } from '../../components/content';

const Name: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const state = current.context.trustee;

	const onSubmit = (values) => {
		send('NEXT', { values });
	};

	return (
		<Content title="Name of the trustee">
			<Form
				onSubmit={onSubmit}
				initialValues={{
					title: state.title,
					forename: state.forename,
					surname: state.surname,
				}}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FFInputText name="title" label="Title" inputWidth={1} />
						<FFInputText
							name="forename"
							label="First name"
							error="field is required"
							inputWidth={6}
						/>
						<FFInputText
							name="surname"
							label="Last name"
							error="field is required"
							inputWidth={6}
						/>
						<Footer
							onSave={{
								type: 'submit',
								title: 'Continue',
							}}
						/>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Name;
