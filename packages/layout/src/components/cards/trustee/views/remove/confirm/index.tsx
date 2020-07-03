import React, { useState } from 'react';
import { H3, H4, P, Hr, Link, Flex } from '@tpr/core';
import { useTrusteeContext } from '../../../context';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { WarningBox } from '../../../../../warning/warning';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';

const getBreadcrumbLinks = ({ link1, link2 }): BreadcrumbLink[] => [
	{
		to: 'BACK',
		underline: true,
		name: link1,
	},
	{
		name: link2,
		disabled: true,
	},
];

const RemoveConfirm: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove, i18n } = useTrusteeContext();
	const breadcrumbLinks = getBreadcrumbLinks(i18n.remove.confirm.breadcrumbs);
	const { trustee, remove } = current.context;

	function handleRemove() {
		setLoading(true);
		onRemove(
			{
				schemeRoleId: trustee.schemeRoleId,
				...remove,
			},
			trustee,
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
			<H4 cfg={{ mt: 3, color: 'neutral.5' }}>Edit trustee</H4>
			<H3 cfg={{ fontWeight: 2 }}>{i18n.remove.confirm.title}</H3>
			<Hr cfg={{ my: 4 }} />
			<WarningBox>
				<P cfg={{ mt: 3, mb: 6 }}>{i18n.remove.confirm.subtitle}</P>
				<Flex>
					<ArrowButton
						intent="danger"
						pointsTo="right"
						iconSide="right"
						disabled={loading}
						onClick={handleRemove}
						title={i18n.remove.confirm.buttons.remove}
					/>
					<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
						{i18n.remove.confirm.buttons.cancel}
					</Link>
				</Flex>
			</WarningBox>
		</Content>
	);
};

export default RemoveConfirm;
