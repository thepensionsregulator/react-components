import React from 'react';
import { Flex, P } from '@tpr/core';
import { Form, FieldProps, renderFields } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer, FooterButton } from '../../../components/card';
import { Content } from '../../../components/content';
import { Breadcrumbs, BreadcrumbLink } from '../../../components/breadcrumbs';

const descriptionFields: FieldProps[] = [
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'member-nominated',
		label: 'Member-nominated trustee',
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'employer-appointed',
		label: 'Employer-appointed trustee',
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'regulator-appointed',
		label: 'Regulator-appointed trustee',
		cfg: { mb: 4 },
	},
];

const individualFields: FieldProps[] = [
	{
		type: 'radio',
		name: 'isProfessionalTrustee',
		value: 'yes',
		label: 'Yes',
	},
	{
		type: 'radio',
		name: 'isProfessionalTrustee',
		value: 'no',
		label: 'No',
		cfg: { ml: 3 },
	},
];

const breadcrumbLinks: BreadcrumbLink[] = [
	{
		to: 'BACK',
		underline: true,
		name: 'Name of the trustee',
	},
	{
		name: 'Type of trustee',
		disabled: true,
	},
];

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
		<Content
			type="trustee"
			title="Type of trustee"
			loading={loading}
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} />}
		>
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
							{renderFields(descriptionFields)}
						</Flex>
						<P cfg={{ my: 1, fontWeight: 3 }}>
							Is this individual a professional trustee?
						</P>
						<Flex>{renderFields(individualFields)}</Flex>
						<Footer>
							<FooterButton
								disabled={loading}
								type="submit"
								title="Save and close"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Type;
