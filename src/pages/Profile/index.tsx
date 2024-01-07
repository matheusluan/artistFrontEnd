import { ChangeEvent, useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { IUser } from "../../interfaces/IUser";
import { Avaliacoes, Categorias, Container, Dados, DadosContainer, H1, HeaderProfile, ItemCategory, ItemsAvaliacoes, Left, Right } from "./styles";
import { api } from "../../services/api.service";
import { Input } from "../../components/Input";
import { pxToRem } from "../../utils/convertToRem.util";
import { Button } from "../../components/Button";
import { IAddressId } from "../../interfaces/IAddressId";
import { Column, Form } from "../Evento/styles";
import { consultarCEP, ViaCepProps } from "../../services/viacep.service";
import { PostAuthorAvatar, PostAuthorName, SpanStar } from "../../components/Post/styles";
import { ICategory } from "../../interfaces/ICategory";
import { IRating } from "../../interfaces/IRating";
import PhotoUploader from "../../components/PhotoUploader";

export function Profile() {

   const [formUser, setFormUser] = useState<IUser>({} as IUser)
   const [attData, setAttData] = useState<boolean>(false)

   const [formAddress, setFormAddress] = useState<IAddressId>({} as IAddressId);

   const [receiveRating, setReceiveRating] = useState<IRating[]>([]);

   const [categories, setCategories] = useState<ICategory[]>([]);
   const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

   const userId = localStorage.getItem(`user_id`);
   const userType = localStorage.getItem('user_type');

   // const history = useHistory();

   // Pegando os dados do usuario
   async function handleData() {
      const us = await api.get(`user/${userId}`);
      setFormUser(us.data);
      setFormAddress(us.data.address);

      const cat = await api.get("/categories");
      setCategories(cat.data);

      if (us.data.categories != undefined || us.data.categories != null) {
         const categoryArray: ICategory[] = us.data.categories.map((categoryObj: { category: any; }) => categoryObj.category);
         setSelectedCategories(categoryArray);
      }

      if (userType == "artist" && us.data.ratingsReceived != undefined) {
         setReceiveRating(us.data.ratingsReceived);
      }
   }

   useEffect(() => {
      handleData();
   }, [attData]);


   //Pega o evento aqui e faz os esquema
   function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const { id, value } = event.target;
      setFormUser(prevFields => ({
         ...prevFields,
         [id]: value
      }));

      if (validarEmail(value) == false) {
         event.target.style.color = "#FF000";
      }
   }

   // Atualizando o endereço
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

   // Atualizando categorias
   function handleChangeCategorie(event: React.MouseEvent<HTMLDivElement>) {
      const id = event.currentTarget.id;

      const categoria = categories.find((cat) => cat.id === id);
      const possuiCategoria = selectedCategories.find((cat) => cat.id === id);

      if (categoria && possuiCategoria == null) {
         setSelectedCategories([...selectedCategories, categoria]);
      } else {
         const newSelectedCategories = selectedCategories.filter((categoria) => categoria.id != id);
         setSelectedCategories([...newSelectedCategories]);
      }
   }

   // Verifica se a categoria esta na lista
   function categoriaEstaNaLista(idCategoria: string): boolean {
      return selectedCategories.some((categoria: ICategory) => categoria.id === idCategoria);
   }

   // Verifica se o formato de email é valido
   function validarEmail(email: string): boolean {
      const regra = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return regra.test(email);
   }

   //Envia a foto para o servidor
   const handlePostImage = (image: Blob) => {
      const formData = new FormData();
      formData.append("foto", image);
      formData.append("id", formUser.id);

      api.post("foto", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }).then((response) => {
         alert("Foto alterada com sucesso!");
         setAttData(!attData);
      }).catch((error) => (alert("Erro ao trocar a foto"), console.error(error)));

   };

   // Atualizando dados do usuario
   function handleDadosUser() {
      const data = {
         name: formUser.name,
         username: formUser.username,
         password: formUser.password,
         user_type: formUser.user_type,
         document: formUser.document,
         email: formUser.email,
         profile_image: formUser.profile_image,
         cel_phone: formUser.cel_phone,
         status: formUser.status,
         facebookUrl: formUser.facebookUrl,
         instagramUrl: formUser.instagramUrl,
         tiktokUrl: formUser.tiktokUrl,
         youtubeUrl: formUser.youtubeUrl
      };
      api.put(`user/${userId}`, data)
         .then(response => {
            alert('Dados basicos atualizados com sucesso');
         })
         .catch(error => {
            alert('Tente Novamente');
            console.error('PUT failed:', error);
         });
   }

   // Atualizando dados do endereço
   function handleDadosAddress() {

      if (formAddress && formAddress.id) {
         const data = {
            id: formAddress.id,
            zip_code: formAddress.zip_code,
            street: formAddress.street,
            number: formAddress.number,
            neighborhood: formAddress.neighborhood,
            city: formAddress.city,
            contry: formAddress.contry,
            user: userId
         }

         api.put(`address/${formAddress.id}`, data)
            .then(response => {
               alert('Endereço atualizado com sucesso');
            })
            .catch(error => {
               alert('Tente Novamente');
               console.error('PUT failed:', error);
            });
      } else {
         const data = {

            zip_code: formAddress.zip_code,
            street: formAddress.street,
            number: formAddress.number,
            neighborhood: formAddress.neighborhood,
            city: formAddress.city,
            contry: formAddress.contry,
            lat: "",
            long: "",
            user: userId
         }

         api.post(`address/`, data)
            .then(response => {
               alert('Endereço cadastrado com sucesso');
            })
            .catch(error => {
               alert('Tente Novamente');
               console.error('PUT failed:', error);
            });
      }
   }

   // Atualizando categorias
   function handleDadosCategories() {
      const categories = selectedCategories.length ? selectedCategories.map(categoria => categoria.id) : [];

      const data = {
         user: userId,
         categories: categories,
      };
      api.post(`user_categories/`, data)
         .then(response => {
            alert('Categorias atualizadas com sucesso');
         })
         .catch(error => {
            alert('Tente Novamente');
            console.error('PUT failed:', error);
         });
   }

   // Estrelas
   function Star({ ratingValue }: { ratingValue: number }) {
      const stars = [];

      for (let index = 0; index < 5; index++) {
         stars.push(
            <SpanStar key={index}>
               {index < ratingValue ? '★' : '☆'}
            </SpanStar>
         );
      }

      return <>{stars}</>;
   }

   return (
      <>
         <Header />
         <Container>
            <PostAuthorAvatar src={formUser.profile_image ? 'http://localhost:3333/api/v1/images/' + formUser.profile_image : 'https://picsum.photos/50'} alt="foto" />
            <PostAuthorName style={{ color: "#FFF" }}>{formUser.name}</PostAuthorName>
            <PhotoUploader onPost={handlePostImage} />

            {/* Parte dos dados do usuario */}
            <H1>Editar Usuario</H1>
            <DadosContainer>
               <Dados>
                  <div>
                     <Input
                        label="Nome"
                        id='name'
                        onChange={handleChange}
                        value={formUser.name ? formUser.name : ""}
                        placeholder="Não informado"
                        className="input" />
                     <Input
                        label="Usuario"
                        id='username'
                        onChange={handleChange}
                        value={formUser.username ? formUser.username : ""}
                        placeholder="Não informado"
                        className="input" />
                     {/* <Input
                        label="Url Foto"
                        id='profile_image'
                        onChange={handleChange}
                        value={formUser.profile_image ? formUser.profile_image : ""}
                        placeholder="Não informado"
                        className="input" /> */}
                     <Input
                        label="Senha"
                        placeholder="Não informado"
                        type="password"
                        id='password'
                        onChange={handleChange}
                        value={formUser.password ? formUser.password : ""}
                        className={formUser.password?.length >= 3 ? 'input' : 'input input-invalido'} />

                     {userType != 'organizer' &&
                        <>
                           <Input
                              label="Facebook"
                              id='facebookUrl'
                              onChange={handleChange}
                              value={formUser.facebookUrl ? formUser.facebookUrl : ""}
                              placeholder="Não informado"
                              className="input" />
                           <Input
                              label="Instagram"
                              id='instagramUrl'
                              onChange={handleChange}
                              value={formUser.instagramUrl ? formUser.instagramUrl : ""}
                              placeholder="Não informado"
                              className="input" />
                        </>
                     }
                  </div>
                  <div>
                     <Input
                        label="Email"
                        id='email'
                        onChange={handleChange}
                        value={formUser.email ? formUser.email : ""}
                        placeholder="Não informado"
                        className={validarEmail(formUser.email) ? 'input' : 'input input-invalido'}
                     />
                     <Input
                        label="CPF/CNPJ"
                        placeholder="Não informado"
                        id='document'
                        onChange={handleChange}
                        value={formUser.document ? formUser.document : ""}
                        className="input" />

                     <Input
                        label="Telefone"
                        placeholder="Não informado"
                        id='cellphone'
                        onChange={handleChange}
                        value={formUser.cel_phone ? formUser.cel_phone : ""}
                        className="input" />

                     {userType != 'organizer' &&
                        <>
                           <Input
                              label="TikTok"
                              id='tiktokUrl'
                              onChange={handleChange}
                              value={formUser.tiktokUrl ? formUser.tiktokUrl : ""}
                              placeholder="Não informado"
                              className="input" />
                           <Input
                              label="Youtube"
                              placeholder="Não informado"
                              id='youtubeUrl'
                              onChange={handleChange}
                              value={formUser.youtubeUrl ? formUser.youtubeUrl : ""}
                              className="input" />
                        </>
                     }
                  </div>
               </Dados>
               <Button className="buttonHandle" onClick={handleDadosUser} style={{ margin: '0 auto' }}>Atualizar</Button>
            </DadosContainer>

            {/* Parte dos endereços */}
            <H1 style={{ marginTop: "2rem" }}>Editar Endereço</H1>
            <DadosContainer>
               <Form>
                  <Column>
                     <Input
                        label="CEP"
                        placeholder="Não informado"
                        id='zip_code'
                        onChange={handleChangeAddress}
                        value={formAddress != null ? formAddress.zip_code : ""}
                        className="input" />
                     <Input
                        label="Bairro"
                        placeholder="Não informado"
                        id='neighborhood'
                        onChange={handleChangeAddress}
                        value={formAddress != null ? formAddress.neighborhood : ""}
                        className="input" />

                  </Column>
                  <Column>
                     <Input
                        label="Number"
                        placeholder="Não informado"
                        id='number'
                        onChange={handleChangeAddress}
                        value={formAddress != null ? formAddress.number : ""}
                        className="input" />
                     <Input
                        label="Cidade"
                        placeholder="Não informado"
                        id='city'
                        onChange={handleChangeAddress}
                        value={formAddress != null ? formAddress.city : ""}
                        className="input" />
                  </Column>
                  <Column>
                     <Input
                        label="Rua/Avenida"
                        placeholder="Não informado"
                        id='street'
                        onChange={handleChangeAddress}
                        value={formAddress != null ? formAddress.street : ""}
                        className="input" />
                     <Input
                        label="País"
                        placeholder="Não informado"
                        id='contry'
                        onChange={handleChangeAddress}
                        value={formAddress != null ? formAddress.contry : ""}
                        className="input" />
                  </Column>
               </Form>
               <Button className="buttonHandle" onClick={handleDadosAddress} style={{ margin: '0 auto' }}>Atualizar</Button>
            </DadosContainer>

            {/* Parte das categorias */}
            {userType != 'organizer' &&
               <>
                  <H1 style={{ marginTop: "2rem" }}>Editar Categorias</H1>
                  <DadosContainer>
                     <Form>
                        <Column spanAll>
                           <Categorias>
                              {categories.map((category) => {
                                 return (
                                    <ItemCategory
                                       key={category.id}
                                       id={category.id}
                                       onClick={handleChangeCategorie}
                                       style={{ background: categoriaEstaNaLista(category.id) ? "#50E3C2" : "#FFF" }}                              >
                                       {category.name}
                                    </ItemCategory>
                                 );
                              })}
                           </Categorias>
                        </Column>
                     </Form>
                     <Button className="buttonHandle" onClick={handleDadosCategories} style={{ margin: '0 auto' }}>Atualizar</Button>
                  </DadosContainer>

                  <H1 style={{ marginTop: "2rem" }}>Avaliações</H1>
                  <DadosContainer style={{ display: "flex", justifyContent: "center" }}>
                     <Form>
                        <Column spanAll>
                           <div className="avaliacoes">
                              {receiveRating != undefined || receiveRating != null ? receiveRating.map((rating) => {
                                 return (
                                    <Avaliacoes
                                       key={rating.id}
                                    >
                                       <ItemsAvaliacoes>
                                          <img style={{}} src={'http://localhost:3333/api/v1/images/' + rating.ratedByUser.profile_image} alt="Foto do avaliador" />
                                          <p style={{ flexWrap: "nowrap" }}>{rating.ratedByUser.name}</p>
                                          <div>
                                             <Star ratingValue={rating.value} />
                                          </div>
                                       </ItemsAvaliacoes>
                                    </Avaliacoes>
                                 );
                              }) : <p style={{ fontSize: "2rem", textAlign: "center" }} >Não há avaliações</p>
                              }
                           </div>
                        </Column>
                     </Form>
                  </DadosContainer>

               </>
            }

         </Container>
         <Footer />
      </>
   )
}



