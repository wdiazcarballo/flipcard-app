import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { CardContext } from '../../context/CardContext';
import CardPreview from './CardPreview';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: white;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardFront = styled.div`
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 5px;

  &:hover {
    color: ${(props) => {
      if (props.$delete) return '#e74c3c';
      if (props.$preview) return '#2ecc71';
      return '#3498db';
    }};
  }
`;

const CardBackList = styled.ul`
  margin: 10px 0 0;
  padding-left: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 5px 0;
  font-size: 0.8rem;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyMessage = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
`;

const CardList = ({ cards, onEditCard }) => {
  const { deleteCard } = useContext(CardContext);
  const [expandedCard, setExpandedCard] = useState(null);
  const [previewCard, setPreviewCard] = useState(null);

  const handleDelete = async (cardId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบการ์ดนี้?')) {
      await deleteCard(cardId);
    }
  };

  const toggleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handlePreview = (card) => {
    setPreviewCard(card);
  };

  const closePreview = () => {
    setPreviewCard(null);
  };

  if (!cards || cards.length === 0) {
    return <EmptyMessage>ยังไม่มีการ์ดในหมวดหมู่นี้ กรุณาสร้างการ์ดใหม่</EmptyMessage>;
  }

  return (
    <>
      {previewCard && (
        <CardPreview card={previewCard} onClose={closePreview} />
      )}

      <List>
        {cards.map((card) => (
          <ListItem key={card._id}>
            <CardHeader>
              <CardFront dangerouslySetInnerHTML={{ __html: card.front }} />
              <ActionButtons>
                <ActionButton $preview onClick={() => handlePreview(card)}>
                  <FaEye />
                </ActionButton>
                <ActionButton onClick={() => onEditCard(card)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton $delete onClick={() => handleDelete(card._id)}>
                  <FaTrash />
                </ActionButton>
              </ActionButtons>
            </CardHeader>

            {card.back.length > 0 && (
              <>
                <ShowMoreButton onClick={() => toggleExpand(card._id)}>
                  {expandedCard === card._id ? 'ซ่อนคำตอบ' : 'แสดงคำตอบ'}
                </ShowMoreButton>

                <CardBackList visible={expandedCard === card._id}>
                  {card.back.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </CardBackList>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CardList;
