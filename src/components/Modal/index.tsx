import React, { ChangeEvent, useEffect, useState } from 'react';
import { AddressContainer, Backdrop, Categorias, CategoryContainer, Column, Dados, DadosContainer, Form, ItemCategory, ModalContent, ModalWrapper, Titulo } from './styles';
import { pxToRem } from '../../utils/convertToRem.util';
import { Input } from '../Input';
import { Button } from '../Button';
import { IEvent } from '../../interfaces/IEvent';
import { ICategory } from '../../interfaces/ICategory';
import { api } from '../../services/api.service';
import { IAddressId } from '../../interfaces/IAddressId';
import { consultarCEP } from '../../services/viacep.service';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: any;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  const [formEvent, setFormEvent] = useState<IEvent>({} as IEvent)
  const [formAddress, setFormAddress] = useState<IAddressId>({} as IAddressId)
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    handleData();
  }, []);

  async function handleData() {
    const cat = await api.get("/categories");
    setCategories(cat.data);
  }

  //Pega o evento aqui e faz os esquema
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormEvent(prevFields => ({
      ...prevFields,
      [id]: value
    }));
  }

  async function handleChangeAddress(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    if (id == 'zip_code') {
      if (value.length == 9) {
        const cep = await consultarCEP(value);
        if (cep == undefined) {
          alert('CEP não encontrado');
          return;
        } else {
          setFormAddress(prevFields => ({
            ...prevFields,
            zip_code: cep.cep,
            street: cep.logradouro,
            neighborhood: cep.bairro,
            city: cep.localidade,
          }));
        }
      } else {
        setFormAddress(prevFields => ({
          ...prevFields,
          [id]: value
        }));
        return;
      }
    } else {
      setFormAddress(prevFields => ({
        ...prevFields,
        [id]: value
      }));
    }
  }

  function handleChangeCategorie(event: React.MouseEvent<HTMLDivElement>) {

    const id = event.currentTarget.id;

    const categoria = categories.find((cat) => cat.id === id);
    const possuiCategoria = selectedCategories.find((cat) => cat.id === id);

    if (categoria && possuiCategoria == null) {
      setSelectedCategories([...selectedCategories, categoria]);
    }
    else {
      const newSelectedCategories = selectedCategories.filter((categoria) => categoria.id != id)

      setSelectedCategories([...newSelectedCategories]);
    }

  }

  function handleDadosEvent() {

    const categories = selectedCategories.length ? selectedCategories.map(categoria => categoria.id) : [];

    const data = {
      user: user_id,
      name: formEvent.name,
      budget: formEvent.budget,
      description: formEvent.description,
      people: formEvent.people,
      dh_event: toDate(formEvent.dh_event),
      dh_expiration: toDate(formEvent.dh_expiration),
      categories: categories,
      address: formAddress
    };

    console.log(data);

    api.post(`event`, data)
      .then(response => {
        alert('Cadastro realizado com sucesso!');
        onClose();
      })
      .catch(error => {
        alert('Tente Novamente');
        console.error('PUT failed:', error);

      });
  }

  function formatDate(date: string): string {
    if (date) {
      const isoDate = new Date(date).toISOString();
      return isoDate.substring(0, 10);
    }
    return '';
  }

  function toDate(date: string): string {
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 13, 30, 0);
    return formattedDate.toISOString();
  }

  function categoriaEstaNaLista(idCategoria: string): boolean {
    return selectedCategories.some((categoria: ICategory) => categoria.id == idCategoria);
  }

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalWrapper onClick={handleModalClick}>
        <ModalContent>
          <DadosContainer>
            <Form>
              <Column spanAll>
                <Input
                  label="Descrição"
                  id='description'
                  onChange={handleChange}
                  type='textarea'
                  value={formEvent.description}
                  style={{
                    outline: 0,
                    color: '#fff',
                    width: '100%',
                    height: pxToRem(32),
                    borderRadius: pxToRem(8),
                    background: '#9500F6',
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '14px',
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    marginBottom: '3px'
                  }} />
              </Column>
              <Column >
                <Input
                  label="Nome"
                  id='name'
                  onChange={handleChange}
                  value={formEvent.name}
                  style={{
                    outline: 0,
                    color: '#fff',
                    width: '95%',
                    height: pxToRem(32),
                    borderRadius: pxToRem(8),
                    background: '#9500F6',
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '14px',
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    marginBottom: '3px'

                  }} />
              </Column>
              <Column>
                <Input
                  label="Orçamento"
                  id='budget'
                  onChange={handleChange}
                  value={formEvent.budget}
                  style={{
                    outline: 0,
                    color: '#fff',
                    width: '90%',
                    height: pxToRem(32),
                    borderRadius: pxToRem(8),
                    background: '#9500F6',
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '14px',
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    marginBottom: '3px'
                  }} />
              </Column>
              <Column>
                <Input
                  label="Público"
                  id='people'
                  onChange={handleChange}
                  value={formEvent.people}

                  style={{
                    outline: 0,
                    color: '#fff',
                    width: '90%',
                    height: pxToRem(32),
                    borderRadius: pxToRem(8),
                    background: '#9500F6',
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '14px',
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    marginBottom: '3px'
                  }} />
              </Column>
              <Column>
                <Input
                  label="Data do Evento"
                  id='dh_event'
                  type="date"
                  onChange={handleChange}
                  value={formatDate(formEvent.dh_event)}
                  style={{
                    outline: 0,
                    color: '#fff',
                    width: '90%',
                    height: pxToRem(32),
                    borderRadius: pxToRem(8),
                    background: '#9500F6',
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '14px',
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    marginBottom: '3px'
                  }} />
              </Column>
              <Column>
                <Input
                  label="Data de Expiração"
                  id='dh_expiration'
                  type="date"
                  onChange={handleChange}
                  value={formatDate(formEvent.dh_expiration)}
                  style={{
                    outline: 0,
                    color: '#fff',
                    width: '90%',
                    height: pxToRem(32),
                    borderRadius: pxToRem(8),
                    background: '#9500F6',
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '14px',
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    marginBottom: '3px'
                  }} />
              </Column>
            </Form>
            <AddressContainer>
              <Titulo>Endereço</Titulo>
              <Form>
                <Column>
                  <Input
                    label="Rua"
                    id='street'
                    onChange={handleChangeAddress}
                    value={formAddress.street}
                    style={{
                      outline: 0,
                      color: '#fff',
                      width: '95%',
                      height: pxToRem(32),
                      borderRadius: pxToRem(8),
                      background: '#9500F6',
                      padding: '5px 10px',
                      border: 'none',
                      fontSize: '14px',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      marginBottom: '3px'

                    }} />
                </Column>
                <Column>
                  <Input
                    label="Número"
                    id='number'
                    onChange={handleChangeAddress}
                    value={formAddress.number}
                    style={{
                      outline: 0,
                      color: '#fff',
                      width: '95%',
                      height: pxToRem(32),
                      borderRadius: pxToRem(8),
                      background: '#9500F6',
                      padding: '5px 10px',
                      border: 'none',
                      fontSize: '14px',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      marginBottom: '3px'

                    }} />
                </Column>
                <Column>
                  <Input
                    label="Bairro"
                    id='neighborhood'
                    onChange={handleChangeAddress}
                    value={formAddress.neighborhood}
                    style={{
                      outline: 0,
                      color: '#fff',
                      width: '95%',
                      height: pxToRem(32),
                      borderRadius: pxToRem(8),
                      background: '#9500F6',
                      padding: '5px 10px',
                      border: 'none',
                      fontSize: '14px',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      marginBottom: '3px'

                    }} />
                </Column>
                <Column>
                  <Input
                    label="Cidade"
                    id='city'
                    onChange={handleChangeAddress}
                    value={formAddress.city}
                    style={{
                      outline: 0,
                      color: '#fff',
                      width: '95%',
                      height: pxToRem(32),
                      borderRadius: pxToRem(8),
                      background: '#9500F6',
                      padding: '5px 10px',
                      border: 'none',
                      fontSize: '14px',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      marginBottom: '3px'

                    }} />
                </Column>
                <Column>
                  <Input
                    label="País"
                    id='contry'
                    onChange={handleChangeAddress}
                    value={formAddress.contry}
                    style={{
                      outline: 0,
                      color: '#fff',
                      width: '95%',
                      height: pxToRem(32),
                      borderRadius: pxToRem(8),
                      background: '#9500F6',
                      padding: '5px 10px',
                      border: 'none',
                      fontSize: '14px',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      marginBottom: '3px'

                    }} />
                </Column>
                <Column>
                  <Input
                    label="CEP"
                    id='zip_code'
                    onChange={handleChangeAddress}
                    value={formAddress.zip_code}
                    style={{
                      outline: 0,
                      color: '#fff',
                      width: '95%',
                      height: pxToRem(32),
                      borderRadius: pxToRem(8),
                      background: '#9500F6',
                      padding: '5px 10px',
                      border: 'none',
                      fontSize: '14px',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      marginBottom: '3px'

                    }} />
                </Column>
              </Form>
            </AddressContainer>
            <CategoryContainer>
              <Titulo>Categorias</Titulo>
              <Categorias>
                {categories.map((category) => {
                  return (
                    <ItemCategory
                      key={category.id}
                      id={category.id}
                      onClick={handleChangeCategorie}
                      style={{ background: categoriaEstaNaLista(category.id) ? '#50E3C2' : '#ececec' }}>
                      {category.name}
                    </ItemCategory>
                  )
                })}

              </Categorias>
            </CategoryContainer>
            <Button onClick={handleDadosEvent} style={{ margin: '0 auto' }}>Cadastrar</Button>
          </DadosContainer>
        </ModalContent>
      </ModalWrapper>
    </Backdrop>
  );
};

export default Modal;




