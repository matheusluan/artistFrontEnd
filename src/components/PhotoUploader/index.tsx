import React, { ChangeEvent, useState } from 'react';
import { Container, Input, Alert } from './styles';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

interface Props {
  onPost: (image: Blob) => void;
}

const PhotoUploader: React.FC<Props> = ({ onPost }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files && event.target.files[0];

    if (file) {
      if (SUPPORTED_FORMATS.includes(file.type)) {
        onPost(file);
        file = null;
        setErrorMessage(null);
      } else {
        setErrorMessage('Formato de arquivo não suportado. Por favor, selecione uma imagem JPEG ou PNG.');
      }
    }
  };

  return (
    <Container>
      <Input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
      {errorMessage && <Alert>{errorMessage}</Alert>}
    </Container>
  );
};

export default PhotoUploader;
