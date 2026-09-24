import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '../components/NoteForm';
import { expect, test, describe, vi } from 'vitest';

describe('<NoteForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup();
    const createNote = vi.fn();

    render(<NoteForm createNote={createNote} />);

    const input = screen.getByRole('textbox');
    const sendButton = screen.getByText('save');

    await user.type(input, 'testing a form...');
    await user.click(sendButton);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
  });
});