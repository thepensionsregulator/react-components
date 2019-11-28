import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Header } from '../';

describe('Header', () => {
  test('it renders correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('header')).toBeInTheDocument();
  });
});
