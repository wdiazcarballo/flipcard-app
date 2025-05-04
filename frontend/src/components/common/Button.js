import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => (props.secondary ? '#2980b9' : '#3498db')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin: ${(props) => props.margin || '0'};

  &:hover {
    background-color: ${(props) => (props.secondary ? '#2473a6' : '#2980b9')};
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }

  &.active {
    background-color: #2ecc71;
  }

  &.danger {
    background-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
    }
  }
`;

export default Button;