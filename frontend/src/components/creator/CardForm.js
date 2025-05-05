import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { CardContext } from '../../context/CardContext';
import Button from '../common/Button';
import { FormGroup, Label, ErrorMessage as StyledError } from '../common/FormElements';

const FormContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 8px;
`;

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const BackItems = styled.div`
  margin-top: 10px;
`;

const BackItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const AddItemButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RemoveItemButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
`;

// สคีมาการตรวจสอบความถูกต้อง
const validationSchema = Yup.object({
  front: Yup.string().required('กรุณาระบุข้อความด้านหน้าการ์ด'),
  back: Yup.array()
    .of(Yup.string().required('กรุณาระบุข้อความ'))
    .min(1, 'ต้องมีข้อความด้านหลังอย่างน้อย 1 รายการ')
    .required('กรุณาระบุข้อความด้านหลังการ์ด'),
});

const CardForm = ({ categoryId, onClose, editingCard }) => {
  const { createCard, updateCard } = useContext(CardContext);
  const [formValues, setFormValues] = useState({
    front: editingCard ? editingCard.front : '',
    back: editingCard ? editingCard.back : ['']
  });

  const initialValues = formValues;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Submitting form with values:', values); // Debug log
    
    // Make sure front is not empty
    if (!values.front || values.front.trim() === '') {
      console.error('Front text is empty!');
      return;
    }
    
    // Make sure back array has at least one non-empty value
    if (!Array.isArray(values.back) || values.back.length === 0 || 
        (values.back.length === 1 && values.back[0].trim() === '')) {
      console.error('Back text is invalid or empty!');
      return;
    }
    
    try {
      const cardData = {
        front: values.front.trim(),
        back: values.back.map(item => item.trim()).filter(item => item !== '')
      };
      
      console.log('Sending card data to API:', cardData);
      
      if (editingCard) {
        await updateCard(editingCard._id, cardData);
      } else {
        await createCard(categoryId, cardData);
      }
      
      setSubmitting(false);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{editingCard ? 'แก้ไขการ์ด' : 'สร้างการ์ดใหม่'}</FormTitle>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ values, isSubmitting, handleChange, setFieldValue, errors, touched }) => {
          console.log('Current form values:', values);
          console.log('Current form errors:', errors);
          console.log('Fields touched:', touched);
          
          return (
            <Form>
              <FormGroup>
                <Label htmlFor="front">ข้อความด้านหน้าการ์ด</Label>
                <StyledField 
                  as="textarea" 
                  id="front" 
                  name="front" 
                  rows="3"
                  value={values.front}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    console.log('Setting front to:', newValue);
                    setFieldValue('front', newValue);
                    setFormValues(prev => ({...prev, front: newValue}));
                  }}
                />
                {errors.front && touched.front && (
                  <StyledError>{errors.front}</StyledError>
                )}
                <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: '5px' }}>
                  สามารถใช้ HTML tag พื้นฐานได้ เช่น &lt;br&gt; สำหรับขึ้นบรรทัดใหม่
                </div>
              </FormGroup>

              <FormGroup>
                <Label>ข้อความด้านหลังการ์ด</Label>
                {errors.back && touched.back && (
                  <StyledError>{errors.back}</StyledError>
                )}
                
                <FieldArray name="back">
                  {({ remove, push }) => (
                    <BackItems>
                      {values.back.map((item, index) => (
                        <BackItem key={index}>
                          <StyledField 
                            name={`back.${index}`} 
                            placeholder={`รายการที่ ${index + 1}`}
                            value={values.back[index]}
                            onChange={(e) => {
                              const newBackItems = [...values.back];
                              newBackItems[index] = e.target.value;
                              setFieldValue('back', newBackItems);
                              setFormValues(prev => ({...prev, back: newBackItems}));
                            }}
                          />
                          {values.back.length > 1 && (
                            <RemoveItemButton 
                              type="button" 
                              onClick={() => {
                                remove(index);
                                const newBackItems = [...values.back];
                                newBackItems.splice(index, 1);
                                setFormValues(prev => ({...prev, back: newBackItems}));
                              }}
                            >
                              <FaTrash />
                            </RemoveItemButton>
                          )}
                        </BackItem>
                      ))}
                      
                      <AddItemButton
                        type="button"
                        onClick={() => {
                          push('');
                          setFormValues(prev => ({
                            ...prev, 
                            back: [...prev.back, '']
                          }));
                        }}
                      >
                        <FaPlus /> เพิ่มรายการ
                      </AddItemButton>
                    </BackItems>
                  )}
                </FieldArray>
              </FormGroup>

              <ButtonGroup>
                <Button 
                  type="button" 
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  onClick={() => {
                    console.log('Submitting with values:', values);
                    if (!values.front || values.front.trim() === '') {
                      console.error('Front text is empty!');
                      return;
                    }
                    handleSubmit(values, {
                      setSubmitting: () => {}, 
                      resetForm: () => setFormValues({front: '', back: ['']})
                    });
                  }}
                >
                  {isSubmitting ? 'กำลังบันทึก...' : (editingCard ? 'บันทึกการแก้ไข' : 'สร้างการ์ด')}
                </Button>
                <Button type="button" secondary onClick={onClose}>
                  ยกเลิก
                </Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default CardForm;