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
import { Camera, Check, Person, X } from "@phosphor-icons/react";
import { Button } from "../../components/Button";
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

export function Candidaturas(props: Props) {

   const id = props.match.params.id;

   const [event, setEvent] = useState<IEvent>({} as IEvent)
   const [candidaturas, setCandidaturas] = useState<ICategory[]>([]);
   const [attCand, setAttCand] = useState<boolean>(false)

   const user_id = localStorage.getItem('user_id');

   const history = useHistory();

   useEffect(() => {
      handleData();
   }, [attCand]);

   async function handleData() {
      const us = await api.get(`event/${id}`);
      setEvent(us.data);

      const response: response = us.data;
   }

   function handleCandidatura(candidatura: IEventArtist): void {

      let data = {
         artist: candidatura.artistId,
         event: candidatura.eventId,
         accept: !candidatura.accept,
         dh_action: new Date()
      }

      api.put(`candidatura/${candidatura.id}`, data)
         .then(response => {
            alert(`Candidatura do ${candidatura.artist.name} ${data.accept ? 'Aprovada' : 'Reprovada'} com sucesso!`);
            setAttCand(!attCand);
         })
         .catch(error => {
            alert('Tente Novamente');
            console.error('PUT failed:', error);

         });
   }

   return (
      <>
         <Header />
         <Container>
            <H1>Candidaturas Evento: {event.name}</H1>
            <DadosContainer>
               {event.event_artist?.length == 0 &&
                  <h1> Nada por aqui. </h1>}
               {event.event_artist?.map((candidatura) => (
                  <CardArtist key={candidatura.id}>
                     <CardHeader>
                        {candidatura.artist.profile_image ? <Imagem src={'http://localhost:3333/api/v1/images/' + candidatura.artist.profile_image} /> : <Person ></Person>}
                        <Link target="_blank" to={`/portifolio/${candidatura.artistId}`}><span style={{ color: '#000' }}> {candidatura.artist.name}</span></Link>
                        <Btn
                           onClick={() => handleCandidatura(candidatura)}
                           title={candidatura.accept ? 'Reprovar' : 'Aprovar'}
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





