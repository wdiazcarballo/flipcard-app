import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardContext } from '../../context/CardContext';
import Button from '../common/Button';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import CardForm from './CardForm';
import CardList from './CardList';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  color: #34495e;
  margin: 30px 0 15px;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Alert = styled.div`
  padding: 10px;
  background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const CreatorDashboard = () => {
  const { 
    categories, 
    currentCategory,
    cards, 
    loading, 
    error, 
    fetchCategories,
    fetchCards
  } = useContext(CardContext);
  
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategorySelect = (categoryId) => {
    fetchCards(categoryId);
    setShowCardForm(false);
    setEditingCard(null);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowCardForm(true);
  };

  const handleCategoryFormClose = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleCardFormClose = () => {
    setShowCardForm(false);
    setEditingCard(null);
  };

  return (
    <Container>
      <Title>โหมดผู้สร้าง (Creator Mode)</Title>
      
      {error && <Alert>{error}</Alert>}
      
      <TwoColumnLayout>
        <Panel>
          <Subtitle>หมวดหมู่การ์ด</Subtitle>
          
          {!showCategoryForm ? (
            <Button 
              onClick={() => setShowCategoryForm(true)} 
              margin="0 0 20px 0"
            >
              + สร้างหมวดหมู่ใหม่
            </Button>
          ) : (
            <CategoryForm 
              onClose={handleCategoryFormClose} 
              editingCategory={editingCategory} 
            />
          )}
          
          <CategoryList 
            categories={categories} 
            onCategorySelect={handleCategorySelect}
            onEditCategory={handleEditCategory}
            currentCategoryId={currentCategory?._id}
          />
        </Panel>
        
        <Panel>
          <Subtitle>
            {currentCategory ? `การ์ดในหมวดหมู่: ${currentCategory.name}` : 'เลือกหมวดหมู่เพื่อดูการ์ด'}
          </Subtitle>
          
          {currentCategory && !showCardForm ? (
            <Button 
              onClick={() => setShowCardForm(true)} 
              margin="0 0 20px 0"
            >
              + สร้างการ์ดใหม่
            </Button>
          ) : null}
          
          {showCardForm && currentCategory ? (
            <CardForm 
              categoryId={currentCategory._id} 
              onClose={handleCardFormClose}
              editingCard={editingCard}
            />
          ) : null}
          
          {currentCategory ? (
            <CardList 
              cards={cards} 
              onEditCard={handleEditCard}
            />
          ) : (
            <p>กรุณาเลือกหมวดหมู่จากรายการด้านซ้าย</p>
          )}
        </Panel>
      </TwoColumnLayout>
    </Container>
  );
};

export default CreatorDashboard;