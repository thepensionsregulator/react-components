import 'normalize.css';
import './fonts.css';
import React from 'react';
import resets from './resets.module.scss';
import editor from './richTextEditor.module.scss';

export const ThemeProvider: React.FC = ({ children }) => (
	<div className={resets.bodyreset}>{children}</div>
);

export const EditorFonts: React.FC = ({ children }) => {
	return <div className={editor.editorFontStack}>{children}</div>;
};
