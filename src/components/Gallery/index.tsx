import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import videoPlaceholder from '../../assets/images/video-placeholder.png';
import { GaleryContainer } from './styles';
import { IMedia } from '../../interfaces/IMedia';

interface GalleryProps {
    medias: IMedia[];
}

interface GalleryImage {
    original: string;
    thumbnail: string;
    renderItem?: () => React.ReactNode;
}

const Gallery: React.FC<GalleryProps> = ({ medias }: GalleryProps): JSX.Element => {
    const baseURL = 'http://localhost:3333/api/v1/images/';

    const images: GalleryImage[] = medias.map((media) => {
        const isVideo = media.name.split('.').pop() === 'mp4';

        if (isVideo) {
            return {
                original: videoPlaceholder,
                thumbnail: videoPlaceholder,
                renderItem: () => (
                    <video src={baseURL + media.name} controls />
                ),
            };
        }

        return {
            original: baseURL + media.name,
            thumbnail: baseURL + media.name,
        };
    });

    return (
        <GaleryContainer>
            <ImageGallery
                items={images}
                slideDuration={0}
                slideInterval={3000}
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={false}
                lazyLoad={true}                
            />
        </GaleryContainer>
    );
};

export default Gallery;
