import styled from 'styled-components';

export const CardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #3498db;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
    margin-top: 10px;
    opacity: 0.9;
  }
`;

export const Instructions = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const CardOuter = styled.div`
  perspective: 1000px;
  width: 500px;
  height: 300px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 320px;
    height: 250px;
  }
`;

export const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: ${(props) => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardFront = styled(CardFace)`
  background-color: #3498db;
  color: white;
`;

export const CardBack = styled(CardFace)`
  background-color: white;
  color: #2c3e50;
  transform: rotateY(180deg);
`;

export const CardNumber = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.9rem;
  opacity: 0.8;
`;

export const CardContent = styled.div`
  font-size: 1.2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  ul {
    text-align: left;
    padding-left: 20px;
    list-style-type: none;
  }

  li {
    margin-bottom: 10px;
    position: relative;

    &::before {
      content: "✅";
      margin-right: 8px;
    }
  }
`;

export const ProgressContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const ProgressText = styled.div`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background-color: #2ecc71;
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;