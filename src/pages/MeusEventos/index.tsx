import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ListaEventos } from "../../components/ListaEventos";
import { Container } from "./styles";


export function MeusEventos() {

   return (
      <>
         <Header />
         <Container>
            <ListaEventos />
         </Container>
         <Footer />
      </>
   )
}