import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import QuoteList from './QuoteList';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('QuoteList Component', () => {
  const mockQuotes = [
    {
      id: 1,
      content: 'Test quote 1',
      author: 'Test Author 1',
      dateAdded: '2024-01-01'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: mockQuotes });
  });

  test('renders loading state and then quotes', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <QuoteList />
      </I18nextProvider>
    );

    // Initially shows loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for quotes to load
    await act(async () => {
      await Promise.resolve();
    });

    // Check if quote content is displayed
    expect(screen.getByText('Test quote 1')).toBeInTheDocument();
  });

  test('can add a new quote', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <QuoteList />
      </I18nextProvider>
    );

    // Wait for component to load
    await act(async () => {
      await Promise.resolve();
    });

    // Fill in the form
    const quoteInput = screen.getByLabelText(/quote text/i);
    const authorInput = screen.getByLabelText(/author/i);
    
    await act(async () => {
      fireEvent.change(quoteInput, { target: { value: 'New quote' } });
      fireEvent.change(authorInput, { target: { value: 'New Author' } });
      fireEvent.submit(screen.getByRole('form'));
    });

    // Verify API was called
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  test('shows error message on API failure', async () => {
    // Mock API error
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <I18nextProvider i18n={i18n}>
        <QuoteList />
      </I18nextProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    // Check if error message is shown
    expect(screen.getByText(/failed to fetch quotes/i)).toBeInTheDocument();
  });
}); 