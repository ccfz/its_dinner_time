import React from 'react';
import { render, screen } from '@testing-library/react';

import App from 'components/App';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);

    expect(
      screen.getByText('Hello World this is a React RoR Boilerplate')
    ).toBeTruthy();
  });
})