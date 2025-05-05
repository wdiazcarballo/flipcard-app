import { render, screen } from '@testing-library/react';
import App from './App';

// Mock dependencies
jest.mock('./context/AuthContext', () => require('./mocks/AuthContext'));
jest.mock('./context/CardContext', () => ({
  CardContext: {
    Provider: ({ children }) => children,
  },
  CardProvider: ({ children }) => children,
}));

jest.mock('./components/common/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}));

jest.mock('./components/common/ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="protected-route">{children}</div>,
}));

jest.mock('./pages/HomePage', () => ({
  __esModule: true,
  default: () => <div data-testid="homepage">Home Page</div>,
}));

test('renders the application with routes', () => {
  render(<App />);
  const layoutElement = screen.getByTestId('layout');
  expect(layoutElement).toBeInTheDocument();
  expect(screen.getByTestId('homepage')).toBeInTheDocument();
});
