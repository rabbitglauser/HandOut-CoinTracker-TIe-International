import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

/**
 * This test checks if the 'learn react' link is rendered
 * on the screen when the App component is rendered.
 */
test('renders learn react link', () => {
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
