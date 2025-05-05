// Mock for react-router-dom
const mockUseNavigate = jest.fn();

export const BrowserRouter = ({ children }) => children;
export const Routes = ({ children }) => children;
export const Route = ({ children }) => children;
export const Link = ({ children, to, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);
export const useNavigate = () => mockUseNavigate;
export const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
});

// Reset mocks between tests
export const resetMocks = () => {
  mockUseNavigate.mockReset();
};