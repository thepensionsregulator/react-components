import React from 'react';
import { Flex, P, cardType } from '@tpr/core';
import { Form, FieldProps, renderFields } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { Breadcrumbs, BreadcrumbLink } from '../../../components/breadcrumbs';
import { ArrowButton } from '../../../../buttons/buttons';

const getDescriptionFields = ({ fields }: any): FieldProps[] => [
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'member-nominated',
		label: fields.trusteeType.labels.memberNominated,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'employer-appointed',
		label: fields.trusteeType.labels.employerAppointed,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'regulator-appointed',
		label: fields.trusteeType.labels.regulatorAppointed,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		name: 'trusteeType',
		value: 'other',
		label: fields.trusteeType.labels.other,
		cfg: { mb: 4 },
	},
];

const getIndividualFields = ({ fields }: any): FieldProps[] => [
	{
		type: 'radio',
		name: 'isProfessionalTrustee',
		value: 'yes',
		label: fields.isProfessionalTrustee.labels.isProfessionalTrusteeYes,
	},
	{
		type: 'radio',
		name: 'isProfessionalTrustee',
		value: 'no',
		label: fields.isProfessionalTrustee.labels.isProfessionalTrusteeNo,
		cfg: { ml: 3 },
	},
];

const getBreadcrumbLinks = ({ breadcrumbs }: any): BreadcrumbLink[] => [
	{
		to: 'BACK',
		underline: true,
		name: breadcrumbs.link1,
	},
	{
		name: breadcrumbs.link2,
		disabled: true,
	},
];

const Type: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const descriptionFields = getDescriptionFields(i18n.type);
	const individualFields = getIndividualFields(i18n.type);
	const breadcrumbLinks = getBreadcrumbLinks(i18n.type);
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
			type={cardType.trustee}
			title="Type of trustee"
			loading={loading}
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
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
							<ArrowButton
								intent="special"
								pointsTo="up"
								iconSide="right"
								type="submit"
								title="Save and close"
								disabled={loading}
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default Type;
