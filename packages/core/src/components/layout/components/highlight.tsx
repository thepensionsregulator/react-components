import React from 'react';
import styled from 'styled-components';
import { DocWidth, AppWidth, Flex } from './globals';
import { color, ColorProps } from 'styled-system';
import { P } from '../../typography';

type HighlightProps = {
	title: string;
	scheme: string;
	testId?: string;
};

const LeftBackground = styled('div')<ColorProps>`
	position: absolute;
	left: 0;
	width: 50%;
	height: 100%;
	background: red;
	z-index: 0;
	${color}
`;

export const Highlight: React.FC<HighlightProps> = ({
	title = '',
	scheme = '',
	testId,
}) => {
	return (
		<DocWidth justifyContent="center" bg="accents.400">
			<LeftBackground bg="accents.300" />
			<AppWidth zIndex={1}>
				<Flex
					data-testid={testId}
					flex="0 0 auto"
					height="50px"
					width="100%"
					bg="accents.300"
					color="white"
				>
					<Flex
						flex="0 0 auto"
						width="240px"
						alignItems="center"
						justifyContent="left"
						borderTop="1px solid"
						borderColor="accents.200"
					>
						<P fontWeight={3}>Scheme return</P>
					</Flex>
					<Flex
						flex="1 1 auto"
						alignItems="center"
						justifyContent="space-between"
						bg="accents.400"
					>
						<P fontWeight={3} px={3}>
							{title}
						</P>
						<Flex
							borderLeft="2px solid"
							height="70%"
							alignItems="center"
							borderColor="accents.200"
							pl={2}
						>
							<P fontWeight={3}>PSR: {scheme}</P>
						</Flex>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
