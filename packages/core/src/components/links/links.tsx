import React from 'react';
import {
	SpaceProps,
	ColorProps,
	TypographyProps,
	LayoutProps,
} from '../globals/globals';
import { useClassNames } from '../../hooks/use-class-names';
import { Span } from '../typography/typography';
import styles from './links.module.scss';

export interface LinkProps {
	cfg?: SpaceProps & ColorProps & TypographyProps & LayoutProps;
	className?: string;
	underline?: boolean;
	testId?: string;
	taskList?: boolean;
	hint?: string;
	hintCfg?: SpaceProps & ColorProps & TypographyProps & LayoutProps;
	hintId?: string;
	[key: string]: any;
}

const defaultHintId = 'cancelHint';

export const Link: React.FC<LinkProps> = ({
	cfg: globalStyles,
	underline = false,
	className,
	testId,
	taskList = false,
	hint,
	hintCfg,
	hintId = defaultHintId,
	children,
	...props
}) => {
	const classNames = useClassNames(globalStyles, [
		styles.link,
		{ [styles['link-underline']]: underline },
		className,
	]);

	let anchorProps = {
		'data-testid': testId,
		className: classNames,
		href: props.href ? props.href : '#',
		onClick: null,
		'aria-describedby': hint ? hintId : null,
		...props,
	};

	if (props.onClick && (!props.href || taskList)) {
		anchorProps.onClick = function (e) {
			e.preventDefault();
			props.onClick();
		};
	}

	const Anchor: React.FC = () =>
		React.createElement('a', anchorProps, children);

	return (
		<>
			<Anchor />
			{hint && (
				<Span className={styles.hint} id={hintId} cfg={{ ...hintCfg }}>
					{hint}
				</Span>
			)}
		</>
	);
};
