// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock all required modules
jest.mock('react-router-dom', () => require('../mocks/react-router-dom'));

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
