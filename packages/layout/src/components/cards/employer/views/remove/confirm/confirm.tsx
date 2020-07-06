import React, { useState } from 'react';
import { Hr, Flex, P, H3, Link } from '@tpr/core';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { useEmployerContext } from '../../../context';
import { EmployerI18nProps } from '../../../i18n';
import { WarningBox } from '../../../../../warning/warning';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';

const getBreadcrumbLinks = (
	labels: EmployerI18nProps['remove']['confirm']['breadcrumbs'],
): BreadcrumbLink[] => [
	{
		to: 'BACK',
		underline: true,
		name: labels.link1,
	},
	{
		name: labels.link2,
		disabled: true,
	},
];

export const Confirm = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove, i18n } = useEmployerContext();
	const breadcrumbLinks = getBreadcrumbLinks(i18n.remove.confirm.breadcrumbs);
	const { employer, remove } = current.context;

	async function handleRemove() {
		setLoading(true);
		await onRemove(
			{
				schemeRoleId: employer.schemeRoleId,
				date: remove.date,
			},
			employer,
		)
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}

	return (
		<Content
			type="trustee"
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
		>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>{i18n.remove.confirm.title}</H3>
			<Hr cfg={{ my: 4 }} />
			<WarningBox>
				<P>{i18n.remove.confirm.dialog.message1}</P>
				<P cfg={{ my: 3 }}>{i18n.remove.confirm.dialog.message2}</P>
				<Flex>
					<ArrowButton
						intent="danger"
						pointsTo="right"
						iconSide="right"
						title={i18n.remove.confirm.buttons.remove}
						onClick={handleRemove}
						disabled={loading}
					/>
					<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
						{i18n.remove.confirm.buttons.cancel}
					</Link>
				</Flex>
			</WarningBox>
		</Content>
	);
};
