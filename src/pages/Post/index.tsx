import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Event, Container, Dados, DadosContainer, Descr, Files, FormContainer, ImportFiles, Line, EditPost, Select, Titulo, H1, AddEvento } from "./styles";
import { api } from "../../services/api.service";
import { Input } from "../../components/Input";
import { pxToRem } from "../../utils/convertToRem.util";
import { Button } from "../../components/Button";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { IPost } from "../../interfaces/IPost";
import { Text } from "../../components/Text";
import FileList from "../../components/FileList"
import { SelectContainer } from "../../components/Feed/styles";
import { IEvent } from "../../interfaces/IEvent";

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface response {
    medias: File[];
}

export function Post(props: Props) {

    const id = props.match.params.id;

    const [formPost, setFormPost] = useState<IPost>({} as IPost);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>("");

    const history = useHistory();

    const user_type = localStorage.getItem('user_type');
    const user_id = localStorage.getItem('user_id');

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB em bytes

    const userId = localStorage.getItem("user_id")


    async function handleList() {
        const postss = await api.get("post/" + id);
        setFormPost(postss.data);

        if (user_type == 'organizer') {
            handleListEvents();
        }

        const response: response = postss.data;

        setSelectedFiles(response.medias)

        if (formPost.event) {
            setSelectedEventId(formPost.event.id)
        }

    }

    async function handleListEvents() {
        const evts = await api.get(`events/${user_id}`);
        setEvents(evts.data);
    }

    function handleExcludeFiles() {
        setSelectedFiles([])
    }

    function handleSubmit() {
        if (!formPost.description) {
            const missingFields = [];

            if (!formPost.description) missingFields.push("Descrição");

            alert(`Um ou mais campos não preenchidos: ${missingFields.join(", ")}`);
        }

        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append("assets", file);
        });

        var alterou_medias = false;

        if (formPost.medias != selectedFiles) {
            alterou_medias = true;
        }

        formData.append('description', formPost.description);
        formData.append('user', user_id || '');
        formData.append('alterou_medias', alterou_medias.toString());

        if (formPost.event) {
            const event_id = formPost.event.id;
            if (selectedEventId !== event_id) {
                // O id do evento selecionado é diferente do id do evento em formPost.event
                formData.append('event', selectedEventId);
            } else {
                // O id do evento selecionado é o mesmo do id do evento em formPost.event
                formData.append('event', event_id);
            }
        } else {
            formData.append('event', selectedEventId || '');
        }

        api.put("post/" + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            alert("Editado com sucesso!");
            history.goBack();
        }).catch((error) => (alert("Erro ao concluir o post"), console.error(error)));

    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter((file) => {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            const isMp4 = file.name.toLowerCase().endsWith(".mp4");
            const isSmallEnough = file.size <= MAX_FILE_SIZE;
            if (!isImage && !isVideo) {
                alert("Por favor, selecione apenas arquivos de imagem ou vídeo.");
            } else if (isVideo && !isMp4) {
                alert("Por favor, selecione apenas arquivos de vídeo no formato .mp4.");
            }
            return (isImage || (isVideo && isMp4)) && isSmallEnough;
        });
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...validFiles]);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventId = event.target.value;
        setSelectedEventId(eventId);
    };


    useEffect(() => {
        handleList();
    }, []);

    return (
        <>
            <Header />
            <Container>
                <H1>Editar Post</H1>
                <DadosContainer>

                    <Dados>
                        <EditPost>
                            <FormContainer>
                                <Text color="#000000"
                                    fontSize={pxToRem(20)}
                                    style={{
                                        fontFamily: "Nunito",
                                        textAlign: "left",
                                        gridColumnStart: 1,
                                        gridColumnEnd: 3
                                    }}>Descrição</Text>

                                <Descr id="descricao" value={formPost.description} onChange={(event) => setFormPost({ ...formPost, description: event.target.value })} cols={100} rows={10} placeholder="Descreva sua publicação!" />

                                <Files>
                                    <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-between' }}>
                                        <Text color="#000000"
                                            fontSize={pxToRem(16)}
                                            style={{
                                                fontFamily: "Nunito",
                                                textAlign: "left",
                                                gridColumnStart: 1,
                                                gridColumnEnd: 3
                                            }}>Arquivo(s)</Text>

                                        <ImportFiles htmlFor="file-upload">+ Adicionar Arquivo</ImportFiles>
                                    </div>

                                    <Line />

                                    <Input id="file-upload" multiple type="file" onChange={handleFileSelect} style={{
                                        display: "none",
                                    }} />
                                    {selectedFiles.length > 0 && <FileList files={selectedFiles.length > 0 ? selectedFiles : []} />}
                                    {selectedFiles.length == 0 &&
                                        <>
                                            <h3 style={{
                                                fontFamily: "Nunito",
                                                textAlign: "left",
                                                marginLeft: '10px',
                                                color: "#000"
                                            }}>Nada por aqui.</h3>

                                        </>}

                                    <Button onClick={handleExcludeFiles} type="button"
                                        style={{
                                            width: '30px', height: '30px',
                                            background: "#FF0000",
                                            margin: "0 auto",
                                        }}>X</Button>
                                </Files>

                                {user_type == 'organizer' &&
                                    <Event>
                                        <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-between' }}>
                                            <Text color="#000000"
                                                fontSize={pxToRem(16)}
                                                style={{
                                                    fontFamily: "Nunito",
                                                    textAlign: "left",
                                                    gridColumnStart: 1,
                                                    gridColumnEnd: 3
                                                }}>Evento</Text>
                                        </div>
                                        <Line />
                                        {events.length > 0 &&
                                            <>
                                                <SelectContainer>
                                                    <Select id="event-select" defaultValue={formPost.event?.id} onChange={handleSelectChange} style={{ color: "#000000" }}>
                                                        {events.map((event) => (
                                                            <option key={event.id} style={{ cursor: 'pointer', color: "#000000" }} value={event.id} selected>{event.name}</option>
                                                        ))}
                                                    </Select>
                                                </SelectContainer>
                                            </>}
                                        {events.length == 0 &&
                                            <>
                                                <h3 style={{
                                                    fontFamily: "Nunito",
                                                    textAlign: "left",
                                                    marginLeft: '10px',
                                                    color: "#000"
                                                }}>Nada por aqui.</h3>
                                            </>}
                                    </Event>
                                }
                                <Button onClick={handleSubmit}
                                    type="submit"
                                    style={{
                                        background: "#50E3C2",
                                        margin: "0 auto",
                                        gridColumnStart: 1,
                                        gridColumnEnd: 3,
                                        marginTop: pxToRem(16),
                                    }}>Editar</Button>
                            </FormContainer>

                        </EditPost>
                    </Dados>
                </DadosContainer>
            </Container>
            <Footer />
        </>
    )

}





