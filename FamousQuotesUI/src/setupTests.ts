import '@testing-library/jest-dom';
import i18n from './i18n';
import { initReactI18next } from 'react-i18next';

// Initialize i18n for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  resources: {
    en: {
      translation: {
        app: {
          title: 'Famous Quotes',
          addNewQuote: 'Add New Quote',
          quoteText: 'Quote Text',
          author: 'Author',
          add: 'Add',
          delete: 'Delete',
          loading: 'Loading...',
          error: {
            fetch: 'Failed to fetch quotes. Please make sure the API is running.',
            add: 'Failed to add quote. Please try again.',
            delete: 'Failed to delete quote. Please try again.'
          },
          success: {
            add: 'Quote added successfully!',
            delete: 'Quote deleted successfully!'
          }
        }
      }
    }
  }
}); 