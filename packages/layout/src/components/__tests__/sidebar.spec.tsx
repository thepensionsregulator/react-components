import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
	Sidebar,
	SidebarSectionProps,
	useCalculateProgress,
} from '../sidebar/sidebar';
import { axe } from 'jest-axe';

const s1: SidebarSectionProps = {
	title: 'Scheme details',
	links: [
		{
			name: 'Scheme name and address',
			completed: true,
			onClick: link => alert(`You clicked on ${link.path}`),
			path: '/scheme-name-and-address',
		},
		{
			name: 'Scheme status and membership',
			onClick: link => alert(`You clicked on ${link.path}`),
			path: '/scheme-status-and-membership',
		},
		{
			name: 'Consent to electronic communication',
			onClick: link => alert(`You clicked on ${link.path}`),
			path: '/consent-to-electronic-communication',
		},
	],
	order: 1,
};
const s2: SidebarSectionProps = {
	title: 'Roles',
	links: [
		{
			name: 'Trustee details',
			completed: true,
			active: () => true,
			path: '/trustee-details',
		},
		{ name: 'Employer details', path: '/employer-details' },
		{
			name: 'Service provider details',
			path: '/service-provider-details',
		},
		{
			name: 'Named contact details',
			completed: true,
			path: '/name-contact-details',
		},
	],
	order: 2,
};
const s3: SidebarSectionProps = {
	title: 'Finish up',
	links: [
		{
			name: 'Review and submit',
			completed: false,
			disabled: true,
			path: '/review-and-submit',
		},
	],
	order: 3,
};

const sections = [s1, s2, s3];

describe('Sidebar', () => {
	test('is accessible', async () => {
		const { container } = render(
			<Sidebar
				title="Scheme return home"
				sections={sections}
				matchPath={() => {}}
				location={{}}
				history={{ push: () => {} }}
			/>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('renders main header title', () => {
		const title = 'Scheme return home';
		const { getByText } = render(
			<Sidebar
				title={title}
				sections={sections}
				matchPath={() => {}}
				location={{}}
				history={{ push: () => {} }}
			/>,
		);
		expect(getByText(title)).toBeInTheDocument();
		expect(true).toBeTruthy();
	});

	test('calculates and displays progress correctly', () => {
		const title = 'Scheme return home';
		const { getByText } = render(
			<Sidebar
				title={title}
				sections={sections}
				matchPath={() => {}}
				location={{}}
				history={{ push: () => {} }}
			/>,
		);

		const progressText = getByText(content => content.startsWith('Progress'));
		const [currentProgress, totalProgress] = progressText.textContent
			.split(' ')
			.map(value => parseInt(value))
			.filter(Boolean);

		const { result } = renderHook(() => useCalculateProgress(sections));
		const [totalSections, totalCompleted] = result.current;

		expect(currentProgress).toEqual(totalCompleted.length);
		expect(totalProgress).toEqual(totalSections.length);
	});

	test('each section title is visible', () => {
		const title = 'Scheme return home';
		const { getByText } = render(
			<Sidebar
				title={title}
				sections={sections}
				matchPath={() => {}}
				location={{}}
				history={{ push: () => {} }}
			/>,
		);

		[s1.title, s2.title, s3.title].map(title => {
			expect(getByText(title)).toBeInTheDocument();
		});
	});

	test('each section link name is visible', () => {
		const title = 'Scheme return home';
		const { getByText } = render(
			<Sidebar
				title={title}
				sections={sections}
				matchPath={() => {}}
				location={{}}
				history={{ push: () => {} }}
			/>,
		);

		[...s1.links, ...s2.links, ...s3.links].map(link => {
			expect(getByText(link.name)).toBeInTheDocument();
		});
	});

	test('useCalculateProgress calculates values as expected', () => {
		const { result } = renderHook(() => useCalculateProgress(sections));
		const [totalSections, totalCompleted] = result.current;

		expect(totalCompleted.length).toMatchInlineSnapshot(`3`);
		expect(totalSections.length).toMatchInlineSnapshot(`8`);
	});
});
