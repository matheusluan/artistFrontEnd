import { ChangeEvent, useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AddressContainer, Categorias, CategoryContainer, Column, Container, Dados, DadosContainer, Form, H1, ItemCategory, Titulo } from "./styles";
import { api } from "../../services/api.service";
import { Input } from "../../components/Input";
import { pxToRem } from "../../utils/convertToRem.util";
import { Button } from "../../components/Button";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { IEvent } from "../../interfaces/IEvent";
import { ICategory } from "../../interfaces/ICategory";
import { Text } from "../../components/Text";
import { ICategories } from "../../interfaces/ICategories";
import { IAddressId } from "../../interfaces/IAddressId";
import { consultarCEP } from "../../services/viacep.service";

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface response {
    category: ICategories[];
    address: IAddressId;
}

export function Evento(props: Props) {

    const id = props.match.params.id;

    const [formEvent, setFormEvent] = useState<IEvent>({} as IEvent)
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [formAddress, setFormAddress] = useState<IAddressId>({} as IAddressId)
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

    const user_id = localStorage.getItem('user_id');

    const history = useHistory();

    useEffect(() => {
        handleData();
    }, []);

    async function handleData() {
        const us = await api.get(`event/${id}`);
        setFormEvent(us.data);

        const cat = await api.get("/categories");
        setCategories(cat.data);

        const response: response = us.data;

        const categoryArray: ICategory[] = response.category.map(categoryObj => categoryObj.category);

        setSelectedCategories(categoryArray);

        setFormAddress(response.address);
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
        api.put(`event/${id}`, data)
            .then(response => {
                alert('Evento atualizado com sucesso!');
                history.goBack();
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


    return (
        <>
            <Header />
            <Container>
                <H1>Editar Evento</H1>
                <DadosContainer>
                    <Titulo>Dados Basicos</Titulo>
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
                                    width: '96.8%',
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
                                    value={formAddress != null ? formAddress.zip_code : ''}
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
                    <Button onClick={handleDadosEvent} style={{ margin: '0 auto' }}>Atualizar</Button>
                </DadosContainer>
            </Container>
            <Footer />
        </>
    )

}





