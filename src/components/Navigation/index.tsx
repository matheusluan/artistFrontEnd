import { useState } from "react";
import { Button } from "../Button";
import { EventForm } from "../PostForm";
import { ButtonNav } from "./styles";


export function Navigation() {

   const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
   const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);

   function handleOpenModalPost() {
      setIsOpenPost(true);
   }
   function handleCloseModalPost() {
      setIsOpenPost(false);
   }
   function handleOpenModalEvent() {
      setIsOpenEvent(true);
   }
   function handleCloseModalEvent() {
      setIsOpenEvent(false);
   }


   return (
      <>
         <ButtonNav>
            <Button style={{color: "#684DFF"}} onClick={handleOpenModalPost}>Criar Post</Button>
            {/* <Button style={{color: "#684DFF"}} onClick={handleOpenModalEvent}>Criar Event</Button> */}
         </ButtonNav>

         {isOpenPost && 
         <>
            <EventForm isOpen={isOpenPost} onClose={handleCloseModalPost}/>
         </>}

         {isOpenEvent && 
         <>
            <EventForm isOpen={isOpenEvent} onClose={handleCloseModalEvent}/>
         </>}
      </>
   )
}