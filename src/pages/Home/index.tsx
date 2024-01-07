
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { Container } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function Home() {

    return (
        <>
            <Header />
            <Container>
                <Feed route="/post" />
            </Container>
            <Footer />
        </>
    );
}