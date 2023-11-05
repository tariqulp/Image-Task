import React, { useState } from 'react';

const Check = () => {
    const [images, setImages] = useState([
        { id: 'image1', src: '/images/image-11.jpeg', alt: 'Image 1' },
        { id: 'image2', src: '/images/image-10.jpeg', alt: 'Image 2' },
        { id: 'image3', src: '/images/image-1.webp', alt: 'Image 3' },
        { id: 'image4', src: '/images/image-2.webp', alt: 'Image 3' },
        { id: 'image5', src: '/images/image-3.webp', alt: 'Image 3' },
        { id: 'image6', src: '/images/image-4.webp', alt: 'Image 3' },
    ]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('index'));
        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(index, 0, draggedImage);
        setImages(updatedImages);
    };

    return (
        <div>
            {images.map((image, index) => (
                <div
                    key={image.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                >
                    <img src={image.src} alt={image.alt} style={{ width: '100px', height: '100px' }} />
                </div>
            ))}
        </div>
    );
};

export default Check;