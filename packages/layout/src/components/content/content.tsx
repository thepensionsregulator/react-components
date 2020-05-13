import React from 'react';
import { DocWidth, AppWidth, Flex, Link, H1, Hr, P } from '@tpr/core';
import { Sidebar } from '../sidebar/sidebar';

type PageHeadingProps = {
	title?: string;
	subtitle?: string;
	onClickBackGoTo?: (...args: any[]) => void;
};
export const PageHeading: React.FC<PageHeadingProps> = ({
	title,
	subtitle,
	onClickBackGoTo,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column' }}>
			{onClickBackGoTo && (
				<Flex cfg={{ mb: 3 }}>
					<Link underline onClick={onClickBackGoTo} children="◀︎ Back" />
				</Flex>
			)}
			<H1 cfg={{ mb: 2 }}>{title}</H1>
			<Hr cfg={{ mb: 3 }} />
			{subtitle && <P cfg={{ mb: 4, color: 'neutral.3' }}>{subtitle}</P>}
		</Flex>
	);
};

export const PageFooter: React.FC = () => {
	return (
		<Flex cfg={{ flex: '1 1 auto', flexDirection: 'column' }}>
			<Flex cfg={{ flex: '1 1 auto' }} />
			<Flex cfg={{ justifyContent: 'flex-end', mt: 3 }}>
				<Link underline onClick={() => {}} children="▲ Back to top" />
			</Flex>
		</Flex>
	);
};

/** NOTE: Sidebar will have to be converted into a function and rendered from that function
 * as it will take various params {probably}...
 */

interface PageProps extends PageHeadingProps {
	hasFooter?: boolean;
	hasSidebar?: boolean;
}
export const Page: React.FC<PageProps> = ({
	hasFooter = true,
	hasSidebar = true,
	title,
	subtitle,
	onClickBackGoTo,
	children,
}) => {
	return (
		<DocWidth>
			<AppWidth>
				<Flex cfg={{ flexDirection: hasSidebar ? 'row' : 'column' }}>
					{hasSidebar && <Sidebar />}
					<Flex cfg={{ flexDirection: 'column', flex: '1 1 auto', p: 3 }}>
						{title && (
							<PageHeading
								title={title}
								subtitle={subtitle}
								onClickBackGoTo={onClickBackGoTo}
							/>
						)}
						{children}
						{hasFooter && <PageFooter />}
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
