
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Form, Column, Dados } from "../Evento/styles";
import { CardArtist, Container, RedeSocial } from "./styles";
import { RouteComponentProps } from 'react-router-dom';
import { IUser } from "../../interfaces/IUser";
import { api } from "../../services/api.service";
import { PostAuthorAvatar, PostAuthorName } from "../../components/Post/styles";
import { TiktokLogo, FacebookLogo, InstagramLogo, YoutubeLogo } from '@phosphor-icons/react'
import { MyInput } from "../../components/Post";

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}
export function Portifolio(props: Props) {

    const id = props.match.params.id;

    const [formUser, setFormUser] = useState<IUser>({} as IUser)

    async function handleData() {
        const us = await api.get(`user/${id}`);
        setFormUser(us.data);
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <>
            <Header />
            <Container>
                <CardArtist>
                    <Dados>
                        <div>
                            <MyInput
                                label="Nome"
                                id='name'
                                value={formUser.name ? formUser.name : ""}
                            />
                        </div>
                        <div>
                            <MyInput
                                label="Telefone"
                                id='cellphone'
                                value={formUser.cel_phone ? formUser.cel_phone : ""} />
                        </div>
                    </Dados>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        {formUser.user_type != 'organizer' &&
                            <>
                                <RedeSocial
                                    onClick={() => window.open(formUser.facebookUrl ? formUser.facebookUrl : 'https://www.facebook.com/')}
                                    cor="#3b5998"
                                    id='facebookUrl'>
                                    <FacebookLogo size={25} />
                                </RedeSocial>
                                <RedeSocial
                                    onClick={() => window.open(formUser.instagramUrl ? formUser.instagramUrl : 'https://www.instagram.com/')}
                                    cor="#BD5DAE"
                                    id='instagramUrl'>
                                    <InstagramLogo size={25} />
                                </RedeSocial>
                                <RedeSocial
                                    onClick={() => window.open(formUser.tiktokUrl ? formUser.tiktokUrl : 'https://www.tiktok.com/pt-BR/')}
                                    cor="#72E2ED"
                                    id='tiktokUrl'>
                                    <TiktokLogo size={25} />
                                </RedeSocial>
                                <RedeSocial
                                    onClick={() => window.open(formUser.youtubeUrl ? formUser.youtubeUrl : 'https://www.youtube.com/')}
                                    cor="#E64A1D"
                                    id='youtubeUrl'>
                                    <YoutubeLogo size={25} />
                                </RedeSocial>
                            </>
                        }
                    </div>

                </CardArtist>
                <Feed route="/posts" userId={id} />
            </Container>
            <Footer />
        </>

    );
}