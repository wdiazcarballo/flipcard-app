import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  CardContainer,
  Header,
  Instructions,
  Controls,
  CardsContainer,
  CardOuter,
  CardInner,
  CardFront,
  CardBack,
  CardNumber,
  CardContent,
  ProgressContainer,
  ProgressText,
  ProgressBar,
  ProgressFill,
} from '../common/Card';
import Button from '../common/Button';

const FlipCardGame = ({ category, cards }) => {
  const [activeCards, setActiveCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [totalFlipped, setTotalFlipped] = useState(0);

  useEffect(() => {
    setActiveCards(cards);
    setFlippedCards({});
    setTotalFlipped(0);
  }, [cards]);

  const handleCardFlip = (cardId) => {
    if (!flippedCards[cardId]) {
      const newFlippedCards = { ...flippedCards, [cardId]: true };
      setFlippedCards(newFlippedCards);
      setTotalFlipped(Object.keys(newFlippedCards).length);
    }
  };

  const handleFlipAll = () => {
    const allFlipped = {};
    cards.forEach(card => {
      allFlipped[card._id] = true;
    });
    setFlippedCards(allFlipped);
    setTotalFlipped(cards.length);
  };

  const handleReset = () => {
    setFlippedCards({});
    setTotalFlipped(0);
  };

  const getProgressPercentage = () => {
    if (cards.length === 0) return 0;
    return (totalFlipped / cards.length) * 100;
  };

  return (
    <CardContainer>
      <Header>
        <h1>{category.name}</h1>
        <div className="subtitle">{category.description}</div>
      </Header>

      <Instructions>
        <p>คลิกที่การ์ดเพื่อพลิกดูคำตอบ ใช้ปุ่มด้านล่างเพื่อควบคุมการเล่น</p>
      </Instructions>

      <Controls>
        <Button onClick={handleFlipAll}>เปิดทุกการ์ด</Button>
        <Button onClick={handleReset}>เริ่มใหม่</Button>
      </Controls>

      <CardsContainer>
        {activeCards.map((card, index) => (
          <CardOuter key={card._id}>
            <CardInner 
              flipped={flippedCards[card._id]} 
              onClick={() => handleCardFlip(card._id)}
            >
              <CardFront>
                <CardNumber>{index + 1}/{activeCards.length}</CardNumber>
                <CardContent dangerouslySetInnerHTML={{ __html: card.front }} />
              </CardFront>
              
              <CardBack>
                <CardNumber>{index + 1}/{activeCards.length}</CardNumber>
                <CardContent>
                  <ul>
                    {card.back.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </CardBack>
            </CardInner>
          </CardOuter>
        ))}
      </CardsContainer>

      <ProgressContainer>
        <ProgressText>
          ความคืบหน้า: <span>{totalFlipped}/{activeCards.length}</span> การ์ด
        </ProgressText>
        <ProgressBar>
          <ProgressFill percentage={getProgressPercentage()} />
        </ProgressBar>
      </ProgressContainer>
    </CardContainer>
  );
};

export default FlipCardGame;