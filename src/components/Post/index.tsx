
import { IPost } from "../../interfaces/IPost";
import { PostAuthorAvatar, PostAuthorName, PostContainer, PostContent, PostHeader, PostAuthorInfo, PostAuthorCat, PostAuthorCategories, PostEventContainer, Label, EventInfo, EventAddress, Input, EditButton, Address, Span, PostFooter, ExcluirButton, SpanStar } from "./styles";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { Pencil, MapPin, Trash, Eye } from "@phosphor-icons/react";
import Gallery from "../Gallery";
import mapa from "../../assets/images/map.png";
import { useEffect, useState } from "react";
import { api } from "../../services/api.service";
import { IEvent } from "../../interfaces/IEvent";

interface Props {
    post: IPost;
    onDelete: (postId: string) => void;
}

const Post: React.FC<Props> = ({ post, onDelete }) => {

    const user_type = localStorage.getItem('user_type');
    const user_id = localStorage.getItem('user_id');


    function expirou(expira: string) {

        const dataAtual: Date = new Date(); // Obtém a data atual

        const data: Date = new Date(expira);

        if (dataAtual > data) {
            return true
        } else {
            return false
        }

    }

    async function handleCandidatura(event: string, expira: string) {

        if (expirou(expira)) {
            alert("Evento já expirou");
            return
        }

        if (confirm("Realmente deseja se candidatar?")) {

            const data = {
                artist: user_id,
                event: event,
                accept: false
            }

            await api.post("/candidatura", data)
                .then(response => {
                    alert("Candidatura feita com sucesso!");
                    window.location.reload();
                })
                .catch(response => {
                    alert(response.response.data.message);
                });
        }
    };


    return (
        <>
            <PostContainer key={post.id}>
                <PostHeader>
                    <PostAuthorAvatar src={post.user.profile_image ? 'http://localhost:3333/api/v1/images/' + post.user.profile_image : 'https://picsum.photos/50'} alt="foto" />
                    <PostAuthorInfo>
                        <PostAuthorName><Link to={`/portifolio/${post.user.id}`}> {post.user.name} </Link> </PostAuthorName>
                        <PostAuthorCategories>
                            {post.user.user_type == 'artist' && post.user.categories.map(cat => (
                                <PostAuthorCat key={cat.categoryId}>{cat.category.name}</PostAuthorCat>
                            ))}
                            {post.user.user_type == 'organizer' && post.event && post.event.category.map(cat => (
                                <PostAuthorCat key={cat.categoryId}>{cat.category.name}</PostAuthorCat>
                            ))}
                        </PostAuthorCategories>
                    </PostAuthorInfo>
                    {post.user.user_type == 'organizer' ? <div></div> :
                        <Rating
                            postUserId={post.user.id}
                            ratingUser={post.user.rating}
                            userId={user_id}
                            post={post}
                            userType={user_type}
                            onClick={() => useEffect}
                        />
                    }

                    <div style={{ display: 'flex' }}>
                        {user_id == post.user.id &&
                            <Link to={`/post/${post.id}`}>
                                <EditButton title="Editar Post">
                                    <Pencil />
                                </EditButton>
                            </Link>
                        }
                        {(user_type == 'admin' || user_id == post.user.id) &&
                            <>

                                <ExcluirButton title="Excluir Post" onClick={() => onDelete(post.id)}>
                                    <Trash color="#ea3c19" />
                                </ExcluirButton>

                            </>
                        }
                    </div>
                </PostHeader>
                <PostContent> {post.description}</PostContent>
                <Gallery medias={post.medias} />
                {post.event &&
                    <>
                        <PostEventContainer>
                            <EventInfo>
                                <MyInput id="evento" label="Evento" value={post.event.name} />
                                <MyInput id="budget" label="Orçamento" value={post.event.budget} />
                                <MyInput id="people" label="Publico" value={post.event.people} />
                            </EventInfo>
                            <EventAddress>
                                <Span>{`Data: ${formatDateString(post.event.dh_event)} | Candidaturas: ${formatDateString(post.event.dh_expiration)}`}</Span>
                                <img src={mapa} />
                                <Address>
                                    <MapPin size={20} color='#9500F6' />
                                    <h3 style={{ color: '#9500F6', margin: '5px' }} >
                                        {`${post.event.address.street}, ${post.event.address.number}, ${post.event.address.neighborhood}`}
                                    </h3>
                                </Address>
                            </EventAddress>
                            <div style={{ display: 'flex' }}>
                                {post.event && user_id == post.user.id &&
                                    <>
                                        <Link to={`/evento/${post.event.id}`}>
                                            <EditButton title="Editar Evento">
                                                <Pencil />
                                            </EditButton>
                                        </Link>
                                        <Link to={`/candidatura/${post.event.id}`}>
                                            <EditButton title="Candidaturas">
                                                <Eye />
                                            </EditButton>
                                        </Link>
                                    </>
                                }
                            </div>
                        </PostEventContainer>
                        {
                            user_type == 'artist' &&
                            user_id != post.user.id &&
                            <Button
                                style={{
                                    margin: '15px auto',
                                    color: '#f5f5f5',
                                    background: expirou(post.event?.dh_expiration) ? '#e5e5e5' : '#50e3c2',
                                    cursor: expirou(post.event?.dh_expiration) ? 'not-allowed' : '',
                                }}
                                onClick={() => handleCandidatura(post.event.id, post.event.dh_expiration)}>
                                {expirou(post.event?.dh_expiration) ? 'Expirado' : 'Eu quero!'}
                            </Button>
                        }
                    </>
                }
                <PostFooter>
                    <p style={{ color: '#000', marginRight: '10px' }}>
                        {`Criado em: ${obterData(post.dh_create)}`}
                    </p>
                    <p style={{ color: '#000' }}>
                        {post.dh_edit && post.dh_edit != post.dh_create && `Editado em: ${obterData(post.dh_edit)}`}
                    </p>
                </PostFooter>
            </PostContainer>
        </>
    );
};

interface Prop {
    label: string;
    id: string;
    value: string;
}

export function MyInput({ id, label, value }: Prop) {
    return (
        <>
            <Label>{label}</Label>
            <Input id={id}>
                {value ? value : "Não informado"}
            </Input>
        </>
    );
}

export function formatDateString(dateString: string): string {

    if (dateString) {
        const dateObj = new Date(dateString);
        const day = dateObj.getUTCDate().toString().padStart(2, "0");
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }
    return 'Não informado.'
}

export function obterData(dataIso: Date): string {
    const dataObj = new Date(dataIso);
    const dia = String(dataObj.getUTCDate()).padStart(2, '0');
    const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getUTCFullYear());
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
}

function Star({ selected, onSelect, title, post, userId, userType }: any) {
    return (
        <>
            {
                userId !== post.user.id && userType == "organizer"
                    ? <SpanStar style={{ cursor: 'pointer' }} title={title} onClick={onSelect}>{selected ? '★' : '☆'}</SpanStar>
                    : <SpanStar >{selected ? '★' : '☆'}</SpanStar>
            }
        </>
    )
}

function Rating({ postUserId, ratingUser, userId, post, userType }: any) {
    const [rating, setRating] = useState(!ratingUser ? 0 : ratingUser); // Valor inicial da avaliação
    const [ratingHover, setRatingHover] = useState(0); // Valor da avaliação ao passar o mouse

    async function handleSelect(selectedRating: number) {
        setRating(selectedRating);

        const data = {
            user: postUserId,
            userRate: userId,
            value: selectedRating
        }

        await api.post("/rating", data)
            .then(response => {
                alert("Rating salvo com sucesso!");
                setRating(response.data);
                setRatingHover(0);
                window.location.reload();
            })
            .catch(response => {
                alert(response.response.data.message);
                setRating(rating);
            });
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    selected={ratingHover == 0 ? star <= rating : star <= ratingHover}
                    onSelect={() => handleSelect(star)}
                    title={`Avaliar com ${star} estrela(s)`}
                    user_id={userId}
                    post={post}
                    userType={userType}

                />
            ))}
        </div>
    );
};

export default Post;

