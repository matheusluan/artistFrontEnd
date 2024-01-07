import { useEffect, useState } from "react";

import { IEvent } from "../../interfaces/IEvent";
import { api } from "../../services/api.service";
import { Card } from "./styles";
import { Link } from "react-router-dom";
import { EditButton } from "../Post/styles";
import { Check, Pencil, X } from "@phosphor-icons/react";
import { Btn, CardArtist, CardHeader, Container, DadosContainer } from "../../pages/MinhasCandidaturas/styles";
import { H1 } from "../../pages/Evento/styles";



export function ListaEventos() {

   const [events, setEvents] = useState<IEvent[]>([]);

   const user_type = localStorage.getItem("user_type");
   const user_id = localStorage.getItem("user_id");

   async function getEvents() {

      if (user_type === "organizer" && user_id !== null) {
         const evts = await api.get(`events/${user_id}`);
         const { data } = evts;
         setEvents(data);
      }
   }

   useEffect(() => {
      getEvents();
   }, []);

   return (
      <>
         {/* <h1>ListaEventos</h1>
         {events.length > 0 ? (
            <Container>
               {events.map((event) => (
                  <Card id={event.id}>
                     <h1>{event.name}</h1>
                     <h2>{event.description}</h2>
                     <Link to={`/evento/${event.id}`}>
                        <EditButton title="Editar Evento">
                           <Pencil />
                        </EditButton>
                     </Link>
                  </Card>
               ))}
               <Card id={events[0].id}>
                  <h1>{events[0].name}</h1>
                  <h2>{events[0].description}</h2>
               </Card>
               <Card id='1'>
                  <h1>Aoba</h1>
                  <h2>Foda</h2>
               </Card>

            </Container>
         ) : (
            <h1>Não há eventos</h1>
         )} */}

<Container>
            <H1>Meus Eventos</H1>
            <DadosContainer>
               {events?.length == 0 &&
                  <h1> Nada por aqui. </h1>}
               {events?.map((evento) => (
                  <CardArtist key={evento.id}>
                     <CardHeader>
                        <span style={{ color: '#000' }}> {evento?.name}</span>
                        <Link to={`/evento/${evento.id}`}>
                                            <EditButton title="Editar Evento">
                                                <Pencil />
                                            </EditButton>
                                        </Link>


                     </CardHeader>
                  </CardArtist>
               ))}
            </DadosContainer>
         </Container>

      </>
   )

}