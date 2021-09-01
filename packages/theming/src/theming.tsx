import 'normalize.css';
import './fonts.css';
import React from 'react';
import resets from './resets.module.scss';
import editor from './richTextEditor.module.scss';

export const CssResets: React.FC = ({ children }) => (
	<div className={resets.bodyreset}>{children}</div>
);

export const EditorFonts: React.FC = ({ children }) => {
	return <div className={editor.editorFontStack}>{children}</div>;
};

export const getBreakpoint = () => {
	let fontSizeMatch = window
			.getComputedStyle(document.body)
			.getPropertyValue('font-size')
			.match(/\d+/),
		break1em = 48,
		break2em = 64,
		break3em = 90,
		break4em = 114,
		breakpoint = '';

	if (!fontSizeMatch || fontSizeMatch.length < 1) {
		return '';
	}

	let width = window.innerWidth / Number(fontSizeMatch[0]);

	if (width < break1em) {
		breakpoint = '1. < ' + break1em + 'em';
	} else if (width >= break1em && width < break2em) {
		breakpoint = '2. ' + break1em + 'em - ' + break2em + 'em';
	} else if (width >= break2em && width < break3em) {
		breakpoint = '3. ' + break2em + 'em - ' + break3em + 'em';
	} else if (width >= break3em && width < break4em) {
		breakpoint = '4. ' + break3em + 'em - ' + break4em + 'em';
	} else if (width >= break4em) {
		breakpoint = '5. >= ' + break4em + 'em';
	}
	return breakpoint;
};
