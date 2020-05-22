import React from 'react';
import style from './sidebar.module.scss';

type SidebarProps = {};
export const Sidebar: React.FC<SidebarProps> = () => {
	return <div className={style.sidebar}>sidebar</div>;
};
