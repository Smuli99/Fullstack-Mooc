import React from 'react';
import { test, describe, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from '../components/Togglable';

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    );
  });

  test('renders its children', () => {
    screen.getByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content');
    expect(element).not.toBeVisible();
  });

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const element = screen.getByText('togglable content');
    expect(element).toBeVisible();
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();

    let button = screen.getByText('show...');
    await user.click(button);

    button = screen.getByText('cancel');
    await user.click(button);

    const element = screen.getByText('togglable content');
    expect(element).not.toBeVisible();
  });
});