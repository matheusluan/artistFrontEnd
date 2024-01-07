import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { CardArtist, CardHeader, Container, Imagem, DadosContainer, Btn } from "./styles";
import { api } from "../../services/api.service";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { IEvent } from "../../interfaces/IEvent";
import { ICategory } from "../../interfaces/ICategory";
import { ICategories } from "../../interfaces/ICategories";
import { IAddressId } from "../../interfaces/IAddressId";
import { H1 } from "../Evento/styles";
import { Check, Person, X } from "@phosphor-icons/react";
import { IEventArtist } from "../../interfaces/IEventArtist";

interface MatchParams {
   id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface response {
   category: ICategories[];
   address: IAddressId;
}

export function MinhasCandidaturas(props: Props) {

   const [candidaturas, setCandidaturas] = useState<IEventArtist[]>([]);
   const [attCand, setAttCand] = useState<boolean>(false)

   const user_id = localStorage.getItem('user_id');

   useEffect(() => {
      handleData();
   }, [attCand]);

   async function handleData() {
      const us = await api.get(`/candidatura/artist/${user_id}`);
      setCandidaturas(us.data);
   }

   return (
      <>
         <Header />
         <Container>
            <H1>Candidaturas</H1>
            <DadosContainer>
               {candidaturas?.length == 0 &&
                  <h1> Nada por aqui. </h1>}
               {candidaturas?.map((candidatura) => (
                  <CardArtist key={candidatura.id}>
                     <CardHeader>
                        <span style={{ color: '#000' }}> {candidatura.event?.name}</span>
                        <Btn
                           title={candidatura.accept ? 'Aprovado': 'Reprovado'  }
                           style={{ background: candidatura.accept ? '#58f229' : '#E64B30' }}
                        >
                           {candidatura.accept ? <Check /> : <X />}
                        </Btn>


                     </CardHeader>
                  </CardArtist>
               ))}
            </DadosContainer>
         </Container>
         <Footer />
      </>
   )

}





