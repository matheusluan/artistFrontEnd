import { Container } from "../SignIn/styles"

import { FormSingIn } from "../../components/FormSignIn";
import { Text } from "../../components/Text";
import { pxToRem } from "../../utils/convertToRem.util";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function SignIn() {
    return (
        <>
            <Header />
            <Container>
                <Text color="#FFFFFF" fontSize={pxToRem(80)} className="tituloSignIn">Arte é isso, arte é aqui!</Text>
                <FormSingIn />
            </Container>
            <Footer />
        </>
    );
}