import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import {
  CardOuter,
  CardInner,
  CardFront,
  CardBack,
  CardNumber,
  CardContent,
} from '../common/Card';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    color: #e74c3c;
  }
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Instructions = styled.p`
  margin-bottom: 20px;
  color: #7f8c8d;
`;

const CardPreview = ({ card, onClose }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <Title>ตัวอย่างการ์ด</Title>
        <Instructions>คลิกที่การ์ดเพื่อพลิกดูด้านหลัง</Instructions>
        
        <CardOuter>
          <CardInner flipped={flipped} onClick={handleFlip}>
            <CardFront>
              <CardNumber>Preview</CardNumber>
              <CardContent dangerouslySetInnerHTML={{ __html: card.front }} />
            </CardFront>
            
            <CardBack>
              <CardNumber>Preview</CardNumber>
              <CardContent>
                <ul>
                  {card.back.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardBack>
          </CardInner>
        </CardOuter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardPreview;