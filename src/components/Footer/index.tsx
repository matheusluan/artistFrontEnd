import { Container } from "../Footer/styles"

export function Footer() {
   const year = new Date().getFullYear();
   return (
      <>
         <Container>           
               <span className="textFooter">Artist {year} - todos os direitos reservados </span>              
         </Container>
      </>
   )
}