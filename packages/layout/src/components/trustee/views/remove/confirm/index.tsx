import React from 'react';
import { H3, P, Hr, Link } from '@tpr/core';
import { useTrusteeContext } from '../../../context';
import { Footer, FooterButton } from '../../../components/card';
import { Content } from '../../../components/content';
import { Breadcrumbs, BreadcrumbLink } from '../../../components/breadcrumbs';

const breadcrumbLinks: BreadcrumbLink[] = [
	{
		to: 'BACK',
		underline: true,
		name: 'Remove this trustee',
	},
	{
		name: 'Are you sure...?',
		disabled: true,
	},
];

const RemoveConfirm: React.FC = () => {
	const { current, send, onRemove } = useTrusteeContext();
	const { leftTheScheme } = current.context;

	return (
		<Content breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} />}>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>
				Are you sure you want to remove this trustee?
			</H3>
			<Hr cfg={{ my: 3 }} />
			<P cfg={{ color: 'neutral.3' }}>This can't be undone.</P>
			<Footer>
				<FooterButton
					title="Remove"
					intent="danger"
					onClick={() => {
						onRemove({
							id: 'trustee_id_here',
							reason: {
								leftTheScheme: leftTheScheme ? true : false,
								date: leftTheScheme,
							},
						});
					}}
				/>
				<Link cfg={{ m: 3 }} onClick={() => send('CANCEL')} underline>
					Cancel
				</Link>
			</Footer>
		</Content>
	);
};

export default RemoveConfirm;
