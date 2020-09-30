import React, { useState } from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { Link, Flex } from '@tpr/core';
import { useInsurerContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { InsurerI18nProps } from '../../i18n';
import { cardType, RecursivePartial } from '../../../common/interfaces';

const getFields = (
	fields: RecursivePartial<InsurerI18nProps['reference']['fields']>,
): FieldProps[] => [
	{
		type: 'text',
		name: 'insurerCompanyReference',
		label: fields.insurerCompanyReference.label,
		inputWidth: 5,
		error: (value: string) => {
			if (!value) {
				return fields.insurerCompanyReference.errorIfEmpty;
			} else if (value.length < 1) {
				return fields.insurerCompanyReference.errorIfTooShort;
			} else if (value.length > 100) {
				return fields.insurerCompanyReference.errorIfTooLong;
			}
			return undefined;
		},
		cfg: { mb: 3 },
	},
];

export const Reference: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveRef } = useInsurerContext();
	const { insurer } = current.context;
	const fields = getFields(i18n?.reference?.fields);

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			await onSaveRef(values, insurer);
			send('SAVE', { values });
			setLoading(false);
		} catch (error) {
			// todo: maybe an error message from the server?
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<Content
			type={cardType.insurer}
			title={i18n.reference.title}
			subtitle={i18n.reference.subtitle}
			loading={false}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					insurerCompanyReference: insurer.insurerCompanyReference,
				}}
				validate={validate(fields)}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
						<Footer>
							<Flex>
								<ArrowButton
									intent="special"
									pointsTo="up"
									iconSide="right"
									type="submit"
									title="Save and close"
									disabled={loading}
								/>

								<Link
									cfg={{ m: 3 }}
									disabled={loading}
									underline
									onClick={() => send('CANCEL')}
								>
									Cancel
								</Link>
							</Flex>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
