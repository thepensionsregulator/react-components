import React from 'react';
import { SVGProps } from '../types';
import { SVG } from '../global';

export const ArrowUp: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-up" {...props}>
			<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const ArrowDown: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-down" {...props}>
			<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
			<path d="M0 0h24v24H0V0z" fill="none" />
		</SVG>
	);
};

export const ArrowLeft: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-left" {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
		</SVG>
	);
};

export const ArrowRight: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-right" {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
		</SVG>
	);
};
