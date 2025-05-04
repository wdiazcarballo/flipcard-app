import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CardContext } from '../../context/CardContext';

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
  cursor: pointer;
  background-color: ${props => props.active ? '#e3f2fd' : 'white'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#bbdefb' : '#f5f5f5'};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryName = styled.h3`
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
    color: ${props => props.delete ? '#e74c3c' : '#3498db'};
  }
`;

const CategoryDescription = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const PublicBadge = styled.span`
  background-color: #2ecc71;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 10px;
`;

const EmptyMessage = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
`;

const CategoryList = ({ categories, onCategorySelect, onEditCategory, currentCategoryId }) => {
  const { deleteCategory } = useContext(CardContext);

  const handleDelete = async (e, categoryId) => {
    e.stopPropagation();
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้? การ์ดทั้งหมดในหมวดหมู่นี้จะถูกลบด้วย')) {
      await deleteCategory(categoryId);
    }
  };

  const handleEdit = (e, category) => {
    e.stopPropagation();
    onEditCategory(category);
  };

  if (!categories || categories.length === 0) {
    return <EmptyMessage>ยังไม่มีหมวดหมู่ กรุณาสร้างหมวดหมู่ใหม่</EmptyMessage>;
  }

  return (
    <List>
      {categories.map(category => (
        <ListItem 
          key={category._id} 
          onClick={() => onCategorySelect(category._id)}
          active={category._id === currentCategoryId}
        >
          <CategoryHeader>
            <CategoryName>
              {category.name}
              {category.isPublic && <PublicBadge>สาธารณะ</PublicBadge>}
            </CategoryName>
            <ActionButtons>
              <ActionButton onClick={(e) => handleEdit(e, category)}>
                <FaEdit />
              </ActionButton>
              <ActionButton delete onClick={(e) => handleDelete(e, category._id)}>
                <FaTrash />
              </ActionButton>
            </ActionButtons>
          </CategoryHeader>
          {category.description && (
            <CategoryDescription>{category.description}</CategoryDescription>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;