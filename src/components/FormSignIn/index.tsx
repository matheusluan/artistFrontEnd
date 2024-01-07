import { pxToRem } from "../../utils/convertToRem.util";
import { Button } from "../Button";
import { Input } from "../Input";
import { Text } from "../Text"
import { TextLabel } from "../TextLabel";
import { Container, FormContainer, InputLabelContainer } from "./styles";
import { useState } from "react";
import { ILogin } from "../../interfaces/ILogin";
import { api } from "../../services/api.service";
import { ILocalStorage } from "../../interfaces/ILocalStorage";
import { useHistory } from "react-router-dom";

export function FormSingIn() {
   const [formData, setFormData] = useState<ILogin>({} as ILogin);
   const [formError, setFormError] = useState<boolean>(false);

   const history = useHistory();

   function handleLogin(data: ILocalStorage) {
      // console.log(data)

      localStorage.setItem('name', data.name);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_type', data.user_type)
      localStorage.setItem('user_id', data.user_id)
      history.push(`/home`);
   }

   function handleChangeUser(event: React.ChangeEvent<HTMLInputElement>) {
      const { id, value } = event.target;
      if (value.trim() === '') {
         setFormError(true);
         setFormData({ ...formData, [id]: value })
      } else {
         setFormError(false);
         setFormData({ ...formData, [id]: value })
      }
   }

   function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter" || event.key === "NumpadEnter" || event.keyCode === 13) {
         console.log("enter");
         event.preventDefault();
         handleSubmit();
      }
   }

   const handleSubmit = async () => {

      const data = {
         username: formData.username,
         password: formData.password
      };

      if (!data.username || !data.password) {
         setFormError(true);
         return;
      } else {
         await api.post("/login", data).then(response => {
            if (response.status == 200) {
               handleLogin(
                  response.data
               )
            }
         }).catch(resposta => {
            console.log('erro - ', resposta)
   
            if (resposta.code == "ERR_BAD_REQUEST") {
               alert("Usuario ou senha invalidos")
            }
         })
      }
   }

   return (
      <>
         <Container>
            <FormContainer onKeyDown={handleKeyDown}>
               <InputLabelContainer>
                  <TextLabel
                     style={{
                        color: "#FFFFFF",
                        fontSize: pxToRem(20),
                        fontWeight: 700,
                     }}>Username:</TextLabel>
                  <Input
                     id="username"
                     placeholder="João"
                     className="inputName"
                     onChange={handleChangeUser}
                     value={formData.username}
                     style={{
                        outline: 0,
                        width: pxToRem(548),
                        height: pxToRem(32),
                        borderRadius: pxToRem(8),
                        background: "#EFF4F9",
                        color: "#000"
                     }} />

                  <TextLabel style={{
                     color: "#FFFFFF",
                     fontSize: pxToRem(20),
                     fontWeight: 700,
                  }}>Senha:</TextLabel>
                  <Input
                     id="password"
                     placeholder="**********"
                     className="inputName"
                     onChange={handleChangeUser}
                     value={formData.password}
                     type="password"
                     style={{
                        outline: 0,
                        width: pxToRem(548),
                        height: pxToRem(32),
                        borderRadius: pxToRem(8),
                        background: "#EFF4F9",
                        color: "#000"
                     }} />
               </InputLabelContainer>

               {formError && <Text color="#FF0000" fontSize="1rem" textAlign="center">Preencha todos os campos</Text>}
               <Button
                  className="button-submit"
                  onClick={handleSubmit}
                  style={{
                     color: '#FFF',
                     margin: "auto auto",
                     marginTop: "1rem",
                  }}>Login</Button>
            </FormContainer>

            <Text color="#FFFFFF" fontSize={pxToRem(25)} style={{ textAlign: "center" }}>Entre para a festa você tambem!!</Text>

         </Container>
      </>
   )
}