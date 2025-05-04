import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardContext } from '../../context/CardContext';
import Button from '../common/Button';
import FlipCardGame from './FlipCardGame';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const CategorySelection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h2`
  color: #34495e;
  margin-top: 0;
  margin-bottom: 15px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const CategoryCard = styled.div`
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryName = styled.h3`
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const CategoryDescription = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const PublicBadge = styled.span`
  background-color: #2ecc71;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 10px;
`;

const Alert = styled.div`
  padding: 10px;
  background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const EmptyMessage = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
`;

const PlayerDashboard = () => {
  const { 
    categories, 
    currentCategory,
    cards, 
    loading, 
    error, 
    fetchCategories,
    fetchCards
  } = useContext(CardContext);
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategorySelect = async (categoryId) => {
    await fetchCards(categoryId);
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <Container>
      <Title>โหมดผู้เล่น (Player Mode)</Title>
      
      {error && <Alert>{error}</Alert>}
      
      {!selectedCategory ? (
        <CategorySelection>
          <CategoryTitle>เลือกหมวดหมู่การ์ด</CategoryTitle>
          
          {!categories || categories.length === 0 ? (
            <EmptyMessage>ยังไม่มีหมวดหมู่การ์ด กรุณาสร้างหมวดหมู่ในโหมดผู้สร้าง</EmptyMessage>
          ) : (
            <CategoryGrid>
              {categories.map(category => (
                <CategoryCard 
                  key={category._id} 
                  onClick={() => handleCategorySelect(category._id)}
                >
                  <CategoryName>
                    {category.name}
                    {category.isPublic && <PublicBadge>สาธารณะ</PublicBadge>}
                  </CategoryName>
                  {category.description && (
                    <CategoryDescription>{category.description}</CategoryDescription>
                  )}
                </CategoryCard>
              ))}
            </CategoryGrid>
          )}
        </CategorySelection>
      ) : (
        <>
          <Button onClick={handleBackToCategories} margin="0 0 20px 0">
            &larr; กลับไปยังหมวดหมู่
          </Button>
          
          {currentCategory && cards && (
            <FlipCardGame 
              category={currentCategory} 
              cards={cards} 
            />
          )}
        </>
      )}
    </Container>
  );
};

export default PlayerDashboard;