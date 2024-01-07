import { pxToRem } from "../../utils/convertToRem.util";
import { Input } from "../Input";
import { Text } from "../Text";
import { Container, Descr, Event, Files, FormContainer, ImportFiles, Line, NewEvent, NewPost, Select } from "./styles";
import { Button } from "../Button";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { IPost } from "../../interfaces/IPost";
import { api } from "../../services/api.service";

type EventFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

type FileListProps = {
    files: File[];
};

const FileList: React.FC<FileListProps> = ({ files }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {files.map((file, index) => (
            <div
                style={{
                    display: 'flex', borderRadius: '2px',
                    font: 'nunito', background: '#e5e5e5',

                    width: '30px', height: '30px',
                    margin: '10px', alignItems: 'center', justifyContent: 'center'
                }}
                key={index}
                title={file.name}> <Text fontSize="10px">{index + 1}</Text></div>
        ))}
    </div>
);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB em bytes

export function EventForm({ isOpen, onClose }: EventFormModalProps) {

    const [formPost, setFormPost] = useState<IPost>({} as IPost);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const user_type = localStorage.getItem('user_type');
    const user_id = localStorage.getItem('user_id');

    const handleButtonClick = () => {
        setModalOpen(true);
    };

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

        formData.append('description', formPost.description);
        formData.append('user', user_id || '');
        
        if (formPost.event) {
            formData.append('event', formPost.event.id)
        }
        api.post("post", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
            alert("Cadastrado com sucesso!");
        }).catch((error) => (alert("Erro ao concluir o post"), console.error(error)));

    }

    if (!isOpen) return null;

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).classList.contains('modal')) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [isOpen, onClose]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter(
            (file) => file.size <= MAX_FILE_SIZE && (file.type.startsWith("image/") || file.type.startsWith("video/"))
        );
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...validFiles]);
    };

    return (
        <>
            <Container>
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <NewPost>
                                <Text color="#FFFFFF"
                                    fontSize={pxToRem(30)}
                                    style={{
                                        fontFamily: "Nunito",
                                    }}>Começar Post</Text>

                                <FormContainer>
                                    <Text color="#000000"
                                        fontSize={pxToRem(20)}
                                        style={{
                                            fontFamily: "Nunito",
                                            textAlign: "left",
                                            gridColumnStart: 1,
                                            gridColumnEnd: 3
                                        }}>Descrição</Text>

                                    <Descr onChange={(event) => setFormPost({ ...formPost, description: event.target.value })} cols={100} rows={10} placeholder="Descreva sua publicação!" />

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
                                        {selectedFiles.length > 0 && <FileList files={selectedFiles} />}
                                    </Files>

                                    {user_type == 'organizer' &&
                                        <Event>
                                            <Text color="#000000"
                                                fontSize={pxToRem(20)}
                                                style={{
                                                    fontFamily: "Nunito",
                                                    textAlign: "left",
                                                }}>Evento</Text>

                                            <NewEvent onClick={handleButtonClick}>+ Novo Evento</NewEvent>

                                            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>

                                            </Modal>

                                            <Line />

                                            <Select>

                                            </Select>
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
                                        }}>Publicar</Button>
                                </FormContainer>
                            </NewPost>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}